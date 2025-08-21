"use client";

import "../../urban.css";
import "../../urban-animations.css";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";

export default function UrbanServicesPage({ websiteData }) {
  const servicesSectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const [filteredServices, setFilteredServices] = useState([]);

  // Extract services from websiteData - handle nested structure
  const services =
    websiteData?.services?.[0]?.services || websiteData?.services || [];

  // Filter services based on selected category - always call this hook
  useEffect(() => {
    if (!services || services.length === 0) return;

    if (selectedCategory === "View All") {
      const activeServices = services.filter(
        (service) => service.status === "active"
      );
      setFilteredServices(activeServices);
    } else {
      const categoryServices = services.filter(
        (service) =>
          service.status === "active" && service.category === selectedCategory
      );
      setFilteredServices(categoryServices);
    }
  }, [selectedCategory, services]);

  // Scroll-triggered animations for services section - always call this hook
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

    if (servicesSectionRef.current) {
      observer.observe(servicesSectionRef.current);
    }

    return () => {
      if (servicesSectionRef.current) {
        observer.unobserve(servicesSectionRef.current);
      }
    };
  }, []);

  // Don't render until we have the data
  if (!websiteData) {
    return <div>Loading...</div>;
  }

  const { business_info = {}, palette } = websiteData;

  const businessName = business_info?.name || "Business";
  const businessType = business_info?.type || "Services";

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Extract header configuration
  const headerConfig = websiteData?.header;

  // Get unique categories from services
  const categories = [
    "View All",
    ...new Set(services.map((service) => service.category)),
  ];

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
        businessType={businessType}
        domain={domain}
        palette={palette}
        headerConfig={headerConfig}
      />

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 px-8 lg:px-16"
        style={{ backgroundColor: palette.primary }}
        ref={servicesSectionRef}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 sm:mb-8 services-badge-entrance">
              <div
                className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                style={{
                  backgroundColor: palette.neutral,
                  color: palette.primary,
                }}
              >
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2"
                  style={{ backgroundColor: palette.primary }}
                ></div>
                {websiteData?.services?.[0]?.servicesPage?.hero?.badge?.text ||
                  websiteData?.servicesPage?.hero?.badge?.text ||
                  "SERVICES"}
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl lg:text-5xl mb-8 text-center urban-hero-headline services-title-entrance"
              style={{
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              {websiteData?.services?.[0]?.servicesPage?.hero?.title?.text ||
                websiteData?.servicesPage?.hero?.title?.text ||
                "Our Services"}
            </h1>

            {/* Description */}
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto urban-hero-description hero-description-entrance"
              style={{
                color: "white",
                fontWeight: 300,
              }}
            >
              {websiteData?.services?.[0]?.servicesPage?.hero?.description
                ?.text ||
                websiteData?.servicesPage?.hero?.description?.text ||
                `Discover our comprehensive range of ${businessType.toLowerCase()} designed to meet your needs with quality, reliability, and exceptional customer service.`}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-20 px-8 lg:px-16"
        style={{ backgroundColor: palette.neutral }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="mb-16 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-3 rounded-full text-base font-light transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor:
                      selectedCategory === category ? palette.primary : "white",
                    color:
                      selectedCategory === category ? "white" : palette.primary,
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="services-grid">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id || `service-${index}`}
                  className="service-card"
                  style={{
                    transition: "all 0.2s ease",
                    boxShadow: "none",
                  }}
                >
                  <div className="service-image">
                    {service.media?.main_image ? (
                      <img
                        src={service.media.main_image}
                        alt={service.name}
                        className="service-image-actual"
                      />
                    ) : (
                      <div
                        className="service-image-placeholder"
                        style={{ backgroundColor: palette.neutral }}
                      >
                        <span className="service-icon">🔧</span>
                      </div>
                    )}
                  </div>
                  <div className="service-content">
                    <h3 className="service-name" style={{ color: "#1f2937" }}>
                      {service.name}
                    </h3>
                    <div className="service-circle-button">→</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">
                No services found in this category.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Debug: Total services: {services.length}, Filtered:{" "}
                {filteredServices.length}, Selected category: {selectedCategory}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
