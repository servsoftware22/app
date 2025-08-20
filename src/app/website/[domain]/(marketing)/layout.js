import { createServerClient } from "@/lib/supabase";
import { Suspense } from "react";
import UrbanHeader from "../../Urban/components/Header";
import UrbanFooter from "../../Urban/components/Footer";

// Template component mapping - add more templates here as needed
const templateComponents = {
  Urban: {
    Header: UrbanHeader,
    Footer: UrbanFooter,
  },
  // Add other templates here when you have them
  // Luxury: {
  //   Header: LuxuryHeader,
  //   Footer: LuxuryFooter,
  // },
  // Industrial: {
  //   Header: IndustrialHeader,
  //   Footer: IndustrialFooter,
  // },
};

export default async function MarketingLayout({ children, params }) {
  const { domain } = await params;

  // Fetch website data server-side
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, template, home")
    .eq("domain->>subdomain", domain)
    .single();

  if (error || !website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Website Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            No website found for subdomain: {domain}
          </p>
        </div>
      </div>
    );
  }

  // Get template components safely
  const template = website.template?.name || "Urban";
  const templateConfig =
    templateComponents[template] || templateComponents.Urban;

  const HeaderComponent = templateConfig.Header;
  const FooterComponent = templateConfig.Footer;

  const { business_info = {}, palette } = website;
  const businessName = business_info?.name || "Business";
  const businessType = business_info?.type || "Services";
  const headerConfig = website?.header;

  return (
    <>
      <HeaderComponent
        key={`header-${website.id}-${template}`}
        businessName={businessName}
        businessType={businessType}
        domain={domain}
        palette={palette}
        headerConfig={headerConfig}
      />

      <main>{children}</main>

      <FooterComponent
        key={`footer-${website.id}-${template}`}
        palette={palette}
        businessName={businessName}
        websiteData={website}
      />
    </>
  );
}
