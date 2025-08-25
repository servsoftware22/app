"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../urban.css";
import "../../urban-animations.css";

export default function UrbanDashboardPage({ websiteData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    hasClientRecord: false,
    user: null,
    client: null,
    isLoading: true,
    error: null,
  });
  const {
    business_info = {},
    palette,
    headerConfig,
    business,
  } = websiteData || {};
  const businessName = business_info?.name || "Business";
  const businessId = business || null;

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
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

          // Redirect if user is not authenticated or doesn't have client record
          if (!result.isAuthenticated || !result.hasClientRecord) {
            const signupUrl = getHref("/signup");
            console.log("🚫 Dashboard: Redirecting to signup", {
              signupUrl,
              isLocalDev,
              domain,
              baseUrl,
              currentLocation: window.location.href,
              authResult: result,
            });
            window.location.href = signupUrl;
            return;
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
          // Redirect on error
          window.location.href = getHref("/signup");
          return;
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
        // Redirect on error
        window.location.href = getHref("/signup");
        return;
      }
    };

    checkAuthStatus();
  }, [businessId]);

  // Check if we're in local development (synchronous check)
  const isLocalDev =
    typeof window !== "undefined" && window.location.host === "localhost:3000";

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Use baseUrl for local development, relative paths for production
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  // Use header config if available, otherwise fall back to default
  const logo = headerConfig?.logo || {
    text: businessName,
    type: "text",
    image_url: null,
  };

  const firstLetter = businessName.charAt(0).toUpperCase();

  // Show loading state while checking auth or initial loading
  if (isLoading || authState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <LoadingSpinner size="large" palette={palette} />
        </div>
      </div>
    );
  }

  // Show error state if auth check failed
  if (authState.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
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

  // Don't render dashboard if user is not authorized
  if (!authState.isAuthenticated || !authState.hasClientRecord) {
    return null; // Will redirect via useEffect
  }

  const navigationTabs = [
    {
      id: "overview",
      label: "Overview",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "estimates",
      label: "Estimates",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "reports",
      label: "Reports",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "plans",
      label: "Plans",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "documents",
      label: "Documents",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      id: "support",
      label: "Support",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
          />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const renderTabContent = () => {
    const tab = navigationTabs.find((t) => t.id === activeTab);
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {tab?.label}
          </h2>
          <p className="text-gray-600">
            {tab?.label} content will be displayed here. This section is under
            development.
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              {tab?.icon &&
                React.cloneElement(tab.icon, {
                  className: "w-8 h-8 text-gray-600",
                })}
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {tab?.label} Coming Soon
          </h3>
          <p className="text-gray-600">
            This feature is currently being developed and will be available
            soon.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo - Left Side - Same style as Header.js */}
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center mr-3"
                style={{ backgroundColor: palette?.primary || "#3b82f6" }}
              >
                <span className="text-white text-base font-light urban-font">
                  {firstLetter}
                </span>
              </div>

              {/* Logo - Text or Image */}
              {logo.type === "text" ? (
                <Link
                  href={getHref("/")}
                  className="text-xl font-medium urban-font hover:opacity-80 text-gray-900"
                >
                  {logo.text}
                </Link>
              ) : logo.image_url ? (
                <Link href={getHref("/")}>
                  <img
                    src={logo.image_url}
                    alt={`${businessName} Logo`}
                    className="h-8 w-auto transition-opacity duration-300 hover:opacity-80"
                  />
                </Link>
              ) : (
                <Link
                  href={getHref("/")}
                  className="text-xl font-medium urban-font hover:opacity-80 text-gray-900"
                >
                  {businessName}
                </Link>
              )}
            </div>

            {/* CTA Buttons - Right Side - Same style as Header.js */}
            <div
              className="flex items-center space-x-3"
              style={{ minWidth: "200px", justifyContent: "flex-end" }}
            >
              <Link
                href={getHref("/book-now")}
                className="px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: palette?.primary || "#3b82f6",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Book Now
                <span className="text-md">→</span>
              </Link>
              <button
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: palette?.neutral || "#f3f4f6",
                  color: "#374151",
                  border: "none",
                }}
              >
                Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200 relative">
          <nav className="p-4 pb-32">
            <div className="space-y-2">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id
                        ? palette?.primary || "#3b82f6"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor =
                        palette?.neutral || "#f3f4f6";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* User Profile Card - Bottom of Sidebar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: palette?.primary || "#3b82f6" }}
              >
                {authState.user?.user_metadata?.avatar_url ? (
                  <img
                    src={authState.user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-5 h-5 text-white"
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
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {authState.client?.name || authState.user?.email || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {authState.user?.email || "No email"}
                </p>
                {authState.client && (
                  <p className="text-xs text-gray-400 truncate">
                    Client since{" "}
                    {new Date(
                      authState.client.details?.business_signup_date ||
                        authState.client.details?.signup_date
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={async () => {
                try {
                  const response = await fetch("/api/auth/logout", {
                    method: "POST",
                  });
                  if (response.ok) {
                    window.location.href = getHref("/");
                  }
                } catch (error) {
                  console.error("Logout error:", error);
                  // Fallback: redirect anyway
                  window.location.href = getHref("/");
                }
              }}
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white">{renderTabContent()}</div>
      </div>
    </div>
  );
}
