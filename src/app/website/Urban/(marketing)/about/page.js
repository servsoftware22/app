"use client";

import "../../urban.css";
import "../../urban-animations.css";
import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";

export default function UrbanAboutPage({ websiteData }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const aboutSectionRef = useRef(null);
  const processSectionRef = useRef(null);
  const videoGallerySectionRef = useRef(null);
  const missionSectionRef = useRef(null);

  // Extract about page configuration from websiteData
  const aboutConfig = websiteData?.about;
  const { business_info = {}, palette } = websiteData || {};
  const businessName = business_info?.name || "Business";

  // Extract sections from about config
  const heroConfig = aboutConfig?.hero;
  const processConfig = aboutConfig?.process;
  const videoGalleryConfig = aboutConfig?.videoGallery;
  const missionConfig = aboutConfig?.mission;

  // Video gallery data - fallback to sample data if not available
  const videoGallery = videoGalleryConfig?.items || [
    {
      id: 1,
      title: "Project Showcase",
      description:
        "Watch how we transform ideas into reality. Our latest project demonstrates our commitment to quality and attention to detail.",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    },
    {
      id: 2,
      title: "Behind the Scenes",
      description:
        "Get an inside look at our process and see how our team works together to deliver exceptional results.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
    },
    {
      id: 3,
      title: "Client Testimonials",
      description:
        "Hear directly from our satisfied clients about their experience working with our team and the results we delivered.",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 4,
      title: "Process Walkthrough",
      description:
        "See our step-by-step approach from initial consultation to final delivery and how we ensure quality at every stage.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 5,
      title: "Team Collaboration",
      description:
        "Discover how our diverse team works together, bringing different skills and perspectives to create outstanding results.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    },
  ];

  const hasMultipleFeatures = videoGallery.length > 2;

  // Add animation trigger when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (aboutSectionRef.current) {
        aboutSectionRef.current.classList.add("animate-in");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Comprehensive scroll-triggered animations for all sections
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
      aboutSectionRef.current,
      processSectionRef.current,
      videoGallerySectionRef.current,
      missionSectionRef.current,
    ].filter(Boolean);

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  // Always show 2 cards, but handle edge cases
  const getFeaturesToShow = () => {
    if (videoGallery.length === 0) return [];
    if (videoGallery.length === 1) return [videoGallery[0]];

    const endIndex = currentFeatureIndex + 2;
    if (endIndex > videoGallery.length) {
      return [
        ...videoGallery.slice(currentFeatureIndex),
        ...videoGallery.slice(0, endIndex - videoGallery.length),
      ];
    }
    return videoGallery.slice(currentFeatureIndex, endIndex);
  };

  const nextFeature = () => {
    if (!hasMultipleFeatures) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % videoGallery.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevFeature = () => {
    if (!hasMultipleFeatures) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentFeatureIndex((prev) =>
        prev === 0 ? videoGallery.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 150);
  };

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
        domain="fieldsite"
        palette={palette}
        headerConfig={websiteData?.header}
      />

      {/* Hero Section */}
      <section
        className="pt-20 pb-20 flex flex-col lg:flex-row h-screen"
        style={{ backgroundColor: "white" }}
        ref={aboutSectionRef}
      >
        {/* Left Column - Image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-8 pt-0 lg:pt-0 about-image-entrance">
          <div
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{ backgroundColor: palette.neutral }}
          >
            {heroConfig?.content?.image_url ? (
              <img
                src={heroConfig.content.image_url}
                alt="About Us"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12 text-center lg:text-left about-content-entrance">
          <div className="max-w-xl">
            {/* Badge above title */}
            {heroConfig?.badge?.visible && (
              <div
                className="inline-flex px-4 py-2 rounded-full text-sm font-light mb-8 items-center about-badge-entrance"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                {heroConfig.badge.text || "About Us"}
              </div>
            )}

            {/* Title */}
            {heroConfig?.title?.visible && (
              <h1
                className="text-4xl lg:text-5xl mb-8 urban-hero-headline about-title-entrance"
                style={{
                  color: "#1f2937",
                  letterSpacing: "-0.02em",
                }}
              >
                {heroConfig.title.text || "Building Tomorrow's Solutions Today"}
              </h1>
            )}

            {/* Description */}
            {heroConfig?.description?.visible && (
              <p
                className="text-lg sm:text-xl leading-relaxed mb-8 about-description-entrance"
                style={{
                  color: "#6b7280",
                  fontWeight: 300,
                }}
              >
                {heroConfig.description.text ||
                  "We are committed to delivering innovative solutions that exceed expectations. Our mission is to transform challenges into opportunities, creating lasting value for our clients and communities through dedication, expertise, and unwavering commitment to excellence."}
              </p>
            )}

            {/* Primary Button */}
            {heroConfig?.buttons && heroConfig.buttons.length > 0 && (
              <button
                className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-primary flex items-center gap-2 cursor-pointer about-button-entrance"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <span>{heroConfig.buttons[0]?.label || "Learn More"}</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Process Cards Section */}
      {processConfig?.visible && (
        <section
          className="py-20 px-8 lg:px-16"
          style={{ backgroundColor: palette.primary }}
          ref={processSectionRef}
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              {processConfig.badge?.visible && (
                <div
                  className="inline-flex px-4 py-2 rounded-full text-sm font-light mb-6 items-center about-process-badge-entrance"
                  style={{
                    backgroundColor: "white",
                    color: "#1f2937",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                  {processConfig.badge.text || "Our Approach"}
                </div>
              )}

              {processConfig.title?.visible && (
                <h2
                  className="text-4xl lg:text-5xl mb-8 urban-hero-headline about-process-title-entrance"
                  style={{
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {processConfig.title.text || "Our Approach"}
                </h2>
              )}

              {processConfig.description?.visible && (
                <p
                  className="text-lg sm:text-xl max-w-3xl mx-auto about-process-description-entrance"
                  style={{
                    color: "white",
                    fontWeight: 300,
                  }}
                >
                  {processConfig.description.text ||
                    "We follow a proven methodology that ensures every project is completed to the highest standards with attention to detail and customer satisfaction."}
                </p>
              )}
            </div>

            {/* Card Grid - 4 cards */}
            {processConfig.cards && processConfig.cards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {processConfig.cards
                  .filter((card) => card.visible)
                  .slice(0, 4)
                  .map((card, index) => (
                    <div
                      key={card.id || index}
                      className={`bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow about-process-card-entrance-${
                        index + 1
                      }`}
                    >
                      <div
                        className="w-full h-32 rounded-lg mb-4"
                        style={{ backgroundColor: palette.neutral }}
                      >
                        {card.image_url ? (
                          <img
                            src={card.image_url}
                            alt={card.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl text-gray-400">📋</span>
                          </div>
                        )}
                      </div>
                      <div className="px-4">
                        <h3
                          className="text-xl font-light mb-3"
                          style={{ color: "#1f2937", letterSpacing: "0em" }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed font-light"
                          style={{ color: "#6b7280" }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Video Gallery Section */}
      {videoGalleryConfig?.visible && (
        <section
          className="py-20 px-8 lg:px-16 features-section"
          ref={videoGallerySectionRef}
        >
          <div className="max-w-7xl mx-auto">
            <div className="features-header">
              <div className="features-header-left">
                <h2 className="features-title features-title-entrance">
                  {videoGalleryConfig.title?.text || "See Our Work in Action"}
                </h2>
              </div>
              <div className="features-navigation features-navigation-entrance">
                <button
                  className="nav-button nav-button-prev"
                  onClick={hasMultipleFeatures ? prevFeature : undefined}
                  disabled={!hasMultipleFeatures || isTransitioning}
                  style={{
                    borderColor: hasMultipleFeatures ? "#6b7280" : "#6b7280",
                    color: hasMultipleFeatures ? "#6b7280" : "#6b7280",
                    cursor: hasMultipleFeatures ? "pointer" : "default",
                    opacity: hasMultipleFeatures ? 1 : 0.5,
                  }}
                >
                  <span>←</span>
                </button>
                <button
                  className="nav-button nav-button-next"
                  onClick={hasMultipleFeatures ? nextFeature : undefined}
                  disabled={!hasMultipleFeatures || isTransitioning}
                  style={{
                    backgroundColor: hasMultipleFeatures
                      ? palette.primary
                      : "#d1d5db",
                    borderColor: hasMultipleFeatures
                      ? palette.primary
                      : "#d1d5db",
                    color: "white",
                    cursor: hasMultipleFeatures ? "pointer" : "default",
                    opacity: hasMultipleFeatures ? 1 : 0.5,
                  }}
                >
                  <span>→</span>
                </button>
              </div>
            </div>

            <div
              className={`features-showcase ${
                isTransitioning ? "transitioning" : ""
              }`}
            >
              {getFeaturesToShow().map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-showcase-card ${
                    index === 0
                      ? "feature-showcase-primary"
                      : "feature-showcase-secondary"
                  } ${
                    isTransitioning ? "transitioning" : ""
                  } feature-card-entrance-${index + 1}`}
                >
                  <div className="feature-showcase-image">
                    <img
                      src={feature.image_url || feature.image}
                      alt={feature.title}
                      className="feature-showcase-image-actual"
                    />
                  </div>
                  <div className="feature-showcase-content">
                    <h3 className="feature-showcase-title">{feature.title}</h3>
                    <p className="feature-showcase-description">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Statement Section */}
      {missionConfig?.visible && (
        <section
          className="py-16 px-8 lg:px-16"
          style={{ backgroundColor: palette.neutral }}
          ref={missionSectionRef}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 min-h-[600px]">
              {/* Left Column - Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left flex items-center py-16">
                <div className="max-w-xl mx-auto lg:mx-0">
                  {/* Badge above title */}
                  {missionConfig.badge?.visible && (
                    <div
                      className="inline-flex px-4 py-2 rounded-full text-sm font-light mb-8 items-center about-badge-entrance"
                      style={{
                        backgroundColor: "white",
                        color: "#1f2937",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                      {missionConfig.badge.text || "Our Mission"}
                    </div>
                  )}

                  {/* Title */}
                  {missionConfig.title?.visible && (
                    <h2
                      className="text-4xl lg:text-5xl mb-8 urban-hero-headline about-title-entrance"
                      style={{
                        color: "#1f2937",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {missionConfig.title.text ||
                        "Building Tomorrow's Solutions Today"}
                    </h2>
                  )}

                  {/* Description */}
                  {missionConfig.description?.visible && (
                    <p
                      className="text-lg sm:text-xl leading-relaxed mb-8 about-description-entrance"
                      style={{
                        color: "#6b7280",
                        fontWeight: 300,
                      }}
                    >
                      {missionConfig.description.text ||
                        "We are committed to delivering innovative solutions that exceed expectations. Our mission is to transform challenges into opportunities, creating lasting value for our clients and communities through dedication, expertise, and unwavering commitment to excellence."}
                    </p>
                  )}

                  {/* Primary Button */}
                  {missionConfig.buttons &&
                    missionConfig.buttons.length > 0 && (
                      <button
                        className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-primary flex items-center gap-2 cursor-pointer about-button-entrance"
                        style={{
                          backgroundColor: palette.primary,
                          color: "white",
                        }}
                      >
                        <span>
                          {missionConfig.buttons[0]?.label || "Learn More"}
                        </span>
                        <span>→</span>
                      </button>
                    )}
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="w-full lg:w-1/2 about-image-entrance">
                <div
                  className="w-full h-full rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "white" }}
                >
                  {missionConfig.content?.image_url ? (
                    <img
                      src={missionConfig.content.image_url}
                      alt="Our Mission"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-gray-300">🏗️</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
