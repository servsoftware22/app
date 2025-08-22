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

  // Validate form whenever formData changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Extract contact page configuration from websiteData
  const contactConfig = websiteData?.contact;
  const { business_info = {}, palette } = websiteData || {};
  const businessName = business_info?.name || "Business";

  // Guard clause for build time when websiteData is undefined
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

  const validateField = (name, value) => {
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
    const newErrors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setIsFormValid(isValid);
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
        setFormData({ name: "", email: "", phone: "", message: "" });
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
              <div
                className="inline-flex px-4 py-2 rounded-full text-sm font-light mb-8 items-center"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Get In Touch
              </div>

              {/* Title */}
              <h1
                className="text-5xl lg:text-7xl mb-8 font-medium"
                style={{
                  color: "#1f2937",
                  letterSpacing: "-0.02em",
                }}
              >
                Let's Start a Conversation
              </h1>

              {/* Description */}
              <p
                className="text-lg sm:text-xl leading-relaxed mb-0"
                style={{
                  color: "#6b7280",
                  fontWeight: 300,
                }}
              >
                Ready to discuss your project? We'd love to hear from you. Fill
                out the form and we'll get back to you within 24 hours.
              </p>
            </div>

            {/* Image Box - Bottom */}
            <div
              className="w-full flex-1 rounded-2xl overflow-hidden min-h-48"
              style={{ backgroundColor: "white" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-gray-300">📞</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12">
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
                  {/* Name Input */}
                  <div>
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
                      value={formData.name}
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
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1f2937" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleFieldBlur}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: "#d1d5db",
                      }}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && touchedFields.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
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
                      value={formData.email}
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

                  {/* Message Input */}
                  <div>
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
                      value={formData.message}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
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
