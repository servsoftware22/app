"use client";

import UrbanPage from "../../Urban/page";
import { useEffect, useState } from "react";

export default function HomePage({ params }) {
  const [websiteData, setWebsiteData] = useState(null);

  useEffect(() => {
    // Extract website data from the data-website attribute set by the layout
    const websiteElement = document.querySelector("[data-website]");
    if (websiteElement) {
      try {
        const data = JSON.parse(websiteElement.getAttribute("data-website"));
        setWebsiteData(data);
      } catch (error) {
        console.error("Error parsing website data:", error);
      }
    }
  }, []);

  // Show loading state while data is being extracted
  if (!websiteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <UrbanPage websiteData={websiteData} />;
}
