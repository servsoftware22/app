"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthHeader from "../../components/AuthHeader";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanSignupPage({ websiteData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const signupSectionRef = useRef(null);

  const { business_info = {}, palette, business } = websiteData || {};
  const businessName = business_info?.name || "Business";
  const businessId = business || null;

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

  // Check if we're in local development (localhost:3000)
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
  }, []);

  // Add animation trigger when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (signupSectionRef.current) {
        signupSectionRef.current.classList.add("animate-in");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Use baseUrl for local development, relative paths for production (same pattern as Header)
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href (same pattern as Header)
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))
      ? null
      : "Please enter a valid phone number";
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim().length >= 2
          ? null
          : "Name must be at least 2 characters";
      case "email":
        return validateEmail(value)
          ? null
          : "Please enter a valid email address";
      case "phone":
        return validatePhone(value);
      case "password":
        return validatePassword(value)
          ? null
          : "Password must be at least 8 characters";
      case "confirmPassword":
        return value === formData.password ? null : "Passwords do not match";
      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate form whenever formData changes
  useEffect(() => {
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    const hasRequiredFields =
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.confirmPassword &&
      formData.agreeToTerms;
    const passwordsMatch = formData.password === formData.confirmPassword;
    const isPasswordValid = validatePassword(formData.password);

    setIsFormValid(
      !hasErrors && hasRequiredFields && passwordsMatch && isPasswordValid
    );
  }, [formData, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid || !businessId) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields correctly.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/websites/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          businessId: businessId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.action === "signup") {
          setSubmitStatus({
            type: "success",
            message:
              "Account created successfully! Redirecting to dashboard...",
          });
          // TODO: Redirect to dashboard or show success state
        } else if (
          result.action === "signin" ||
          result.action === "signin_with_client_creation"
        ) {
          setSubmitStatus({
            type: "success",
            message: "Signed in successfully! Redirecting to dashboard...",
          });
          // TODO: Redirect to dashboard or show success state
        }
      } else {
        if (result.redirectTo) {
          setSubmitStatus({
            type: "error",
            message: result.error,
            redirectTo: result.redirectTo,
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: result.error || "An error occurred during signup.",
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AuthHeader
        businessName={businessName}
        domain={domain}
        palette={palette}
        pageLabel="Sign Up"
      />

      {/* Hero Section */}
      <section
        ref={signupSectionRef}
        className="pt-20 pb-20 flex flex-col lg:flex-row min-h-screen lg:min-h-screen urban-font"
        style={{ backgroundColor: "white" }}
      >
        {/* Left Column - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-8 text-center lg:text-left mb-16 lg:mb-0">
          <div
            className="w-full h-full rounded-2xl p-4 lg:p-6 flex flex-col justify-between"
            style={{ backgroundColor: palette?.neutral || "#f3f4f6" }}
          >
            {/* Content Section - Top */}
            <div className="w-full px-4 lg:px-8 pt-8 lg:pt-12 mb-8 lg:mb-12">
              {/* Badge above title */}
              <div
                className="inline-flex px-4 py-2 rounded-full text-sm font-light mb-8 items-center contact-badge-entrance"
                style={{
                  backgroundColor: palette?.primary || "#3b82f6",
                  color: "white",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                Get Started
              </div>

              {/* Title */}
              <h1
                className="text-3xl lg:text-6xl mb-8 font-light contact-title-entrance"
                style={{
                  color: "#1f2937",
                  letterSpacing: "-0.025em",
                }}
              >
                Create your account
              </h1>

              {/* Description */}
              <p
                className="text-lg sm:text-xl leading-relaxed mb-0 contact-description-entrance"
                style={{
                  color: "#6b7280",
                  fontWeight: 300,
                }}
              >
                Join thousands of businesses managing their services, customers,
                and growth with our platform.
              </p>
            </div>

            {/* Image Box - Bottom */}
            <div
              className="w-full flex-1 rounded-2xl overflow-hidden contact-image-entrance"
              style={{
                backgroundColor: "white",
                maxHeight: "400px",
                minHeight: "250px",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: palette?.primary || "#3b82f6" }}
                  >
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Join Our Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12 contact-form-entrance">
          <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f2937" }}
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Enter your full name"
                  />
                  {touchedFields.fullName && errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f2937" }}
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Enter your email address"
                  />
                  {touchedFields.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f2937" }}
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Enter your phone number"
                  />
                  {touchedFields.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f2937" }}
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Create a password"
                  />
                  {touchedFields.password && errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f2937" }}
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Confirm your password"
                  />
                  {touchedFields.confirmPassword && errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <Link
                    href={getHref("/terms")}
                    className="font-medium hover:opacity-80"
                    style={{ color: palette?.accent || "#3b82f6" }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={getHref("/privacy")}
                    className="font-medium hover:opacity-80"
                    style={{ color: palette?.accent || "#3b82f6" }}
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? "hover:opacity-90 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  style={{
                    backgroundColor: palette?.primary || "#3b82f6",
                    color: "white",
                  }}
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>

            {submitStatus && (
              <div
                className={`mt-6 p-4 rounded-lg text-center ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
                {submitStatus.redirectTo && (
                  <Link
                    href={submitStatus.redirectTo}
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    Click here to continue
                  </Link>
                )}
              </div>
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={getHref("/login")}
                  className="w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 flex justify-center"
                  style={{
                    backgroundColor: palette?.neutral || "#f3f4f6",
                    color: "#374151",
                  }}
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
