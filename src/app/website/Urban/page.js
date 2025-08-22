"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./urban.css";
import "./urban-animations.css";
import InteractiveElements from "./components/InteractiveElements";

// FAQ Card Component - Server component
function FAQCard({ question, answer }) {
  return (
    <div className="faq-card">
      <details className="faq-question">
        <summary className="faq-question-text">{question}</summary>
        <div className="faq-answer">
          <p className="faq-answer-text">{answer}</p>
        </div>
      </details>
    </div>
  );
}

export default function UrbanPage({ websiteData }) {
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

  const { business_info = {}, palette } = websiteData;
  const businessName = business_info?.name || "Business";
  const businessType = business_info?.type || "Services";

  // Extract domain from websiteData
  const domain = websiteData?.domain?.subdomain || "fieldsite";

  // Extract header configuration
  const headerConfig = websiteData?.header;

  // Check if we're in local development (localhost:3000)
  const [isLocalDev, setIsLocalDev] = useState(false);

  useEffect(() => {
    setIsLocalDev(window.location.host === "localhost:3000");
  }, []);

  // Use baseUrl for local development, relative paths for production
  const baseUrl = isLocalDev ? `/website/${domain}` : "";

  // Helper function to get the correct href
  const getHref = (url) => (isLocalDev ? `${baseUrl}${url}` : url);

  // Extract home page configuration
  const homeConfig = websiteData?.home;

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
        businessType={businessType}
        domain={domain}
        palette={palette}
        headerConfig={headerConfig}
      />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row h-screen">
        {/* Left Column - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12 pt-32 lg:pt-0 text-center lg:text-left">
          <div className="max-w-xl">
            {/* Badge above title */}
            {homeConfig?.hero?.badge?.visible ? (
              <div
                className="inline-flex px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-light mb-6 sm:mb-8 lg:mb-12 items-center hero-badge-entrance"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-white mr-1 sm:mr-1.5 lg:mr-2"></div>
                {homeConfig.hero.badge.text}
              </div>
            ) : (
              <div
                className="inline-flex px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-light mb-6 sm:mb-8 lg:mb-12 items-center hero-badge-entrance"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-white mr-1 sm:mr-1.5 lg:mr-2"></div>
                Welcome to {businessName}
              </div>
            )}

            {/* Title */}
            {homeConfig?.hero?.title?.visible ? (
              <h1
                className="text-4xl sm:text-5xl lg:text-4xl urban-hero-headline !text-4xl sm:!text-5xl lg:!text-6xl hero-title-entrance"
                style={{
                  color: "#1f2937",
                  fontWeight: homeConfig.hero.title.fontWeight || 400,
                  letterSpacing:
                    homeConfig.hero.title.letterSpacing || "-0.025em",
                  marginBottom: "1rem !important",
                }}
              >
                {homeConfig.hero.title.text}
              </h1>
            ) : (
              <h1
                className="text-4xl sm:text-5xl lg:text-4xl urban-hero-headline !text-4xl sm:!text-5xl lg:!text-6xl hero-title-entrance"
                style={{
                  color: "#1f2937",
                  fontWeight: homeConfig.hero.title.fontWeight || 400,
                  letterSpacing:
                    homeConfig.hero.title.letterSpacing || "-0.025em",
                  marginBottom: "1rem !important",
                }}
              >
                Professional {businessType}
              </h1>
            )}

            {/* Description */}
            {homeConfig?.hero?.description?.visible ? (
              <p
                className="text-base sm:text-lg mb-12 sm:mb-16 urban-hero-description hero-description-entrance"
                style={{
                  color: "#1f2937",
                  fontWeight: 300,
                }}
              >
                {homeConfig.hero.description.text}
              </p>
            ) : (
              <p
                className="text-base sm:text-lg mb-12 sm:mb-16 urban-hero-description hero-description-entrance"
                style={{
                  color: "#1f2937",
                  fontWeight: 300,
                }}
              >
                We provide exceptional {businessType.toLowerCase()} with a focus
                on quality, reliability, and customer satisfaction. Let us help
                you achieve your goals.
              </p>
            )}

            {/* Buttons */}
            {homeConfig?.hero?.buttons && homeConfig.hero.buttons.length > 0 ? (
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 hero-buttons-entrance justify-center lg:justify-start">
                {homeConfig.hero.buttons
                  .filter((button) => button.visible)
                  .sort((a, b) => a.rank - b.rank)
                  .map((button, index) => (
                    <a
                      key={index}
                      href={getHref(button.url)}
                      className={`px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button flex items-center gap-2 cursor-pointer ${
                        button.style === "primary"
                          ? "urban-button-primary"
                          : "urban-button-secondary"
                      }`}
                    >
                      {button.label}
                      {button.style === "primary" && (
                        <span className="text-sm sm:text-base lg:text-lg">
                          →
                        </span>
                      )}
                    </a>
                  ))}
              </div>
            ) : (
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 hero-buttons-entrance justify-center lg:justify-start">
                <a
                  href={getHref("/get-started")}
                  className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-primary flex items-center gap-2 cursor-pointer"
                >
                  Get Started
                  <span className="text-sm sm:text-base lg:text-lg">→</span>
                </a>
                <a
                  href={getHref("/learn-more")}
                  className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-secondary cursor-pointer"
                >
                  Learn More
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Content from home config */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center overflow-hidden px-8 lg:px-0 lg:pr-8 lg:pb-20 pb-8 hero-right-entrance"
          style={{
            backgroundColor:
              homeConfig?.hero?.content?.image_url ||
              homeConfig?.hero?.content?.video_url
                ? "white"
                : palette.neutral,
            paddingTop: "5rem", // 80px to account for header height on desktop
          }}
        >
          {homeConfig?.hero?.content?.video_url && (
            <video
              src={homeConfig.hero.content.video_url}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}
          {homeConfig?.hero?.content?.image_url &&
            !homeConfig?.hero?.content?.video_url && (
              <img
                src={homeConfig.hero.content.image_url}
                alt="Hero Image"
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
          {!homeConfig?.hero?.content?.video_url &&
            !homeConfig?.hero?.content?.image_url && (
              /* Empty right column - just neutral background */
              <div></div>
            )}
        </div>
      </section>

      {/* Stats Section */}
      {homeConfig?.stats && (
        <section
          className="py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-16 stats-section"
          style={{ backgroundColor: palette.neutral }}
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge above paragraph */}
            <div className="mb-6 sm:mb-8 stats-badge-entrance">
              <div
                className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mr-1.5 sm:mr-2"></div>
                {homeConfig.stats.badge?.text || "ABOUT US"}
              </div>
            </div>

            {/* Large Centered Paragraph */}
            <div className="mb-16 sm:mb-20 lg:mb-24 stats-description-entrance">
              <p
                className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-center tracking-tight"
                style={{ color: "#1f2937" }}
              >
                {homeConfig.stats.description?.text ||
                  "We bring your vision to life with precision and quality. Our commitment to innovation and client satisfaction ensures every project exceeds expectations."}
              </p>
            </div>

            {/* Three Stat Columns */}
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 stats-metrics-entrance">
              {homeConfig.stats.metrics &&
                homeConfig.stats.metrics.length > 0 &&
                homeConfig.stats.metrics
                  .filter((metric) => metric.visible !== false)
                  .sort((a, b) => a.rank - b.rank)
                  .slice(0, 3)
                  .map((metric, index) => (
                    <div key={index} className="text-center stats-metric-item">
                      <div
                        className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-3 sm:mb-4"
                        style={{ color: "#1f2937" }}
                      >
                        {metric.value}
                      </div>
                      <div
                        className="text-base sm:text-lg font-medium"
                        style={{ color: "#6b7280" }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {homeConfig?.services?.visible &&
        websiteData?.services?.[0]?.services &&
        websiteData.services[0].services.length > 0 && (
          <section
            className="py-20 px-8 lg:px-16 services-section"
            style={{ backgroundColor: palette.primary }}
          >
            <div className="max-w-7xl mx-auto">
              {homeConfig.services.title?.visible && (
                <h2
                  className="text-4xl lg:text-5xl mb-16 text-center urban-hero-headline services-title-entrance"
                  style={{
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {homeConfig.services.title.text || "Our Services"}
                </h2>
              )}
              <div className="services-grid">
                {websiteData.services[0].services
                  .filter((service) => service.status === "active")
                  .slice(0, 4)
                  .map((service, index) => (
                    <Link
                      key={service.id}
                      href={getHref(`/service/${service.slug}`)}
                      className={`service-card service-card-entrance-${
                        index + 1
                      } block`}
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
                        <h3
                          className="service-name"
                          style={{ color: "#1f2937" }}
                        >
                          {service.name}
                        </h3>
                        <div className="service-circle-button">→</div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* View All Button */}
              {websiteData.services?.[0]?.services &&
                websiteData.services[0].services.filter(
                  (service) => service.status === "active"
                ).length > 4 && (
                  <div className="text-center mt-16">
                    <a
                      href={getHref("/services")}
                      className="inline-flex items-center px-8 py-4 rounded-full text-base font-medium urban-button services-button-entrance"
                      style={{
                        backgroundColor: "white",
                        color: palette.primary,
                      }}
                    >
                      <span className="button-text">View All Services</span>
                      <span className="ml-2 button-arrow">→</span>
                    </a>
                  </div>
                )}
            </div>
          </section>
        )}

      {/* Features Section - Now handled by InteractiveElements component */}
      {homeConfig?.features?.visible && (
        <InteractiveElements homeConfig={homeConfig} palette={palette} />
      )}

      {/* How It Works Section */}
      <section
        className="py-12 how-it-works-section"
        style={{ backgroundColor: palette.neutral }}
      >
        {homeConfig?.howItWorks?.visible && (
          <div className="how-it-works-hero">
            <div className="how-it-works-left how-it-works-left-entrance">
              <div className="how-it-works-image">
                {homeConfig.howItWorks.image?.visible &&
                homeConfig.howItWorks.image?.url ? (
                  <img
                    src={homeConfig.howItWorks.image.url}
                    alt={
                      homeConfig.howItWorks.image.alt || "How it works process"
                    }
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="image-placeholder">
                    <div className="placeholder-text">Process Image</div>
                  </div>
                )}
              </div>
            </div>

            <div className="how-it-works-right how-it-works-right-entrance">
              <div className="how-it-works-content">
                {homeConfig.howItWorks.badge?.visible && (
                  <div className="content-badge how-it-works-badge-entrance">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    {homeConfig.howItWorks.badge.text}
                  </div>
                )}

                {homeConfig.howItWorks.title?.visible && (
                  <h2 className="content-title how-it-works-title-entrance">
                    {homeConfig.howItWorks.title.text}
                  </h2>
                )}

                {homeConfig.howItWorks.description?.visible && (
                  <p
                    className="content-description how-it-works-description-entrance"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    {homeConfig.howItWorks.description.text}
                  </p>
                )}

                <div
                  className="how-it-works-steps how-it-works-steps-entrance"
                  style={{
                    gap: "1rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "auto auto",
                  }}
                >
                  {homeConfig.howItWorks.steps &&
                    homeConfig.howItWorks.steps
                      .filter((step) => step.visible !== false)
                      .map((step, index) => (
                        <div
                          key={index}
                          className={`step-card step-card-entrance-${
                            index + 1
                          }`}
                          style={{ padding: "1rem" }}
                        >
                          <div className="step-number">{step.number}</div>
                          <div className="step-content">
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      {websiteData?.faq?.visible && (
        <section
          className="py-20 faq-section"
          style={{ backgroundColor: "white" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              {websiteData.faq.badge?.visible && (
                <div className="mb-6 sm:mb-8 faq-badge-entrance">
                  <div
                    className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                    style={{
                      backgroundColor: palette.primary,
                      color: "white",
                    }}
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mr-1.5 sm:mr-2"></div>
                    {websiteData.faq.badge.text}
                  </div>
                </div>
              )}
              {websiteData.faq.title?.visible && (
                <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto faq-title-entrance">
                  {websiteData.faq.title.text}
                </h2>
              )}
            </div>

            {/* FAQ Grid */}
            <div className="space-y-4">
              {websiteData.faq.items &&
                websiteData.faq.items
                  .filter((item) => item.visible !== false)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`faq-card faq-card-entrance-${index + 1}`}
                    >
                      <FAQCard question={item.question} answer={item.answer} />
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {websiteData?.cta?.visible && (
        <section
          className="py-20 cta-section"
          style={{ backgroundColor: palette.neutral }}
        >
          <div className="max-w-8xl mx-auto text-center px-6 sm:px-8 lg:px-16">
            {websiteData.cta.badge?.visible && (
              <div className="mb-6 sm:mb-8">
                <div
                  className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center cta-badge-entrance"
                  style={{
                    backgroundColor: palette.primary,
                    color: "white",
                  }}
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mr-1.5 sm:mr-2"></div>
                  {websiteData.cta.badge.text}
                </div>
              </div>
            )}

            {websiteData.cta.title?.visible && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1f2937] mb-8 max-w-3xl mx-auto tracking-tight cta-title-entrance">
                {websiteData.cta.title.text}
              </h2>
            )}

            {websiteData.cta.description?.visible && (
              <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-tight text-center tracking-tight text-[#6b7280] mb-12 max-w-4xl mx-auto cta-description-entrance">
                {websiteData.cta.description.text}
              </p>
            )}

            {websiteData.cta.button?.visible && (
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 justify-center cta-button-entrance">
                <a
                  href={getHref(websiteData.cta.button.url)}
                  className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-primary flex items-center gap-2 cursor-pointer"
                >
                  {websiteData.cta.button.text}
                  <span className="text-sm sm:text-base lg:text-lg">→</span>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer
        palette={palette}
        businessName={businessName}
        websiteData={websiteData}
      />
    </div>
  );
}
