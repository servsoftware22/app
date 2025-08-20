import React from "react";

export default async function MarketingLayoutClient({ children, websiteData }) {
  // Dynamically import Header and Footer components on the server
  const template = websiteData.template?.name || "Urban";
  const HeaderComponent = (await import(`../../${template}/components/Header`))
    .default;
  const FooterComponent = (await import(`../../${template}/components/Footer`))
    .default;

  const { business_info = {}, palette } = websiteData;
  const businessName = business_info?.name || "Business";
  const businessType = business_info?.type || "Services";
  const domain = websiteData?.domain?.subdomain || "fieldsite";
  const headerConfig = websiteData?.header;

  return (
    <>
      <HeaderComponent
        key={`header-${websiteData.id}-${
          websiteData.template?.name || "urban"
        }`}
        businessName={businessName}
        businessType={businessType}
        domain={domain}
        palette={palette}
        headerConfig={headerConfig}
      />

      <main>{children}</main>

      <FooterComponent
        key={`footer-${websiteData.id}-${
          websiteData.template?.name || "urban"
        }`}
        palette={palette}
        businessName={businessName}
        websiteData={websiteData}
      />
    </>
  );
}
