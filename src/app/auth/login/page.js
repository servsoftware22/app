"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [needsProfile, setNeedsProfile] = useState(false);

  const router = useRouter();
  const { signIn } = useAuth();

  // Check for client data when email is available
  useEffect(() => {
    if (email.trim() && isValidEmail(email)) {
      checkForClientData(email);
    }
  }, [email]);

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
      } else {
        delete errors.password;
      }
    }

    if (field === "fullName") {
      if (!value.trim()) {
        errors.fullName = "Full name is required";
      } else {
        delete errors.fullName;
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
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    if (touchedFields.fullName) {
      validateField("fullName", value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (touchedFields.phone) {
      validateField("phone", value);
    }
  };

  const handlePasswordBlur = () => {
    setTouchedFields((prev) => ({ ...prev, password: true }));
    validateField("password", password);
  };

  const handleFullNameBlur = () => {
    setTouchedFields((prev) => ({ ...prev, fullName: true }));
    validateField("fullName", fullName);
  };

  const handlePhoneBlur = () => {
    setTouchedFields((prev) => ({ ...prev, phone: true }));
    validateField("phone", phone);
  };

  const isFormValid = () => {
    if (needsProfile) {
      return (
        email.trim() !== "" &&
        isValidEmail(email) &&
        password.trim() !== "" &&
        fullName.trim() !== "" &&
        phone.trim() !== "" &&
        isValidPhone(phone) &&
        Object.keys(fieldErrors).length === 0
      );
    }

    return (
      email.trim() !== "" &&
      isValidEmail(email) &&
      password.trim() !== "" &&
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
      // Call our login API route
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName: needsProfile ? fullName : undefined,
          phone: needsProfile ? phone : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.userCreated) {
        // User profile was created, redirect to dashboard
        console.log(
          "User profile created during login, redirecting to dashboard"
        );
        router.push("/dashboard");
      } else {
        // Normal login successful, redirect to dashboard
        console.log("Normal login successful, redirecting to dashboard");
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailBlur = () => {
    setTouchedFields((prev) => ({ ...prev, email: true }));
    validateField("email", email);

    // Check if this email might need a profile and look for client data
    if (email.trim() && isValidEmail(email)) {
      checkForClientData(email);
    }
  };

  // Function to check if user might have client data and pre-fill form
  const checkForClientData = async (email) => {
    if (!email.trim() || !isValidEmail(email)) return;

    try {
      // Check if there's client data for this email
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
        }),
      });

      if (response.ok) {
        const clientData = await response.json();
        if (clientData.client) {
          // Found client data, pre-fill the form
          console.log("Found existing client data, pre-filling form");
          setFullName(clientData.client.name || "");
          setPhone(clientData.client.phone || "");
          setNeedsProfile(true);
        }
      }
    } catch (error) {
      console.log("Could not check for client data:", error);
      // Fallback to showing profile fields
      setNeedsProfile(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <div className="flex-1 flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 pt-20 pb-20">
          <div className="w-full max-w-md">
            {/* Title */}
            <h1 className="text-3xl font-bold text-[#191C27] mb-2">
              {needsProfile ? "Complete Your Profile" : "Login"}
            </h1>
            <p className="text-[#848D6F] mb-8">
              {needsProfile
                ? "Please provide your information to complete your account setup."
                : "Welcome back! Sign in to your account."}
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
                    placeholder="min 8 chars"
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

              {/* Profile fields - shown when user needs to complete profile */}
              {needsProfile && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#191C27] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={handleFullNameChange}
                      onBlur={handleFullNameBlur}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                    {fieldErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#191C27] mb-1">
                      Phone Number
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
                </>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    htmlFor="remember-me"
                    className="relative inline-flex items-center cursor-pointer select-none"
                  >
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="sr-only peer"
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
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-[#848D6F] cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    href="/auth/reset-password"
                    className="text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                    {needsProfile ? "Creating profile..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {needsProfile ? "Complete Profile & Login" : "Login"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-[#848D6F]">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-[#FF5E00] hover:text-[#FF4A00] transition-colors font-semibold"
                >
                  Sign up
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
