"use client";

import { useState } from "react";
import {
  Settings,
  Toggle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Zap,
  Shield,
  MessageSquare,
  Calendar,
  CreditCard,
  Users,
  Star,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function WebsiteFeaturesPage() {
  const [activeTab, setActiveTab] = useState("enabled");

  const tabs = [
    { id: "enabled", name: "Enabled", count: 8 },
    { id: "available", name: "Available", count: 12 },
    { id: "premium", name: "Premium", count: 5 },
  ];

  const enabledFeatures = [
    {
      id: "contact-form",
      name: "Contact Form",
      description: "Allow visitors to send you messages",
      icon: MessageSquare,
      status: "enabled",
      category: "Communication",
    },
    {
      id: "booking-system",
      name: "Online Booking",
      description: "Let clients schedule appointments",
      icon: Calendar,
      status: "enabled",
      category: "Scheduling",
    },
    {
      id: "payment-processing",
      name: "Payment Processing",
      description: "Accept online payments",
      icon: CreditCard,
      status: "enabled",
      category: "Payments",
    },
    {
      id: "client-portal",
      name: "Client Portal",
      description: "Secure area for client access",
      icon: Users,
      status: "enabled",
      category: "Access",
    },
    {
      id: "reviews",
      name: "Review System",
      description: "Collect and display customer reviews",
      icon: Star,
      status: "enabled",
      category: "Social Proof",
    },
    {
      id: "seo-tools",
      name: "SEO Tools",
      description: "Optimize your site for search engines",
      icon: Globe,
      status: "enabled",
      category: "Marketing",
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Track website performance and visitors",
      icon: Eye,
      status: "enabled",
      category: "Analytics",
    },
    {
      id: "security",
      name: "Security Features",
      description: "SSL certificate and security measures",
      icon: Shield,
      status: "enabled",
      category: "Security",
    },
  ];

  const availableFeatures = [
    {
      id: "live-chat",
      name: "Live Chat",
      description: "Real-time customer support",
      icon: MessageSquare,
      status: "available",
      category: "Communication",
    },
    {
      id: "email-marketing",
      name: "Email Marketing",
      description: "Send newsletters and campaigns",
      icon: Zap,
      status: "available",
      category: "Marketing",
    },
    {
      id: "social-media",
      name: "Social Media Integration",
      description: "Connect your social media accounts",
      icon: Globe,
      status: "available",
      category: "Marketing",
    },
    {
      id: "multi-language",
      name: "Multi-language Support",
      description: "Support multiple languages",
      icon: Globe,
      status: "available",
      category: "Localization",
    },
  ];

  const premiumFeatures = [
    {
      id: "advanced-analytics",
      name: "Advanced Analytics",
      description: "Detailed insights and reporting",
      icon: Eye,
      status: "premium",
      category: "Analytics",
      price: "$29/month",
    },
    {
      id: "custom-domain",
      name: "Custom Domain",
      description: "Use your own domain name",
      icon: Globe,
      status: "premium",
      category: "Branding",
      price: "$12/month",
    },
    {
      id: "priority-support",
      name: "Priority Support",
      description: "24/7 customer support",
      icon: MessageSquare,
      status: "premium",
      category: "Support",
      price: "$19/month",
    },
    {
      id: "advanced-security",
      name: "Advanced Security",
      description: "Enhanced security features",
      icon: Shield,
      status: "premium",
      category: "Security",
      price: "$15/month",
    },
    {
      id: "white-label",
      name: "White Label",
      description: "Remove ServicePro branding",
      icon: Settings,
      status: "premium",
      category: "Branding",
      price: "$49/month",
    },
  ];

  const toggleFeature = (featureId) => {
    console.log(`Toggling feature: ${featureId}`);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#FF5E00] border-b-2 border-[#FF5E00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "enabled" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enabledFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-[#FF5E00]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-[#191C27] text-base">
                              {feature.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleFeature(feature.id)}
                                className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#FF5E00] transition-colors"
                              >
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-[#848D6F] mb-2">
                            {feature.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#848D6F] bg-gray-100 px-2 py-1 rounded-full">
                              {feature.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                                <Edit className="h-3 w-3" />
                              </button>
                              <button className="p-1 text-[#848D6F] hover:text-red-600 transition-colors">
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "available" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-[#848D6F]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-[#191C27] text-base">
                              {feature.name}
                            </h3>
                            <button className="px-3 py-1 bg-[#FF5E00] text-white text-xs rounded-md hover:bg-[#FF4A00] transition-colors">
                              Enable
                            </button>
                          </div>
                          <p className="text-sm text-[#848D6F] mb-2">
                            {feature.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#848D6F] bg-gray-100 px-2 py-1 rounded-full">
                              {feature.category}
                            </span>
                            <ArrowRight className="h-4 w-4 text-[#848D6F]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "premium" && (
            <div className="space-y-4">
              <div className="bg-[#FF5E00]/5 border border-[#FF5E00]/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-[#FF5E00]" />
                  <div>
                    <h3 className="font-medium text-[#191C27]">
                      Premium Features
                    </h3>
                    <p className="text-sm text-[#848D6F]">
                      Upgrade to access advanced features and priority support
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {premiumFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all border border-[#FF5E00]/20"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-[#FF5E00]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-[#191C27] text-base">
                              {feature.name}
                            </h3>
                            <span className="text-xs bg-[#FF5E00]/10 text-[#FF5E00] px-2 py-1 rounded-full font-medium">
                              Premium
                            </span>
                          </div>
                          <p className="text-sm text-[#848D6F] mb-2">
                            {feature.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#848D6F] bg-gray-100 px-2 py-1 rounded-full">
                              {feature.category}
                            </span>
                            <span className="text-sm font-medium text-[#FF5E00]">
                              {feature.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
