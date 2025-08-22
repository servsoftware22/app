"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthHeader({
  businessName = "Business",
  domain = "fieldsite",
  palette,
  pageLabel = "Auth",
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Check if scrolled past 100px for background
      setIsScrolled(currentScrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstLetter = businessName.charAt(0).toUpperCase();

  // Check if we're in local development (localhost:3000)
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
  }, []);

  // Use baseUrl for local development, relative paths for production (same pattern as Header)
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href (same pattern as Header)
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  // Ensure palette exists before using it
  if (!palette) {
    console.warn("No palette provided to AuthHeader component");
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 urban-header header-background-transition bg-white ${
        isScrolled ? "header-scrolled" : ""
      }`}
      style={{
        "--primary-color": palette.primary,
        "--accent-color": palette.accent || palette.secondary,
        // Add smooth transitions to prevent flashing
        transition: "all 0.3s ease-in-out",
        willChange: "transform, opacity",
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand - Left Side - Exact same styling as Header */}
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center mr-3"
              style={{ backgroundColor: palette.primary }}
            >
              <span className="text-white text-base font-light urban-font">
                {firstLetter}
              </span>
            </div>

            {/* Logo - Text - Always text for auth pages */}
            <Link
              href={getHref("/")}
              className="text-xl font-medium urban-font hover:opacity-80 header-text-transition text-gray-900"
            >
              {businessName}
            </Link>
          </div>

          {/* Page Label Badge - Right Side */}
          <div className="flex items-center">
            <div
              className="px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: palette.primary }}
            >
              {pageLabel}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
