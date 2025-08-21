import "../../urban.css";
import "../../urban-animations.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function UrbanServicesPage({ websiteData }) {
  if (!websiteData) {
    return <div>Loading...</div>;
  }

  const { business_info = {}, palette } = websiteData;
  const businessName = business_info?.name || "Business";
  const businessType = business_info?.type || "Services";
  const domain = websiteData?.domain?.subdomain || "fieldsite";
  const headerConfig = websiteData?.header;
  const services = websiteData?.services || [];

  // Get unique categories from services
  const categories = [
    "All",
    ...new Set(services.map((service) => service.category)),
  ];

  // Filter active services
  const activeServices = services.filter(
    (service) => service.status === "active"
  );

  // Helper function to safely render text content
  const safeText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      // Handle objects with long/short properties
      if (text.long) return text.long;
      if (text.short) return text.short;
      // Fallback to first string value found
      const values = Object.values(text);
      const firstString = values.find(v => typeof v === 'string');
      return firstString || 'Content';
    }
    return 'Content';
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
      <section
        className="py-20 px-8 lg:px-16"
        style={{ backgroundColor: palette.primary }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl lg:text-5xl mb-16 text-center urban-hero-headline"
            style={{ color: "white", letterSpacing: "-0.02em" }}
          >
            Our Services
          </h2>

          {/* Category Filter - Static for SSR */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <span
                key={category}
                className="px-6 py-3 rounded-full text-base font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    category === "All" ? "white" : "rgba(255,255,255,0.1)",
                  color: category === "All" ? palette.primary : "white",
                }}
              >
                {safeText(category)}
              </span>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {activeServices.slice(0, 8).map((service, index) => (
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
                      alt={safeText(service.name)}
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
                    {safeText(service.name)}
                  </h3>
                  {service.description && (
                    <p className="service-description text-gray-600 mt-2">
                      {safeText(service.description)}
                    </p>
                  )}
                  <div className="service-circle-button">→</div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button if more than 8 services */}
          {activeServices.length > 8 && (
            <div className="text-center mt-16">
              <a
                href="#"
                className="inline-flex items-center px-8 py-4 rounded-full text-base font-medium urban-button"
                style={{ backgroundColor: "white", color: palette.primary }}
              >
                <span className="button-text">Load More Services</span>
                <span className="ml-2 button-arrow">→</span>
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer
        palette={palette}
        businessName={businessName}
        websiteData={websiteData}
      />
    </div>
  );
}
