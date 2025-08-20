"use client";
import { useEffect, useState } from "react";
import UrbanDashboardPage from "../../../Urban/components/DashboardPage";

export default function DashboardPage() {
  const [websiteData, setWebsiteData] = useState(null);

  useEffect(() => {
    // Get website data from the layout's data attribute
    const websiteElement = document.querySelector("[data-website]");
    if (websiteElement) {
      const data = websiteElement.getAttribute("data-website");
      if (data) {
        setWebsiteData(JSON.parse(data));
      }
    }
  }, []);

  if (!websiteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  // Render template-specific dashboard page
  const template = websiteData.template || "Urban";

  if (template === "Urban") {
    return <UrbanDashboardPage websiteData={websiteData} />;
  }

  // TODO: Add other templates when they're implemented
  // if (template === "Industrial") {
  //   return <IndustrialDashboardPage websiteData={websiteData} />;
  // }
  // if (template === "Luxury") {
  //   return <LuxuryDashboardPage websiteData={websiteData} />;
  // }

  // Fallback to Urban template
  return <UrbanDashboardPage websiteData={websiteData} />;
}
