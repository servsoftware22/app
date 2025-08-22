"use client";

import "../../urban.css";
import "../../urban-animations.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";

export default function UrbanServicePage({ websiteData, params }) {
  const serviceSectionRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const faqSectionRef = useRef(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if we're in local development (localhost:3000)
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
  }, []);

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Use baseUrl for local development, relative paths for production (same pattern as Header)
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href (same pattern as Header)
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  // Extract services from websiteData - handle nested structure
  const services =
    websiteData?.services?.[0]?.services || websiteData?.services || [];

  // Find the specific service by slug
  const service = services.find((s) => s.slug === params.slug);

  // Extract business info and palette
  const { business_info = {}, palette } = websiteData || {};
  const businessName = business_info?.name || "Business";

  // Extract header configuration
  const headerConfig = websiteData?.header;

  // Scroll-triggered animations for all sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    // Observe all sections
    const sections = [
      serviceSectionRef.current,
      featuresSectionRef.current,
      faqSectionRef.current,
    ].filter(Boolean);

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Also observe individual feature cards for better animation control
    const featureCards = document.querySelectorAll(
      ".feature-card-entrance-1, .feature-card-entrance-2, .feature-card-entrance-3, .feature-card-entrance-4, .feature-card-entrance-5, .feature-card-entrance-6"
    );
    featureCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
      featureCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  // Guard clause for build time when websiteData is undefined
  if (!websiteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Ensure palette exists before rendering
  if (!palette) {
    console.warn("No palette found in websiteData");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Configuration Error
          </h1>
          <p className="text-gray-600 mb-4">
            Website palette configuration is missing.
          </p>
        </div>
      </div>
    );
  }

  // If service not found, show 404
  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested service could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="urban-font"
      style={{
        "--primary-color": palette.primary,
        "--accent-color": palette.accent || palette.secondary,
        "--neutral-color": palette.neutral,
      }}
    >
      <Header
        businessName={businessName}
        businessType="Services"
        domain={domain}
        palette={palette}
        headerConfig={headerConfig}
      />

      {/* Hero Section */}
      <section
        className="pt-20 pb-20 px-4 lg:px-10"
        style={{ backgroundColor: "white" }}
        ref={serviceSectionRef}
      >
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2 service-image-entrance relative">
              {/* Category Badge - Top Left Corner of Image */}
              <div className="absolute top-4 left-4 z-10 service-badge-entrance">
                <div
                  className="inline-flex px-3 py-2 rounded-full text-sm font-light items-center"
                  style={{
                    backgroundColor: palette.neutral,
                    color: "#374151",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                  {service.category}
                </div>
              </div>

              <div
                className="w-full h-[500px] lg:h-[700px] rounded-2xl overflow-hidden"
                style={{ backgroundColor: palette.primary }}
              >
                {service.media?.main_image ? (
                  <img
                    src={service.media.main_image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">🔧</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="w-full lg:w-1/2 service-content-entrance flex justify-center">
              <div className="max-w-xl">
                {/* Pricing Badge - Above Title */}
                {service.pricing && (
                  <div className="mb-8 service-pricing-entrance">
                    <div
                      className="inline-flex items-center px-4 py-2 rounded-full"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <span
                        className="text-base font-normal"
                        style={{ color: "white" }}
                      >
                        Starting at ${service.pricing.base_price}
                      </span>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h1
                  className="text-4xl lg:text-5xl mb-12 urban-hero-headline service-title-entrance"
                  style={{
                    color: "#1f2937",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {service.name}
                </h1>

                {/* Description */}
                <p
                  className="text-lg sm:text-xl leading-relaxed mb-12 service-description-entrance"
                  style={{
                    color: "#6b7280",
                    fontWeight: 300,
                  }}
                >
                  {service.description?.long || service.description?.short}
                </p>

                {/* Action Button */}
                <div className="service-buttons-entrance">
                  {service.booking?.is_bookable ? (
                    <button
                      className="px-8 py-4 rounded-full text-base font-medium urban-button urban-button-primary flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        backgroundColor: palette.primary,
                        color: "white",
                      }}
                    >
                      <span>Book Now</span>
                      <span>→</span>
                    </button>
                  ) : service.booking?.is_quotable ? (
                    <button
                      className="px-8 py-4 rounded-full text-base font-medium urban-button urban-button-primary flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        backgroundColor: palette.primary,
                        color: "white",
                      }}
                    >
                      <span>Get Quote</span>
                      <span>→</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <section
          className="pt-8 pb-12 px-8 lg:px-16"
          style={{ backgroundColor: "white" }}
          ref={featuresSectionRef}
        >
          <div className="max-w-7xl mx-auto">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-6 feature-card-entrance-${
                    (index % 6) + 1
                  }`}
                  style={{ backgroundColor: palette.neutral }}
                >
                  {/* Check Icon */}
                  <div className="mb-4">
                    <img
                      src="https://toolpage.site/icons/check.png"
                      alt="Included"
                      className="w-8 h-8"
                      style={{ filter: "invert(1) brightness(0) opacity(0.8)" }}
                    />
                  </div>

                  <h3
                    className="text-2xl font-light mb-4"
                    style={{ color: "#1f2937", letterSpacing: "0em" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed font-light"
                    style={{ color: "#6b7280" }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <section
          className="pt-16 pb-12 faq-section"
          style={{ backgroundColor: "white" }}
          ref={faqSectionRef}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto faq-title-entrance">
                Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ Grid */}
            <div className="space-y-4">
              {service.faq.map((item, index) => (
                <div
                  key={index}
                  className={`faq-card faq-card-entrance-${index + 1}`}
                >
                  <details className="faq-question">
                    <summary className="faq-question-text">
                      {item.question}
                    </summary>
                    <div className="faq-answer">
                      <p className="faq-answer-text">{item.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Services Section */}
      {services.length > 1 && (
        <section
          className="py-20 px-8 lg:px-16"
          style={{ backgroundColor: palette.neutral }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2
                className="text-4xl lg:text-5xl mb-8 urban-hero-headline"
                style={{
                  color: "#1f2937",
                  letterSpacing: "-0.02em",
                }}
              >
                Other Services
              </h2>
              <p
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{
                  color: "#6b7280",
                  fontWeight: 300,
                }}
              >
                Explore our other professional services designed to meet your
                needs.
              </p>
            </div>

            {/* Services Grid - Show 3 other services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services
                .filter((s) => s.slug !== params.slug) // Exclude current service
                .slice(0, 3) // Show 3 other services
                .map((otherService, index) => (
                  <Link
                    key={otherService.id}
                    href={getHref(`/service/${otherService.slug}`)}
                    className="service-card block"
                    style={{
                      transition: "all 0.5s ease-in-out",
                      boxShadow: "none",
                    }}
                  >
                    <div className="service-image">
                      {otherService.media?.main_image ? (
                        <img
                          src={otherService.media.main_image}
                          alt={otherService.name}
                          className="service-image-actual"
                        />
                      ) : (
                        <div
                          className="service-image-placeholder"
                          style={{ backgroundColor: palette.primary }}
                        >
                          <span className="service-icon">🔧</span>
                        </div>
                      )}
                    </div>
                    <div className="service-content">
                      <h3 className="service-name" style={{ color: "#1f2937" }}>
                        {otherService.name}
                      </h3>
                      <div className="service-circle-button">→</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
