"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  CheckCircle,
  Users,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
    job_title: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Required fields
    if (!formData.first_name?.trim())
      errors.first_name = "First name is required";
    if (!formData.last_name?.trim()) errors.last_name = "Last name is required";
    if (!formData.email?.trim()) errors.email = "Email is required";
    if (!formData.phone?.trim()) errors.phone = "Phone is required";
    if (!formData.notes?.trim()) errors.notes = "Message is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation - clean and check for 10-11 digits
    const cleanPhone = formData.phone?.replace(/[\s\-\(\)\.]/g, "");
    if (
      formData.phone &&
      (!cleanPhone ||
        cleanPhone.length < 10 ||
        cleanPhone.length > 11 ||
        !/^\d+$/.test(cleanPhone))
    ) {
      errors.phone = "Please enter a valid US phone number (10-11 digits)";
    }

    return errors;
  };

  const isFormValid = () => {
    const requiredFields = [
      formData.first_name?.trim(),
      formData.last_name?.trim(),
      formData.email?.trim(),
      formData.phone?.trim(),
      formData.notes?.trim(),
    ];

    // Check if all required fields are filled
    const allFieldsFilled = requiredFields.every(
      (field) => field && field.length > 0
    );

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = formData.email && emailRegex.test(formData.email);

    // Basic phone validation
    const cleanPhone = formData.phone?.replace(/[\s\-\(\)\.]/g, "");
    const isPhoneValid =
      formData.phone &&
      cleanPhone &&
      cleanPhone.length >= 10 &&
      cleanPhone.length <= 11 &&
      /^\d+$/.test(cleanPhone);

    return allFieldsFilled && isEmailValid && isPhoneValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setFieldErrors({});

    // Client-side validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          // Server validation errors
          const serverErrors = {};
          data.details.forEach((error) => {
            if (error.includes("First name")) serverErrors.first_name = error;
            else if (error.includes("Last name"))
              serverErrors.last_name = error;
            else if (error.includes("Email")) serverErrors.email = error;
            else if (error.includes("Phone")) serverErrors.phone = error;
            else if (error.includes("Message")) serverErrors.notes = error;
          });
          setFieldErrors(serverErrors);
        } else {
          setError(
            data.error ||
              "There was an error submitting your message. Please try again."
          );
        }
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0CBBE] via-white to-[#C0CBBE] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              CONTACT
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
              Let's talk about
              <br />
              <span className="text-[#FF5E00]">your business</span>
            </h1>

            <p className="text-lg md:text-xl text-[#848D6F] mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to grow your service business? We're here to help. Get in
              touch and let's discuss how ServicePro can transform your
              business.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-2xl mx-auto"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#191C27] mb-2">
                Message sent successfully!
              </h3>
              <p className="text-[#848D6F] mb-4">
                Thank you for reaching out. We'll get back to you within 4
                hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    company: "",
                    phone: "",
                    job_title: "",
                    notes: "",
                  });
                }}
                className="inline-flex items-center bg-[#FF5E00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF4A00] transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-2xl mx-auto"
            >
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent ${
                      fieldErrors.first_name
                        ? "border-red-300"
                        : "border-gray-200"
                    }`}
                    placeholder="Your first name"
                  />
                  {fieldErrors.first_name && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent ${
                      fieldErrors.last_name
                        ? "border-red-300"
                        : "border-gray-200"
                    }`}
                    placeholder="Your last name"
                  />
                  {fieldErrors.last_name && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent ${
                      fieldErrors.email ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="your@email.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent ${
                      fieldErrors.phone ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="Your phone number"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent"
                    placeholder="Your job title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-2">
                  Message *
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent resize-none ${
                    fieldErrors.notes ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Tell us about your business and how we can help..."
                />
                {fieldErrors.notes && (
                  <p className="text-red-600 text-sm mt-1">
                    {fieldErrors.notes}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className="w-full bg-[#FF5E00] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#FF4A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-[#FF5E00]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of service professionals who trust ServicePro to grow
            their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center bg-white text-[#FF5E00] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF5E00] transition-colors"
            >
              Get help
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
