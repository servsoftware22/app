"use client";

import "../../urban.css";
import "../../urban-animations.css";
import { useEffect, useRef, useState } from "react";

export default function UrbanServicesPage({ websiteData }) {
  console.log("UrbanServicesPage received websiteData:", websiteData); // Debug log

  const servicesSectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState([]);

  // Filter services based on selected category - always call this hook
  useEffect(() => {
    if (!websiteData?.services) return;

    const services = websiteData.services;

    if (selectedCategory === "All") {
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
  }, [selectedCategory, websiteData?.services]);

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
    console.log("No websiteData, showing loading"); // Debug log
    return <div>Loading...</div>;
  }

  const { business_info = {}, palette } = websiteData;

  const businessName = business_info?.name || "Business";
  const businessType = business_info?.type || "Services";

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Extract header configuration
  const headerConfig = websiteData?.header;

  // Extract services from websiteData
  const services = websiteData?.services || [];

  // Get unique categories from services
  const categories = [
    "All",
    ...new Set(services.map((service) => service.category)),
  ];

  console.log("Rendering with data:", {
    businessName,
    businessType,
    services: services.length,
  }); // Debug log

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-20 px-8 lg:px-16"
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
                SERVICES
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
              Our Services
            </h1>

            {/* Description */}
            <p
              className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto urban-hero-description hero-description-entrance"
              style={{
                color: "white",
                fontWeight: 300,
              }}
            >
              Discover our comprehensive range of {businessType.toLowerCase()}{" "}
              designed to meet your needs with quality, reliability, and
              exceptional customer service.
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
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "urban-button-primary"
                      : "urban-button-secondary"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? palette.primary
                        : "transparent",
                    color:
                      selectedCategory === category ? "white" : palette.primary,
                    borderColor: palette.primary,
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
                  key={service.id}
                  className={`service-card service-card-entrance-${
                    (index % 4) + 1
                  }`}
                  style={{
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
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
                        style={{ backgroundColor: palette.primary }}
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
            </div>
          )}

          {/* Service Count */}
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              Showing {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
