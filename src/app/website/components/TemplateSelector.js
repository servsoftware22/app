"use client";

import { useState } from "react";

export default function TemplateSelector({
  currentTemplate,
  onTemplateChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "Urban",
      name: "Urban Template",
      description: "Modern, clean design for urban businesses",
      available: true,
    },
    {
      id: "Luxury",
      name: "Luxury Template",
      description:
        "Premium, sophisticated design for luxury services (Coming Soon)",
      available: false,
    },
    {
      id: "Industrial",
      name: "Industrial Template",
      description:
        "Robust, professional design for industrial services (Coming Soon)",
      available: false,
    },
  ];

  const currentTemplateData = templates.find((t) => t.id === currentTemplate);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
      >
        <span>{currentTemplateData?.name || "Select Template"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  if (template.available) {
                    onTemplateChange(template.id);
                    setIsOpen(false);
                  }
                }}
                disabled={!template.available}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  currentTemplate === template.id
                    ? "bg-blue-50 text-blue-700"
                    : template.available
                    ? "hover:bg-gray-50 text-gray-700"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                <div className="font-medium">{template.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
