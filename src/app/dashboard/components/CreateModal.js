"use client";

import {
  X,
  Calendar,
  Users,
  Settings,
  UserPlus,
  FileText,
  Receipt,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";

export default function CreateModal({ onClose }) {
  // Close modal when pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const createOptions = [
    {
      id: "booking",
      title: "Add Booking",
      description: "Schedule a new appointment or service booking",
      icon: Calendar,
    },
    {
      id: "client",
      title: "Add Client",
      description: "Create a new client profile and contact information",
      icon: Users,
    },
    {
      id: "service",
      title: "Add Service",
      description: "Create a new service offering with pricing",
      icon: Settings,
    },
    {
      id: "team",
      title: "Add Team Member",
      description: "Invite and onboard a new team member",
      icon: UserPlus,
    },
    {
      id: "quote",
      title: "New Quote",
      description: "Create a professional quote for potential clients",
      icon: FileText,
    },
    {
      id: "invoice",
      title: "New Invoice",
      description: "Generate and send invoices to clients",
      icon: Receipt,
    },
  ];

  const handleOptionClick = (optionId) => {
    // Handle different create options
    console.log(`Creating: ${optionId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-medium text-[#191C27]">Create New</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#848D6F] hover:text-[#191C27] hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {createOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group hover:border-[#FF5E00]/30 hover:bg-gray-50/50 relative"
                >
                  {/* Arrow Button */}
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[#191C27] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon className="h-4 w-4 text-[#191C27] flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#191C27] text-sm mb-1 group-hover:text-[#FF5E00] transition-colors">
                        {option.title}
                      </h3>
                      <p className="text-xs text-[#848D6F] leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
