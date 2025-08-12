"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
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

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const isFormValid = () => {
    const passwordValid = password.trim() !== "" && password.length >= 6;
    const confirmPasswordValid =
      confirmPassword.trim() !== "" && password === confirmPassword;
    return passwordValid && confirmPasswordValid;
  };

  const validateField = (field, value) => {
    const errors = { ...fieldErrors };

    if (field === "password") {
      if (!value.trim()) {
        errors.password = "Password is required";
      } else if (value.length < 6) {
        errors.password = "Password must be at least 6 characters";
      } else {
        delete errors.password;
      }
    }

    if (field === "confirmPassword") {
      if (!value.trim()) {
        errors.confirmPassword = "Please confirm your password";
      } else if (value !== password) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        delete errors.confirmPassword;
      }
    }

    setFieldErrors(errors);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Only validate if field has been touched
    if (touchedFields.password) {
      validateField("password", value);
    }
    // Re-validate confirm password when password changes
    if (touchedFields.confirmPassword && confirmPassword) {
      validateField("confirmPassword", confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Only validate if field has been touched
    if (touchedFields.confirmPassword) {
      validateField("confirmPassword", value);
    }
  };

  const handlePasswordBlur = () => {
    setTouchedFields((prev) => ({ ...prev, password: true }));
    validateField("password", password);
  };

  const handleConfirmPasswordBlur = () => {
    setTouchedFields((prev) => ({ ...prev, confirmPassword: true }));
    validateField("confirmPassword", confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mark all fields as touched and validate
    setTouchedFields({
      password: true,
      confirmPassword: true,
    });
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    if (Object.keys(fieldErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await authAPI.updatePassword(password);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="absolute inset-0 flex">
        {/* Left Column - Dark Blue Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#191C27] relative">
          {/* Auth Header for desktop */}
          <div className="absolute top-8 left-8">
            <Link href="/" className="text-2xl font-bold text-white">
              ServicePro
            </Link>
          </div>

          {/* Auth Footer for desktop */}
          <div className="absolute bottom-8 left-8">
            <p className="text-sm text-gray-300">
              © 2025 ServicePro. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Column - Success Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          {/* Auth Header */}
          <div className="lg:hidden">
            <AuthHeader />
          </div>

          {/* Page Name - Top Right */}
          <div className="absolute top-8 right-8">
            <div className="text-sm text-[#848D6F] font-medium">
              Update Password
            </div>
          </div>

          <div className="w-full max-w-md text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-normal text-[#191C27] mb-4 leading-none tracking-tight">
              Password updated
            </h1>
            <p className="text-base text-[#848D6F] mb-8 leading-relaxed">
              Your password has been successfully updated. You can now sign in
              with your new password.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-semibold"
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Auth Footer */}
          <div className="lg:hidden">
            <AuthFooter />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex">
      {/* Left Column - Dark Blue Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#191C27] relative">
        {/* Logo/Page Name - Top Left */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-2xl font-bold text-white">
            ServicePro
          </Link>
        </div>

        {/* Copyright - Bottom Left */}
        <div className="absolute bottom-8 left-8">
          <p className="text-sm text-gray-300">
            © 2025 ServicePro. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Column - Form Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Auth Header for mobile */}
        <div className="lg:hidden">
          <AuthHeader />
        </div>

        {/* Page Name - Top Right */}
        <div className="absolute top-8 right-8">
          <div className="text-sm text-[#848D6F] font-medium">
            Update Password
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-6">
              UPDATE PASSWORD
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl font-normal text-[#191C27] mb-4 leading-none tracking-tight">
              Set your new password
            </h1>

            <p className="text-base text-[#848D6F] mb-8 leading-relaxed">
              Enter your new password below to complete the password reset
              process.
            </p>
          </div>

          {/* Update Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#191C27] mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent pr-10"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#848D6F]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#848D6F]" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#191C27] mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent pr-10"
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-[#848D6F]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#848D6F]" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.confirmPassword}
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
              disabled={loading || !isFormValid()}
              className="w-full bg-[#FF5E00] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#FF4A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Updating password...
                </>
              ) : (
                <>
                  Update password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            <div className="text-center">
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
          </form>
        </div>

        {/* Auth Footer for mobile */}
        <div className="lg:hidden">
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
