"use client";

import { useRef, useEffect, useState } from "react";
import Header from "../../components/Header";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanContactPage({ websiteData }) {
  const contactSectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Helper function to convert hex color to RGB
  const getRGBFromHex = (hex) => {
    if (!hex) return "59, 130, 246"; // Default blue
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return "59, 130, 246"; // Default blue
  };

  // Extract contact page configuration from websiteData
  const contactConfig = websiteData?.contact?.contact || websiteData?.contact;
  const { business_info = {}, palette } = websiteData || {};
  const businessName = business_info?.name || "Business";

  // Debug logging
  console.log("Contact page - websiteData:", websiteData);
  console.log("Contact page - websiteData.contact:", websiteData?.contact);
  console.log("Contact page - contactConfig:", contactConfig);
  console.log("Contact page - palette:", palette);

  // Initialize form data based on contact configuration
  useEffect(() => {
    if (contactConfig?.form?.fields) {
      const initialFormData = {};
      contactConfig.form.fields.forEach((field) => {
        initialFormData[field.name] = "";
      });
      setFormData(initialFormData);
    }
  }, [contactConfig]);

  // Validate form whenever formData changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Add animation trigger when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (contactSectionRef.current) {
        contactSectionRef.current.classList.add("animate-in");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state while fetching data
  if (!websiteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Ensure palette exists before rendering
  if (!palette) {
    console.warn("No palette found in websiteData");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Configuration Error
          </h1>
          <p className="text-gray-600 mb-4">
            Website palette configuration is missing.
          </p>
        </div>
      </div>
    );
  }

  // Check if contact configuration exists
  if (!contactConfig) {
    console.warn("No contact configuration found in websiteData");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Contact Configuration Missing
          </h1>
          <p className="text-gray-600 mb-4">
            Contact page configuration is missing from the website data.
          </p>
          <pre className="text-xs bg-gray-100 p-4 rounded mt-4 overflow-auto max-w-md">
            {JSON.stringify(websiteData, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const validateField = (name, value, fieldConfig) => {
    // Handle fallback fields (when no fieldConfig is provided)
    if (!fieldConfig) {
      // Default validation for fallback fields
      switch (name) {
        case "name":
          return value.trim().length >= 2
            ? null
            : "Name must be at least 2 characters";
        case "email":
          return validateEmail(value)
            ? null
            : "Please enter a valid email address";
        case "phone":
          return validatePhone(value)
            ? null
            : "Please enter a valid phone number";
        case "message":
          return value.trim().length >= 10
            ? null
            : "Message must be at least 10 characters";
        default:
          return null;
      }
    }

    // Check if field is required
    if (fieldConfig.required && !value.trim()) {
      return `${fieldConfig.label || name} is required`;
    }

    // If not required and empty, it's valid
    if (!fieldConfig.required && !value.trim()) {
      return null;
    }

    // Type-specific validation
    switch (fieldConfig.type) {
      case "email":
        return validateEmail(value)
          ? null
          : "Please enter a valid email address";
      case "phone":
        return validatePhone(value)
          ? null
          : "Please enter a valid phone number";
      case "text":
      case "textarea":
        const minLength = fieldConfig.minLength || 2;
        return value.trim().length >= minLength
          ? null
          : `${
              fieldConfig.label || name
            } must be at least ${minLength} characters`;
      case "number":
        if (fieldConfig.min && parseFloat(value) < fieldConfig.min) {
          return `${fieldConfig.label || name} must be at least ${
            fieldConfig.min
          }`;
        }
        if (fieldConfig.max && parseFloat(value) > fieldConfig.max) {
          return `${fieldConfig.label || name} must be no more than ${
            fieldConfig.max
          }`;
        }
        return null;
      default:
        return null;
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  // Handle field blur (when user leaves the field)
  const handleFieldBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate this specific field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Update form validity
    validateForm();
  };

  // Validate entire form
  const validateForm = () => {
    if (contactConfig?.form?.fields) {
      // Validate configured fields
      const newErrors = {};
      let isValid = true;

      contactConfig.form.fields.forEach((field) => {
        const error = validateField(field.name, formData[field.name], field);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      setIsFormValid(isValid);
    } else {
      // Validate fallback fields
      const newErrors = {};
      let isValid = true;

      // Validate fallback fields
      const fallbackFields = ["name", "email", "message"];
      fallbackFields.forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName], null);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      setIsFormValid(isValid);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    validateForm();
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/websites/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          businessId: websiteData?.business,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Message sent successfully! We'll get back to you within 24 hours.",
        });
        // Reset form on success
        if (contactConfig?.form?.fields) {
          const resetFormData = {};
          contactConfig.form.fields.forEach((field) => {
            resetFormData[field.name] = "";
          });
          setFormData(resetFormData);
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="urban-font"
      style={{
        "--primary-color": palette.primary,
        "--accent-color": palette.accent || palette.secondary,
        "--neutral-color": palette.neutral,
        "--primary-color-rgb": getRGBFromHex(palette.primary),
      }}
    >
      <Header
        businessName={businessName}
        businessType="Services"
        domain="fieldsite"
        palette={palette}
        headerConfig={websiteData?.header}
      />

      {/* Hero Section */}
      <section
        className="pt-20 pb-20 flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]"
        style={{ backgroundColor: "white" }}
        ref={contactSectionRef}
      >
        {/* Left Column - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-8 text-center lg:text-left mb-16 lg:mb-0">
          <div
            className="w-full h-full rounded-2xl p-4 lg:p-6 flex flex-col justify-between"
            style={{ backgroundColor: palette.neutral }}
          >
            {/* Content Section - Top */}
            <div className="w-full px-4 lg:px-8 pt-8 lg:pt-12 mb-8 lg:mb-12">
              {/* Badge above title */}
              {contactConfig?.hero?.badge?.visible && (
                <div
                  className="inline-flex px-4 py-2 rounded-full text-sm font-light mb-8 items-center contact-badge-entrance"
                  style={{
                    backgroundColor: palette.primary,
                    color: "white",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                  {contactConfig.hero.badge.text}
                </div>
              )}

              {/* Title */}
              {contactConfig?.hero?.title?.visible && (
                <h1
                  className="text-3xl lg:text-6xl mb-8 font-light contact-title-entrance"
                  style={{
                    color: "#1f2937",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {contactConfig.hero.title.text}
                </h1>
              )}

              {/* Description */}
              {contactConfig?.hero?.description?.visible && (
                <p
                  className="text-lg sm:text-xl leading-relaxed mb-0 contact-description-entrance"
                  style={{
                    color: "#6b7280",
                    fontWeight: 300,
                  }}
                >
                  {contactConfig.hero.description.text}
                </p>
              )}
            </div>

            {/* Image Box - Bottom */}
            {contactConfig?.hero?.content?.visible &&
              contactConfig.hero.content.image_url && (
                <div
                  className="w-full flex-1 rounded-2xl overflow-hidden contact-image-entrance"
                  style={{
                    backgroundColor: "white",
                    maxHeight: "400px",
                    minHeight: "250px",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={contactConfig.hero.content.image_url}
                      alt="Contact"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12 contact-form-entrance">
          <div className="w-full max-w-lg">
            {/* Show Success Message or Form */}
            {submitStatus?.type === "success" ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Error Messages */}
                {submitStatus && submitStatus.type === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dynamic Form Fields */}
                  {contactConfig?.form?.fields ? (
                    contactConfig.form.fields.map((field, index) => (
                      <div
                        key={field.name}
                        className={`contact-field-entrance-${index + 1}`}
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1f2937" }}
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>

                        {field.type === "textarea" ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                            onBlur={handleFieldBlur}
                            rows={field.rows || 4}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 resize-none"
                            style={{
                              borderColor: "#d1d5db",
                            }}
                            placeholder={
                              field.placeholder ||
                              `Enter your ${field.label.toLowerCase()}`
                            }
                          />
                        ) : (
                          <input
                            type={
                              field.type === "number" ? "number" : field.type
                            }
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                            onBlur={handleFieldBlur}
                            required={field.required}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                            style={{
                              borderColor: "#d1d5db",
                            }}
                            placeholder={
                              field.placeholder ||
                              `Enter your ${field.label.toLowerCase()}`
                            }
                          />
                        )}

                        {errors[field.name] && touchedFields[field.name] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    // Fallback form fields if no configuration
                    <>
                      <div className="contact-field-entrance-1">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1f2937" }}
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                          style={{
                            borderColor: "#d1d5db",
                          }}
                          placeholder="Enter your full name"
                        />
                        {errors.name && touchedFields.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="contact-field-entrance-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1f2937" }}
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                          style={{
                            borderColor: "#d1d5db",
                          }}
                          placeholder="Enter your email address"
                        />
                        {errors.email && touchedFields.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="contact-field-entrance-3">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1f2937" }}
                        >
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message || ""}
                          onChange={handleInputChange}
                          onBlur={handleFieldBlur}
                          rows={4}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 resize-none"
                          style={{
                            borderColor: "#d1d5db",
                          }}
                          placeholder="Tell us about your project or inquiry..."
                        />
                        {errors.message && touchedFields.message && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 contact-button-entrance ${
                      isSubmitting || !isFormValid
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    style={{
                      backgroundColor: isFormValid
                        ? palette.primary
                        : "#9ca3af",
                      color: "white",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
