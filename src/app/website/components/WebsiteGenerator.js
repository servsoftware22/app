"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TemplateSelector from "./TemplateSelector";
import UrbanTemplate from "../Urban/(marketing)/home/page";

export default function WebsiteGenerator({ websiteData }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Determine template based on website data
    // For now, we'll use a default template, but this could be based on user preference
    const template = websiteData.template || "Urban";
    setSelectedTemplate(template);

    // Set template data with website information
    setTemplateData({
      ...websiteData,
      template,
      // Add any additional template-specific data here
    });
  }, [websiteData]);

  const renderTemplate = () => {
    if (!selectedTemplate || !templateData) {
      return <div>Loading template...</div>;
    }

    // For now, only Urban template is available
    // Other templates will be added as they're developed
    switch (selectedTemplate) {
      case "Urban":
        return <UrbanTemplate websiteData={templateData} />;
      case "Luxury":
      case "Industrial":
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Template Coming Soon
              </h2>
              <p className="text-gray-600 mb-4">
                The {selectedTemplate} template is currently under development.
              </p>
              <button
                onClick={() => setSelectedTemplate("Urban")}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Use Urban Template Instead
              </button>
            </div>
          </div>
        );
      default:
        return <UrbanTemplate websiteData={templateData} />;
    }
  };

  const handleTemplateChange = (newTemplate) => {
    setSelectedTemplate(newTemplate);
    setTemplateData((prev) => ({
      ...prev,
      template: newTemplate,
    }));
  };

  if (!templateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="website-generator">
      {/* Template Selector - Only show in development or for admins */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
          <TemplateSelector
            currentTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
          />
        </div>
      )}

      {/* Render the selected template */}
      {renderTemplate()}
    </div>
  );
}
