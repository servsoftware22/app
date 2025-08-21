"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Header({
  businessName = "Business",
  businessType = "Services",
  domain = "fieldsite",
  palette,
  headerConfig = null,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  // We don't need currentPath logic anymore since we're using relative paths
  // const currentPath = pathname.replace(`/website/${domain}`, "");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past 100px for background
      setIsScrolled(currentScrollY > 100);

      // Handle hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setIsVisible(false);
        // Also close mobile menu when header hides
        setIsMobileMenuOpen(false);
      } else {
        // Scrolling up or at top - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const firstLetter = businessName.charAt(0).toUpperCase();

  // Check if we're in local development (localhost:3000)
  // Use useEffect to avoid hydration mismatch
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
  }, []);

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
  const navLinks = headerConfig?.nav_links || [];
  const ctaButtons = headerConfig?.cta_buttons || [];

  // Ensure palette exists before using it
  if (!palette) {
    console.warn("No palette provided to Header component");
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 urban-header header-background-transition header-hide-show-transition bg-white ${
          isVisible ? "header-visible" : "header-hidden"
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
            {/* Logo, Brand, and Navigation - Left side */}
            <div className="flex items-center space-x-8">
              <div className={`flex items-center space-x-3`}>
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center mr-3"
                  style={{ backgroundColor: palette.primary }}
                >
                  <span className="text-white text-base font-light urban-font">
                    {firstLetter}
                  </span>
                </div>

                {/* Logo - Text or Image */}
                {logo.type === "text" ? (
                  <Link
                    href={getHref("/")}
                    className="text-xl font-medium urban-font hover:opacity-80 header-text-transition text-gray-900"
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
                    className="text-xl font-medium urban-font hover:opacity-80 header-text-transition text-gray-900"
                  >
                    {businessName}
                  </Link>
                )}
              </div>

              {/* Navigation Links - Hidden on mobile, visible on desktop */}
              <nav className="hidden md:flex items-center urban-navigation">
                {navLinks
                  .filter((link) => link.visible)
                  .sort((a, b) => a.rank - b.rank)
                  .map((link) => {
                    const isActive =
                      pathname === link.url ||
                      (pathname === "/" && link.url === "/");

                    return (
                      <Link
                        key={link.label}
                        href={getHref(link.url)}
                        className="urban-nav-link text-gray-800"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
              </nav>
            </div>

            {/* CTA Buttons - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {ctaButtons
                .filter((button) => button.visible !== false)
                .sort((a, b) => a.rank - b.rank)
                .map((button) => (
                  <Link
                    key={button.label}
                    href={getHref(button.url)}
                    className={`px-6 py-3 rounded-full text-sm urban-button urban-font flex items-center gap-2 ${
                      button.style === "primary"
                        ? "urban-button-primary"
                        : "urban-button-secondary"
                    }`}
                  >
                    {button.label}
                    {button.style === "primary" && (
                      <span className="text-md">→</span>
                    )}
                  </Link>
                ))}
            </div>

            {/* Hamburger Menu - Visible on mobile only */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5 relative">
                  <span
                    className={`block w-6 h-0.5 bg-current hamburger-line hamburger-line-1 absolute ${
                      isMobileMenuOpen
                        ? "rotate-45 translate-y-0"
                        : "rotate-0 translate-y-0"
                    }`}
                    style={{
                      transformOrigin: "center",
                      top: isMobileMenuOpen ? "50%" : "25%",
                      left: "50%",
                      marginLeft: "-12px",
                    }}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-current hamburger-line hamburger-line-2 absolute ${
                      isMobileMenuOpen
                        ? "opacity-0 scale-x-0"
                        : "opacity-100 scale-x-100"
                    }`}
                    style={{
                      top: "50%",
                      left: "50%",
                      marginLeft: "-12px",
                      marginTop: "-0.25px",
                    }}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-current hamburger-line hamburger-line-3 absolute ${
                      isMobileMenuOpen
                        ? "-rotate-45 translate-y-0"
                        : "rotate-0 translate-y-0"
                    }`}
                    style={{
                      transformOrigin: "center",
                      top: isMobileMenuOpen ? "50%" : "75%",
                      left: "50%",
                      marginLeft: "-12px",
                    }}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? "mobile-overlay-open" : "mobile-overlay-close"
        }`}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        {/* Navigation Card */}
        <div
          className={`absolute top-20 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 ${
            isMobileMenuOpen ? "mobile-card-open" : "mobile-card-close"
          }`}
        >
          <div className="px-6 py-8">
            {/* Navigation Links */}
            <nav className="mb-8">
              <div className="space-y-3">
                {navLinks
                  .filter((link) => link.visible)
                  .sort((a, b) => a.rank - b.rank)
                  .map((link) => {
                    const isActive =
                      pathname === link.url ||
                      (pathname === "/" && link.url === "/");

                    return (
                      <Link
                        key={link.label}
                        href={getHref(link.url)}
                        className={`block text-left text-4xl sm:text-5xl lg:text-6xl font-light urban-font tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
              </div>
            </nav>

            {/* CTA Buttons */}
            {ctaButtons.filter((button) => button.visible !== false).length >
              0 && (
              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-row gap-3 sm:gap-4 justify-start">
                  {ctaButtons
                    .filter((button) => button.visible !== false)
                    .sort((a, b) => b.rank - a.rank)
                    .map((button) => (
                      <Link
                        key={button.label}
                        href={getHref(button.url)}
                        className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium urban-button urban-font ${
                          button.style === "primary"
                            ? "urban-button-primary"
                            : "urban-button-secondary"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {button.label}
                        {button.style === "primary" && (
                          <span className="ml-2">→</span>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
