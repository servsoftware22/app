"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "../../../[domain]/components";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanQuotePage({ websiteData }) {
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
                Quote Details
              </h1>
            </div>
            <div className="flex space-x-4">
              <a
                href={getHref("/dashboard")}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quote Management
          </h2>
          <p className="text-lg text-gray-600">
            View and manage your quotes with {businessName}.
          </p>
        </div>

        {/* Quote Placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <LoadingSpinner size="default" palette={palette} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Quote System Coming Soon
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            We're building a comprehensive quote management system to help you
            review and approve service estimates.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              <strong>What's Coming:</strong> View detailed quotes, compare
              service options, approve estimates, and convert quotes to bookings
              all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h4 className="font-medium text-gray-900 mb-1">Quote History</h4>
              <p className="text-gray-600 text-sm">
                Access all your past quotes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">
                Service Details
              </h4>
              <p className="text-gray-600 text-sm">Review service breakdowns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-purple-600"
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
              <h4 className="font-medium text-gray-900 mb-1">Quick Actions</h4>
              <p className="text-gray-600 text-sm">Approve and book services</p>
            </div>
          </div>
        </div>

        {/* Quote Process */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            How Quotes Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <p className="text-sm text-gray-600">Request Service</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <p className="text-sm text-gray-600">Receive Quote</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <p className="text-sm text-gray-600">Review & Approve</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <p className="text-sm text-gray-600">Book Service</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Need a Quote?
          </h3>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Ready to get started? Request a quote for your service needs.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href={getHref("/book-now")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Quote
              </a>
              <a
                href={getHref("/dashboard")}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
