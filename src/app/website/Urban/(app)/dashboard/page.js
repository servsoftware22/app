"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "../../../[domain]/components";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanDashboardPage({ websiteData }) {
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
                {businessName} Dashboard
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
                href={getHref("/book-now")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your appointments, view your history, and stay connected with{" "}
            {businessName}.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Appointments
              </h3>
            </div>
            <div className="text-center py-8">
              <LoadingSpinner size="default" palette={palette} />
              <p className="mt-3 text-gray-600">Loading appointments...</p>
            </div>
          </div>

          {/* Service History */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Service History
              </h3>
            </div>
            <div className="text-center py-8">
              <LoadingSpinner size="default" palette={palette} />
              <p className="mt-3 text-gray-600">Loading history...</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="space-y-3">
              <a
                href={getHref("/book-now")}
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book New Service
              </a>
              <button className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <LoadingSpinner size="default" palette={palette} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Dashboard Features Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're building a comprehensive dashboard to help you manage your
              experience with {businessName}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Planned Features:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    View and manage appointments
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Access service history and receipts
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Update personal information
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Message with service providers
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Current Status:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">User Authentication</span>
                    <span className="text-green-600 text-sm">✓ Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Dashboard UI</span>
                    <span className="text-yellow-600 text-sm">
                      🔄 In Progress
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Booking System</span>
                    <span className="text-gray-400 text-sm">⏳ Planned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Notifications</span>
                    <span className="text-gray-400 text-sm">⏳ Planned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
