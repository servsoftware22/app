"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const router = useRouter();
  const { signIn, user, userData, loading: authLoading } = useAuth();

  // Handle authentication scenarios
  useEffect(() => {
    if (authLoading) return;

    if (user && userData) {
      // User is authenticated and has users table row - redirect to dashboard
      console.log(
        "User authenticated with users table row, redirecting to dashboard"
      );
      router.push("/dashboard");
      return;
    }

    if (user && !userData) {
      // User is authenticated but no users table row - treat as login completion
      console.log(
        "User authenticated but no users table row - treating as login completion"
      );
      setIsExistingUser(true);
      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "");
    }
  }, [user, userData, authLoading, router]);

  // Custom checkbox functionality
  const handleCheckboxChange = (e) => {
    const checkbox = e.target;
    const customCheckbox = checkbox.nextElementSibling;
    const checkmark = customCheckbox.querySelector("svg");

    if (checkbox.checked) {
      customCheckbox.classList.add("bg-[#FF5E00]", "border-[#FF5E00]");
      checkmark.classList.remove("hidden");
    } else {
      customCheckbox.classList.remove("bg-[#FF5E00]", "border-[#FF5E00]");
      checkmark.classList.add("hidden");
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const cleanPhone = phone?.replace(/[\s\-\(\)\.]/g, "");
    return (
      phone &&
      cleanPhone &&
      cleanPhone.length >= 10 &&
      cleanPhone.length <= 11 &&
      /^\d+$/.test(cleanPhone)
    );
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

    if (field === "phone") {
      if (!value.trim()) {
        errors.phone = "Phone number is required";
      } else if (!isValidPhone(value)) {
        errors.phone = "Please enter a valid US phone number (10-11 digits)";
      } else {
        delete errors.phone;
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touchedFields.password) {
      validateField("password", value);
    }
    if (touchedFields.confirmPassword && confirmPassword) {
      validateField("confirmPassword", confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touchedFields.confirmPassword) {
      validateField("confirmPassword", value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (touchedFields.phone) {
      validateField("phone", value);
    }
  };

  const handleEmailBlur = () => {
    setTouchedFields((prev) => ({ ...prev, email: true }));
    validateField("email", email);
  };

  const handlePasswordBlur = () => {
    setTouchedFields((prev) => ({ ...prev, password: true }));
    validateField("password", password);
  };

  const handleConfirmPasswordBlur = () => {
    setTouchedFields((prev) => ({ ...prev, confirmPassword: true }));
    validateField("confirmPassword", confirmPassword);
  };

  const handlePhoneBlur = () => {
    setTouchedFields((prev) => ({ ...prev, phone: true }));
    validateField("phone", phone);
  };

  const isFormValid = () => {
    return (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      isValidEmail(email) &&
      password.trim() !== "" &&
      password.length >= 6 &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      phone.trim() !== "" &&
      isValidPhone(phone) &&
      agreedToTerms &&
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
    setShowLoginPrompt(false);

    try {
      if (isExistingUser) {
        // User is authenticated but no users table row - try to complete signup
        console.log("Completing signup for existing authenticated user");

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            phone,
            fullName,
            isExistingUser: true,
            userId: user.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.error === "INVALID_PASSWORD") {
            // Wrong password for existing user
            setShowLoginPrompt(true);
            setError(
              "Incorrect password. Please sign in with your existing account."
            );
            return;
          }
          throw new Error(data.error || "Failed to complete signup");
        }

        // Signup completed successfully, redirect to dashboard
        router.push("/dashboard");
      } else {
        // New user signup
        console.log("Creating new user account");

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            phone,
            fullName,
            isExistingUser: false,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create account");
        }

        // Sign in the user after successful backend signup
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (signInError) {
          console.error("Auto sign-in failed:", signInError);
          // Fallback: try context signIn
          const { error: ctxError } = await signIn(email, password);
          if (ctxError) {
            console.error("Context sign-in failed:", ctxError);
          }
        }

        // Redirect to dashboard after successful signup
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <div className="flex-1 flex">
        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 pt-20 pb-20">
          <div className="w-full max-w-md">
            {/* Title */}
            <h1 className="text-3xl font-bold text-[#191C27] mb-2">
              {isExistingUser ? "Complete Your Account" : "Get Started"}
            </h1>
            <p className="text-[#848D6F] mb-8">
              {isExistingUser
                ? "Enter your password to complete your account setup."
                : "Create your account to start your free trial."}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

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

              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
                {fieldErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent pr-10"
                    placeholder="min 6 chars"
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
                <label className="block text-sm font-medium text-[#191C27] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordBlur}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent pr-10"
                    placeholder="Confirm your password"
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

              <div className="flex items-start mt-6 mb-6">
                <div className="flex items-center h-5">
                  <label
                    htmlFor="agree-terms"
                    className="relative inline-flex items-center cursor-pointer select-none"
                  >
                    <input
                      id="agree-terms"
                      name="agree-terms"
                      type="checkbox"
                      className="sr-only peer"
                      required
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span className="block w-4 h-4 border-2 border-gray-300 rounded transition-colors peer-checked:bg-[#FF5E00] peer-checked:border-[#FF5E00]"></span>
                    <svg
                      className="pointer-events-none absolute left-0 top-0 w-4 h-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="agree-terms"
                    className="text-[#848D6F] cursor-pointer"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms-of-service"
                      className="text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      className="text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-medium"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {showLoginPrompt && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700">
                  <p className="text-sm mb-2">
                    It looks like you already have an account. Please{" "}
                    <Link
                      href="/auth/login"
                      className="text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-medium underline"
                    >
                      sign in here
                    </Link>{" "}
                    instead.
                  </p>
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
                    {isExistingUser
                      ? "Completing account..."
                      : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isExistingUser ? "Complete Account" : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-[#848D6F]">
                Already have an account?{" "}
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
