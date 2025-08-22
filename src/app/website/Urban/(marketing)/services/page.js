"use client";

import "../../urban.css";
import "../../urban-animations.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";

export default function UrbanServicesPage({ websiteData }) {
  const servicesSectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Extract services from websiteData - handle nested structure
  const services =
    websiteData?.services?.[0]?.services || websiteData?.services || [];

  // Check if we're in local development (localhost:3000)
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
  }, []);

  // Filter services based on selected category with smooth transitions
  useEffect(() => {
    if (!services || services.length === 0) return;

    // Start transition
    setIsTransitioning(true);

    // Delay the filter update to allow fade out animation
    const timer = setTimeout(() => {
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

      // End transition after content is updated
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);

    return () => clearTimeout(timer);
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

  // Use baseUrl for local development, relative paths for production (same pattern as Header)
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href (same pattern as Header)
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

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

      {/* Merged Services Section with Neutral Background */}
      <section
        className="pt-32 pb-20 px-8 lg:px-16"
        style={{
          backgroundColor: palette.neutral,
          minHeight: "100vh",
        }}
        ref={servicesSectionRef}
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Content - Badge, Title, Description */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="mb-6 sm:mb-8 services-badge-entrance">
              <div
                className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2"
                  style={{ backgroundColor: "white" }}
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
                color: "#374151",
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
                color: "#6b7280",
                fontWeight: 300,
              }}
            >
              {websiteData?.services?.[0]?.servicesPage?.hero?.description
                ?.text ||
                websiteData?.servicesPage?.hero?.description?.text ||
                `Discover our comprehensive range of ${businessType.toLowerCase()} designed to meet your needs with quality, reliability, and exceptional customer service.`}
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-16 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-base font-light transition-all duration-500 ease-in-out cursor-pointer service-category-entrance-${
                    index + 1
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? palette.primary : "white",
                    color:
                      selectedCategory === category ? "white" : palette.primary,
                    transform:
                      selectedCategory === category
                        ? "scale(1.05)"
                        : "scale(1)",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div
            className={`services-grid-container transition-all duration-500 ease-in-out ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
          >
            {filteredServices.length > 0 ? (
              <div className="services-grid">
                {filteredServices.map((service, index) => (
                  <Link
                    key={`${
                      service.id || `service-${index}`
                    }-${selectedCategory}`}
                    href={getHref(`/service/${service.slug}`)}
                    className={`service-card service-card-entrance-${
                      (index % 2) + 1
                    } block`}
                    style={{
                      transition: "all 0.5s ease-in-out",
                      boxShadow: "none",
                      opacity: isTransitioning ? 0 : 1,
                      transform: isTransitioning
                        ? "translateY(20px)"
                        : "translateY(0)",
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
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
