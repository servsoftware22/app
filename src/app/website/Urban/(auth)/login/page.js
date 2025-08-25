"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AuthHeader from "../../components/AuthHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanLoginPage({ websiteData }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const loginSectionRef = useRef(null);

  const { business_info = {}, palette, business } = websiteData || {};
  const businessName = business_info?.name || "Business";
  const businessId = business || null;

  // Auth state management
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    hasClientRecord: false,
    user: null,
    client: null,
    isLoading: true,
    error: null,
  });

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

  // Check if we're in local development (synchronous check)
  const isLocalDev =
    typeof window !== "undefined" && window.location.host === "localhost:3000";

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Use baseUrl for local development, relative paths for production
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("🔐 Urban Login: Starting auth check", { businessId });

      if (!businessId) {
        setAuthState({
          isAuthenticated: false,
          hasClientRecord: false,
          user: null,
          client: null,
          isLoading: false,
          error: "No business ID provided",
        });
        return;
      }

      try {
        const response = await fetch("/api/websites/auth-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ businessId }),
        });

        const result = await response.json();

        if (response.ok) {
          setAuthState({
            isAuthenticated: result.isAuthenticated,
            hasClientRecord: result.hasClientRecord,
            user: result.user,
            client: result.client,
            isLoading: false,
            error: null,
          });

          console.log("🔐 Urban Login: Auth check result", result);

          // Handle redirects based on auth state
          if (result.isAuthenticated && result.hasClientRecord) {
            const dashboardUrl = getHref("/dashboard");
            console.log(
              "🚀 Urban Login: User already signed in, redirecting to dashboard",
              {
                dashboardUrl,
                isLocalDev,
                domain,
                baseUrl,
                currentLocation: window.location.href,
                authResult: result,
              }
            );
            router.push(dashboardUrl);
          }
        } else {
          setAuthState({
            isAuthenticated: false,
            hasClientRecord: false,
            user: null,
            client: null,
            isLoading: false,
            error: result.error || "Failed to check authentication",
          });
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setAuthState({
          isAuthenticated: false,
          hasClientRecord: false,
          user: null,
          client: null,
          isLoading: false,
          error: "Network error checking authentication",
        });
      }
    };

    checkAuthStatus();
  }, [businessId, router]);

  // Add animation trigger when component is ready (auth check complete and not loading)
  useEffect(() => {
    if (
      !authState.isLoading &&
      !authState.error &&
      !(authState.isAuthenticated && authState.hasClientRecord)
    ) {
      const timer = setTimeout(() => {
        if (loginSectionRef.current) {
          loginSectionRef.current.classList.add("animate-in");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [
    authState.isLoading,
    authState.error,
    authState.isAuthenticated,
    authState.hasClientRecord,
  ]);

  // Fallback animation trigger - if auth check takes too long, trigger animations anyway
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (
        loginSectionRef.current &&
        !loginSectionRef.current.classList.contains("animate-in")
      ) {
        loginSectionRef.current.classList.add("animate-in");
      }
    }, 3000); // 3 second fallback
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !businessId) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if user is currently authenticated but trying to use different credentials
    if (authState.isAuthenticated && authState.user) {
      const currentUserEmail = authState.user.email;
      const newUserEmail = email.toLowerCase();

      if (currentUserEmail !== newUserEmail) {
        // User is authenticated but trying to login with different email
        // Log them out first, then proceed with login
        try {
          console.log(
            "🔄 Urban Login: User authenticated with different email, logging out first",
            {
              currentEmail: currentUserEmail,
              newEmail: newUserEmail,
            }
          );

          await supabase.auth.signOut();

          // Update auth state to reflect logout
          setAuthState({
            isAuthenticated: false,
            hasClientRecord: false,
            user: null,
            client: null,
            isLoading: false,
            error: null,
          });

          console.log(
            "✅ Urban Login: Successfully logged out, proceeding with new login"
          );
        } catch (signOutError) {
          console.error("Error signing out:", signOutError);
          setSubmitStatus({
            type: "error",
            message: "Error switching accounts. Please try again.",
          });
          setIsSubmitting(false);
          return;
        }
      }
    }

    try {
      const response = await fetch("/api/websites/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          businessId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Urban Login: Form submission successful", result);

        // Now sign in the user client-side to establish the session
        try {
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email,
              password,
            });

          if (signInError) {
            console.error("Auto sign-in failed:", signInError);
            setSubmitStatus({
              type: "error",
              message:
                "Login successful but sign in failed. Please try signing in manually.",
            });
            return;
          }

          console.log("✅ Urban Login: Auto sign-in successful", signInData);

          // Redirect to dashboard after successful sign-in
          router.push(getHref("/dashboard"));
        } catch (signInError) {
          console.error("Sign-in error:", signInError);
          setSubmitStatus({
            type: "error",
            message:
              "Login successful but sign in failed. Please try signing in manually.",
          });
        }
      } else {
        // Handle API errors
        if (result.error) {
          console.error("Login error:", result.error);
          setSubmitStatus({
            type: "error",
            message: result.error,
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: "An error occurred during login. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth
  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" palette={palette} />
      </div>
    );
  }

  // Show error state if auth check failed
  if (authState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-4">{authState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Don't render login form if user is already signed in for this business
  if (authState.isAuthenticated && authState.hasClientRecord) {
    return null; // Will redirect via useEffect
  }

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
            {/* Submit Status Display */}
            {submitStatus && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "error"
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <div
                  className={`text-sm ${
                    submitStatus.type === "error"
                      ? "text-red-800"
                      : "text-green-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              </div>
            )}

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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1f2937" }}
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: "#d1d5db",
                      "--primary-color": palette?.primary || "#3b82f6",
                      "--primary-color-rgb": palette?.primary
                        ? getRGBFromHex(palette.primary)
                        : "59, 130, 246",
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
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
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: palette?.primary || "#3b82f6",
                    color: "white",
                  }}
                >
                  {isSubmitting ? "Signing In..." : "Sign in"}
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
