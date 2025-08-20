import Header from "./components/Header";
import Footer from "./components/Footer";
import "./urban.css";
import "./urban-animations.css";
import UrbanPageClient from "./UrbanPageClient";

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

      <UrbanPageClient
        websiteData={websiteData}
        businessName={businessName}
        businessType={businessType}
        domain={domain}
        headerConfig={headerConfig}
        homeConfig={homeConfig}
        palette={palette}
      />

      <Footer
        palette={palette}
        businessName={businessName}
        websiteData={websiteData}
      />
    </div>
  );
}
