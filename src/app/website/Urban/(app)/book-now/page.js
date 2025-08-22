"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "../../../[domain]/components";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanBookNowPage({ websiteData }) {
  const [isLoading, setIsLoading] = useState(true);
  const { business_info = {}, palette } = websiteData || {};
  const businessName = business_info?.name || "Business";

  // Check if we're in local development (localhost:3000)
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Use baseUrl for local development, relative paths for production
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <LoadingSpinner size="large" palette={palette} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: palette?.primary || "#3b82f6" }}
              >
                {businessName.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                {businessName}
              </h1>
            </div>
            <div className="flex space-x-4">
              <a
                href={getHref("/")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href={getHref("/services")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Book Your Service
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule your appointment with {businessName}. Choose your
              preferred service, date, and time to get started.
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <LoadingSpinner size="default" palette={palette} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Booking System Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you a seamless booking experience.
              This feature will allow you to:
            </p>
            <ul className="text-left text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Browse available services and pricing
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Select your preferred date and time
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Book appointments online 24/7
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Receive confirmation and reminders
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>In the meantime:</strong> Contact us directly to
                schedule your appointment. We're here to help you get the
                service you need.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Us to Book
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Call Us</h4>
                <p className="text-gray-600">Available during business hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Email Us</h4>
                <p className="text-gray-600">We'll respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
