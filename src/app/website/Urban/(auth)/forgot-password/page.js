"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthHeader from "../../components/AuthHeader";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanForgotPasswordPage({ websiteData }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const forgotPasswordSectionRef = useRef(null);

  const { business_info = {}, palette } = websiteData || {};
  const businessName = business_info?.name || "Business";

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
      if (forgotPasswordSectionRef.current) {
        forgotPasswordSectionRef.current.classList.add("animate-in");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <AuthHeader
          businessName={businessName}
          domain={domain}
          palette={palette}
          pageLabel="Reset Password"
        />

        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-16 px-12 shadow-lg rounded-2xl text-center">
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Reset link sent!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Click the link in your email to reset your password. If you
                don't see it, check your spam folder.
              </p>

              <div className="space-y-3">
                <Link
                  href={getHref("/login")}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to sign in
                </Link>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ backgroundColor: palette?.primary || "#3b82f6" }}
                >
                  Send another email
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthHeader
        businessName={businessName}
        domain={domain}
        palette={palette}
        pageLabel="Reset Password"
      />

      {/* Hero Section */}
      <section
        ref={forgotPasswordSectionRef}
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
                Need Help?
              </div>

              {/* Title */}
              <h1
                className="text-3xl lg:text-6xl mb-8 font-light contact-title-entrance"
                style={{
                  color: "#1f2937",
                  letterSpacing: "-0.5em",
                }}
              >
                Reset your password
              </h1>

              {/* Description */}
              <p
                className="text-lg sm:text-xl leading-relaxed mb-0 contact-description-entrance"
                style={{
                  color: "#6b7280",
                  fontWeight: 300,
                }}
              >
                Don't worry, it happens to the best of us. Enter your email and
                we'll send you a reset link.
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Secure Reset Process</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Reset Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12 contact-form-entrance">
          <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200"
                  style={{
                    backgroundColor: palette?.primary || "#3b82f6",
                    color: "white",
                  }}
                >
                  Send reset link
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                href={getHref("/login")}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
