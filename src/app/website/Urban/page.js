import Header from "./components/Header";
import Footer from "./components/Footer";
import "./urban.css";
import "./urban-animations.css";

// FAQ Card Component - Converted to server component
function FAQCard({ question, answer }) {
  return (
    <div className="faq-card">
      <details className="faq-details">
        <summary className="faq-question">
          <span className="faq-question-text">{question}</span>
          <span className="faq-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </summary>
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

  // Get visible features for static rendering
  const visibleFeatures =
    homeConfig?.features?.items?.filter(
      (feature) => feature.visible !== false
    ) || [];
  const hasMultipleFeatures = visibleFeatures.length > 2;

  // Helper function to safely render text content
  const safeText = (text) => {
    if (typeof text === "string") return text;
    if (typeof text === "object" && text !== null) {
      // Handle objects with long/short properties
      if (text.long) return text.long;
      if (text.short) return text.short;
      // Fallback to first string value found
      const values = Object.values(text);
      const firstString = values.find((v) => typeof v === "string");
      return firstString || "Content";
    }
    return "Content";
  };

  return (
    <div
      className="urban-font"
      style={{
        "--primary-color": palette.primary,
        "--accent-color": palette.accent || palette.secondary,
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
                className="inline-flex px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-light mb-6 sm:mb-8 lg:mb-12 items-center"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-white mr-1 sm:mr-1.5 lg:mr-2"></div>
                {safeText(homeConfig.hero.badge.text)}
              </div>
            ) : (
              <div
                className="inline-flex px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm font-light mb-6 sm:mb-8 lg:mb-12 items-center"
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
                className="text-4xl sm:text-5xl lg:text-4xl mb-8 sm:mb-10 urban-hero-headline !text-4xl sm:!text-5xl lg:!text-6xl"
                style={{
                  color: "#1f2937",
                  fontWeight: homeConfig.hero.title.fontWeight || 400,
                  letterSpacing:
                    homeConfig.hero.title.letterSpacing || "-0.025em",
                }}
              >
                {safeText(homeConfig.hero.title.text)}
              </h1>
            ) : (
              <h1
                className="text-4xl sm:text-5xl lg:text-4xl mb-8 sm:mb-10 urban-hero-headline !text-4xl sm:!text-5xl lg:!text-6xl"
                style={{
                  color: "#1f2937",
                  fontWeight: homeConfig.hero.title.fontWeight || 400,
                  letterSpacing:
                    homeConfig.hero.title.letterSpacing || "-0.025em",
                }}
              >
                Professional {businessType}
              </h1>
            )}

            {/* Description */}
            {homeConfig?.hero?.description?.visible ? (
              <p
                className="text-base sm:text-lg mb-12 sm:mb-16 urban-hero-description"
                style={{
                  color: "#1f2937",
                  fontWeight: 300,
                }}
              >
                {safeText(homeConfig.hero.description.text)}
              </p>
            ) : (
              <p
                className="text-base sm:text-lg mb-12 sm:mb-16 urban-hero-description"
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
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start">
                {homeConfig.hero.buttons
                  .filter((button) => button.visible)
                  .sort((a, b) => a.rank - b.rank)
                  .map((button, index) => (
                    <a
                      key={index}
                      href={button.url || "#"}
                      className={`px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button flex items-center gap-2 cursor-pointer ${
                        button.style === "primary"
                          ? "urban-button-primary"
                          : "urban-button-secondary"
                      }`}
                    >
                      {safeText(button.label)}
                      {button.style === "primary" && (
                        <span className="text-sm sm:text-base lg:text-lg">
                          →
                        </span>
                      )}
                    </a>
                  ))}
              </div>
            ) : (
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start">
                <a
                  href="/get-started"
                  className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-primary flex items-center gap-2 cursor-pointer"
                >
                  Get Started
                  <span className="text-sm sm:text-base lg:text-lg">→</span>
                </a>
                <a
                  href="/learn-more"
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
          className="w-full lg:w-1/2 flex items-center justify-center overflow-hidden px-8 lg:px-0 lg:pr-8 lg:pb-20 pb-8"
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
          className="py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-16"
          style={{ backgroundColor: palette.neutral }}
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge above paragraph */}
            <div className="mb-6 sm:mb-8">
              <div
                className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                style={{
                  backgroundColor: palette.primary,
                  color: "white",
                }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mr-1.5 sm:mr-2"></div>
                {safeText(homeConfig.stats.badge?.text) || "ABOUT US"}
              </div>
            </div>

            {/* Large Centered Paragraph */}
            <div className="mb-16 sm:mb-20 lg:mb-24">
              <p
                className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-center tracking-tight"
                style={{ color: "#1f2937" }}
              >
                {safeText(homeConfig.stats.description?.text) ||
                  "We bring your vision to life with precision and quality. Our commitment to innovation and client satisfaction ensures every project exceeds expectations."}
              </p>
            </div>

            {/* Three Stat Columns */}
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {homeConfig.stats.metrics &&
                homeConfig.stats.metrics.length > 0 &&
                homeConfig.stats.metrics
                  .filter((metric) => metric.visible !== false)
                  .sort((a, b) => a.rank - b.rank)
                  .slice(0, 3)
                  .map((metric, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-3 sm:mb-4"
                        style={{ color: "#1f2937" }}
                      >
                        {safeText(metric.value)}
                      </div>
                      <div
                        className="text-base sm:text-lg font-medium"
                        style={{ color: "#6b7280" }}
                      >
                        {safeText(metric.label)}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {homeConfig?.services?.visible &&
        websiteData?.services &&
        websiteData.services.length > 0 && (
          <section
            className="py-20 px-8 lg:px-16"
            style={{ backgroundColor: palette.primary }}
          >
            <div className="max-w-7xl mx-auto">
              {homeConfig.services.title?.visible && (
                <h2
                  className="text-4xl lg:text-5xl mb-16 text-center urban-hero-headline"
                  style={{
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {safeText(homeConfig.services.title.text) || "Our Services"}
                </h2>
              )}
              <div className="services-grid">
                {websiteData.services
                  .filter((service) => service.status === "active")
                  .slice(0, 4)
                  .map((service, index) => (
                    <div
                      key={service.id}
                      className="service-card"
                      style={{
                        transition: "all 0.2s ease",
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
                          {safeText(service.name)}
                        </h3>
                        <div className="service-circle-button">→</div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* View All Button */}
              {websiteData.services &&
                websiteData.services.filter(
                  (service) => service.status === "active"
                ).length > 4 && (
                  <div className="text-center mt-16">
                    <a
                      href="/services"
                      className="inline-flex items-center px-8 py-4 rounded-full text-base font-medium urban-button"
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

      {/* Features Section - Static rendering for first 2 features */}
      {homeConfig?.features?.visible && visibleFeatures.length > 0 && (
        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="features-header">
              <div className="features-header-left">
                <h2 className="features-title">
                  {safeText(homeConfig.features.title?.text) ||
                    "Building excellence through every feature we deliver"}
                </h2>
              </div>
              {/* Navigation removed for SSR - features are static */}
            </div>

            <div className="features-showcase">
              {visibleFeatures.slice(0, 2).map((feature, index) => (
                <div
                  key={feature.id || index}
                  className={`feature-showcase-card ${
                    index === 0
                      ? "feature-showcase-primary"
                      : "feature-showcase-secondary"
                  }`}
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
                      {safeText(feature.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-12" style={{ backgroundColor: palette.neutral }}>
        {homeConfig?.howItWorks?.visible && (
          <div className="how-it-works-hero">
            <div className="how-it-works-left">
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

            <div className="how-it-works-right">
              <div className="how-it-works-content">
                {homeConfig.howItWorks.badge?.visible && (
                  <div className="content-badge">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    {safeText(homeConfig.howItWorks.badge.text)}
                  </div>
                )}

                {homeConfig.howItWorks.title?.visible && (
                  <h2 className="content-title">
                    {safeText(homeConfig.howItWorks.title.text)}
                  </h2>
                )}

                {homeConfig.howItWorks.description?.visible && (
                  <p
                    className="content-description"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    {safeText(homeConfig.howItWorks.description.text)}
                  </p>
                )}

                <div
                  className="how-it-works-steps"
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
                          className="step-card"
                          style={{ padding: "1rem" }}
                        >
                          <div className="step-number">{step.number}</div>
                          <div className="step-content">
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">
                              {safeText(step.description)}
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
        <section className="py-20" style={{ backgroundColor: "white" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              {websiteData.faq.badge?.visible && (
                <div className="mb-6 sm:mb-8">
                  <div
                    className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                    style={{
                      backgroundColor: palette.primary,
                      color: "white",
                    }}
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mr-1.5 sm:mr-2"></div>
                    {safeText(websiteData.faq.badge.text)}
                  </div>
                </div>
              )}
              {websiteData.faq.title?.visible && (
                <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
                  {safeText(websiteData.faq.title.text)}
                </h2>
              )}
            </div>

            {/* FAQ Grid */}
            <div className="space-y-4">
              {websiteData.faq.items &&
                websiteData.faq.items
                  .filter((item) => item.visible !== false)
                  .map((item, index) => (
                    <div key={index} className="faq-card">
                      <FAQCard question={item.question} answer={item.answer} />
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {websiteData?.cta?.visible && (
        <section className="py-20" style={{ backgroundColor: palette.neutral }}>
          <div className="max-w-8xl mx-auto text-center px-6 sm:px-8 lg:px-16">
            {websiteData.cta.badge?.visible && (
              <div className="mb-6 sm:mb-8">
                <div
                  className="inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-light items-center"
                  style={{
                    backgroundColor: palette.primary,
                    color: "white",
                  }}
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mr-1.5 sm:mr-2"></div>
                  {safeText(websiteData.cta.badge.text)}
                </div>
              </div>
            )}

            {websiteData.cta.title?.visible && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1f2937] mb-8 max-w-3xl mx-auto tracking-tight">
                {safeText(websiteData.cta.title.text)}
              </h2>
            )}

            {websiteData.cta.description?.visible && (
              <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-tight text-center tracking-tight text-[#6b7280] mb-12 max-w-4xl mx-auto">
                {safeText(websiteData.cta.description.text)}
              </p>
            )}

            {websiteData.cta.button?.visible && (
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 justify-center">
                <a
                  href={websiteData.cta.button.url}
                  className="px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-sm lg:text-base font-medium urban-button urban-button-primary flex items-center gap-2 cursor-pointer"
                >
                  {safeText(websiteData.cta.button.text)}
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
