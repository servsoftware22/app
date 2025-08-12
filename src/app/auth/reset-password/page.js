"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field, value) => {
    const errors = { ...fieldErrors };

    if (field === "email") {
      if (!value.trim()) {
        errors.email = "Email is required";
      } else if (!isValidEmail(value)) {
        errors.email = "Please enter a valid email address";
      } else {
        delete errors.email;
      }
    }

    setFieldErrors(errors);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touchedFields.email) {
      validateField("email", value);
    }
  };

  const handleEmailBlur = () => {
    setTouchedFields((prev) => ({ ...prev, email: true }));
    validateField("email", email);
  };

  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      isValidEmail(email) &&
      Object.keys(fieldErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <AuthHeader />

        <div className="flex-1 flex">
          {/* Left Side - Success Message */}
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 pt-20 pb-20">
            <div className="w-full max-w-md text-center">
              {/* Success Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl font-bold text-[#191C27] mb-4">
                Check your email
              </h1>
              <p className="text-[#848D6F] mb-8">
                We've sent a password reset link to <strong>{email}</strong>
              </p>

              <div className="space-y-4">
                <Link
                  href="/auth/login"
                  className="w-full bg-[#FF5E00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF4A00] transition-colors flex items-center justify-center"
                >
                  Back to Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image Boxes */}
          <div className="hidden lg:flex lg:w-1/2 bg-[#191C27] items-center justify-center p-8">
            <div className="w-full max-w-lg">
              {/* Title and Subtitle */}
              <div className="text-white mb-12">
                <h1 className="text-4xl font-bold mb-6">
                  Everything your service business needs
                </h1>
                <p className="text-lg text-gray-300">
                  Websites, CRM, scheduling, payments, and more — all in one
                  platform.
                </p>
              </div>

              {/* Overlapping Image Boxes */}
              <div className="relative mb-12">
                {/* Main Image Box */}
                <div className="w-full h-80 bg-white rounded-2xl shadow-xl relative">
                  {/* Smaller Image Box overlapping in top-right */}
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-gray-200 rounded-xl shadow-lg"></div>
                  {/* Another smaller box overlapping in bottom-left */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-300 rounded-lg shadow-lg"></div>
                </div>
              </div>

              {/* Company Scroll */}
              <div className="flex items-center justify-center space-x-8">
                <div className="text-white text-sm font-medium">WeChat</div>
                <div className="text-white text-sm font-medium">
                  Booking.com
                </div>
                <div className="text-white text-sm font-medium">Google</div>
                <div className="text-white text-sm font-medium">Spotify</div>
                <div className="text-white text-sm font-medium">Stripe</div>
              </div>
            </div>
          </div>
        </div>

        <AuthFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <div className="flex-1 flex">
        {/* Left Side - Reset Password Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 pt-20 pb-20">
          <div className="w-full max-w-md">
            {/* Title */}
            <h1 className="text-3xl font-bold text-[#191C27] mb-2">
              Reset Password
            </h1>
            <p className="text-[#848D6F] mb-8">
              Forgot your password? We'll send you a reset link.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className="w-full bg-[#FF5E00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF4A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-[#848D6F]">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image Boxes */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#191C27] items-center justify-center p-8">
          <div className="w-full max-w-lg">
            {/* Title and Subtitle */}
            <div className="text-white mb-12">
              <h1 className="text-4xl font-bold mb-6">
                Everything your service business needs
              </h1>
              <p className="text-lg text-gray-300">
                Websites, CRM, scheduling, payments, and more — all in one
                platform.
              </p>
            </div>

            {/* Overlapping Image Boxes */}
            <div className="relative mb-12">
              {/* Main Image Box */}
              <div className="w-full h-80 bg-white rounded-2xl shadow-xl relative">
                {/* Smaller Image Box overlapping in top-right */}
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-gray-200 rounded-xl shadow-lg"></div>
                {/* Another smaller box overlapping in bottom-left */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-300 rounded-lg shadow-lg"></div>
              </div>
            </div>

            {/* Company Scroll */}
            <div className="flex items-center justify-center space-x-8">
              <div className="text-white text-sm font-medium">WeChat</div>
              <div className="text-white text-sm font-medium">Booking.com</div>
              <div className="text-white text-sm font-medium">Google</div>
              <div className="text-white text-sm font-medium">Spotify</div>
              <div className="text-white text-sm font-medium">Stripe</div>
            </div>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
