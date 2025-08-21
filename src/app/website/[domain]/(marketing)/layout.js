import { createServerClient } from "@/lib/supabase";
import { Suspense } from "react";

export default async function MarketingLayout({ children, params }) {
  const { domain } = await params;

  // Fetch website data server-side for Header/Footer
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

  // Dynamically import Header and Footer components on the server
  const template = website.template?.name || "Urban";
  const HeaderComponent = (await import(`../../${template}/components/Header`))
    .default;
  const FooterComponent = (await import(`../../${template}/components/Footer`))
    .default;

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
