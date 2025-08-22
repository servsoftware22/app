"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthHeader from "../../components/AuthHeader";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanLoginPage({ websiteData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSectionRef = useRef(null);

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
      if (loginSectionRef.current) {
        loginSectionRef.current.classList.add("animate-in");
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

  return (
    <>
      <AuthHeader
        businessName={businessName}
        domain={domain}
        palette={palette}
        pageLabel="Sign In"
      />

      {/* Hero Section */}
      <section
        ref={loginSectionRef}
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
                Welcome Back
              </div>

              {/* Title */}
              <h1
                className="text-3xl lg:text-6xl mb-8 font-light contact-title-entrance"
                style={{
                  color: "#1f2937",
                  letterSpacing: "-0.025em",
                }}
              >
                Sign in to your account
              </h1>

              {/* Description */}
              <p
                className="text-lg sm:text-xl leading-relaxed mb-0 contact-description-entrance"
                style={{
                  color: "#6b7280",
                  fontWeight: 300,
                }}
              >
                Access your dashboard, manage your services, and stay connected
                with your customers.
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Secure Authentication</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12 contact-form-entrance">
          <div className="w-full max-w-lg">
            <form className="space-y-6">
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href={getHref("/forgot-password")}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
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
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={getHref("/signup")}
                  className="w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 flex justify-center"
                  style={{
                    backgroundColor: palette?.neutral || "#f3f4f6",
                    color: "#374151",
                  }}
                >
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
