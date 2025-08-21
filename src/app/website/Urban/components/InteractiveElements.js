"use client";

import { useEffect, useState } from "react";

export default function InteractiveElements({ homeConfig, palette }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll-triggered animations for all sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class to the section
            entry.target.classList.add("animate-in");

            // Also trigger animations for child elements with entrance classes
            const animatedElements = entry.target.querySelectorAll(
              '[class*="-entrance"], [class*="entrance-"]'
            );
            animatedElements.forEach((el) => {
              el.classList.add("animate-in");
            });
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: "0px 0px -50px 0px", // Start animation sooner
      }
    );

    // Wait for DOM to be ready, then observe sections
    const timer = setTimeout(() => {
      // Observe all sections that need animations
      const sections = document.querySelectorAll(
        ".stats-section, .services-section, .features-section, .how-it-works-section, .faq-section, .cta-section"
      );

      sections.forEach((section) => {
        observer.observe(section);
      });

      // Also observe any sections with py- classes as fallback
      const pySections = document.querySelectorAll('section[class*="py-"]');
      pySections.forEach((section) => {
        if (
          !section.classList.contains("stats-section") &&
          !section.classList.contains("services-section") &&
          !section.classList.contains("features-section") &&
          !section.classList.contains("how-it-works-section") &&
          !section.classList.contains("faq-section") &&
          !section.classList.contains("cta-section")
        ) {
          observer.observe(section);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      const sections = document.querySelectorAll(
        ".stats-section, .services-section, .features-section, .how-it-works-section, .faq-section, .cta-section"
      );
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Feature navigation functions
  const nextFeature = () => {
    if (homeConfig?.features?.items && !isTransitioning) {
      const visibleFeatures = homeConfig.features.items.filter(
        (feature) => feature.visible !== false
      );

      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentFeatureIndex((prev) =>
          prev === visibleFeatures.length - 1 ? 0 : prev + 1
        );

        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 150);
    }
  };

  const prevFeature = () => {
    if (homeConfig?.features?.items && !isTransitioning) {
      const visibleFeatures = homeConfig.features.items.filter(
        (feature) => feature.visible !== false
      );

      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentFeatureIndex((prev) =>
          prev === 0 ? visibleFeatures.length - 1 : prev - 1
        );

        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 150);
    }
  };

  // Check if navigation should be disabled
  const visibleFeatures =
    homeConfig?.features?.items?.filter(
      (feature) => feature.visible !== false
    ) || [];
  const hasMultipleFeatures = visibleFeatures.length > 2;

  // Always show 2 cards, but handle edge cases
  const getFeaturesToShow = () => {
    if (visibleFeatures.length === 0) return [];
    if (visibleFeatures.length === 1) return [visibleFeatures[0]];

    const endIndex = currentFeatureIndex + 2;
    if (endIndex > visibleFeatures.length) {
      return [
        ...visibleFeatures.slice(currentFeatureIndex),
        ...visibleFeatures.slice(0, endIndex - visibleFeatures.length),
      ];
    }
    return visibleFeatures.slice(currentFeatureIndex, endIndex);
  };

  return (
    <>
      {/* Features Section */}
      <section className="py-20 px-8 lg:px-16 features-section">
        <div className="max-w-7xl mx-auto">
          <div className="features-header">
            <div className="features-header-left">
              <h2 className="features-title features-title-entrance">
                {homeConfig.features.title?.text ||
                  "Building excellence through every feature we deliver"}
              </h2>
            </div>
            <div className="features-navigation features-navigation-entrance">
              <button
                className="nav-button nav-button-prev"
                onClick={hasMultipleFeatures ? prevFeature : undefined}
                disabled={!hasMultipleFeatures}
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
                disabled={!hasMultipleFeatures}
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
                key={feature.id || index}
                className={`feature-showcase-card ${
                  index === 0
                    ? "feature-showcase-primary"
                    : "feature-showcase-secondary"
                } feature-card-entrance-${index + 1}`}
              >
                <div className="feature-showcase-image">
                  <img
                    src={feature.image}
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
    </>
  );
}
