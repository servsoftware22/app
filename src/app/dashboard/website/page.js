"use client";

import {
  Globe,
  Edit,
  Settings,
  Eye,
  TrendingUp,
  Info,
  Calendar,
  CreditCard,
  Users,
  Link,
  Activity,
  BookOpen,
  Zap,
  History,
  ExternalLink,
  Image,
  Star,
  MessageSquare,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function WebsitePage() {
  const [tooltips, setTooltips] = useState({
    actions: false,
    analytics: false,
    info: false,
    services: false,
  });

  const tooltipRefs = {
    actions: useRef(null),
    analytics: useRef(null),
    info: useRef(null),
    services: useRef(null),
  };

  const toggleTooltip = (section) => {
    setTooltips((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Close tooltips when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(tooltipRefs).forEach((section) => {
        const ref = tooltipRefs[section];
        if (ref.current && !ref.current.contains(event.target)) {
          setTooltips((prev) => ({
            ...prev,
            [section]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock data for website analytics
  const websiteAnalytics = {
    pageViews: {
      value: "12,847",
      change: "+15%",
      trend: "up",
      period: "This month",
    },
    uniqueVisitors: {
      value: "3,421",
      change: "+8%",
      trend: "up",
      period: "This month",
    },
    conversionRate: {
      value: "4.2%",
      change: "+12%",
      trend: "up",
      period: "This month",
    },
    avgSessionTime: {
      value: "2m 34s",
      change: "+5%",
      trend: "up",
      period: "This month",
    },
  };

  // Mock website info
  const websiteInfo = {
    domain: "servicepro.com",
    status: "Live",
    lastUpdated: "2 days ago",
    theme: "Professional Blue",
    pages: 8,
    services: 12,
  };

  // Mock services data
  const services = [
    {
      id: 1,
      name: "HVAC Maintenance",
      price: "$150",
      duration: "2 hours",
      status: "active",
      bookings: 23,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Plumbing Repair",
      price: "$200",
      duration: "1.5 hours",
      status: "active",
      bookings: 18,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Electrical Installation",
      price: "$300",
      duration: "3 hours",
      status: "active",
      bookings: 12,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Emergency Service",
      price: "$250",
      duration: "1 hour",
      status: "active",
      bookings: 8,
      rating: 4.6,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Website Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Website Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.analytics}>
            <button
              onClick={() => toggleTooltip("analytics")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.analytics && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Website Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track your website performance and visitor engagement
                    metrics.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Page Views
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {websiteAnalytics.pageViews.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {websiteAnalytics.pageViews.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {websiteAnalytics.pageViews.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Unique Visitors
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {websiteAnalytics.uniqueVisitors.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {websiteAnalytics.uniqueVisitors.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {websiteAnalytics.uniqueVisitors.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Conversion Rate
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {websiteAnalytics.conversionRate.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {websiteAnalytics.conversionRate.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {websiteAnalytics.conversionRate.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Avg Session Time
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {websiteAnalytics.avgSessionTime.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {websiteAnalytics.avgSessionTime.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {websiteAnalytics.avgSessionTime.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Actions Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Website Actions
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.actions}>
            <button
              onClick={() => toggleTooltip("actions")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.actions && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Globe className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Website Actions
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Quick actions to manage your website content, design, and
                    settings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Edit className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#191C27] text-base">
                      Edit Content
                    </h3>
                    <ArrowRight className="h-4 w-4 text-[#848D6F]" />
                  </div>
                  <p className="text-sm text-[#848D6F] mb-4 leading-relaxed">
                    Update your website content, pages, and information.
                  </p>
                  <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Edit Content
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#191C27] text-base">
                      Customize Design
                    </h3>
                    <ArrowRight className="h-4 w-4 text-[#848D6F]" />
                  </div>
                  <p className="text-sm text-[#848D6F] mb-4 leading-relaxed">
                    Change colors, fonts, and layout of your website.
                  </p>
                  <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Customize
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#191C27] text-base">
                      View Website
                    </h3>
                    <ArrowRight className="h-4 w-4 text-[#848D6F]" />
                  </div>
                  <p className="text-sm text-[#848D6F] mb-4 leading-relaxed">
                    Preview your website as visitors see it.
                  </p>
                  <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    View Site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Info Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Info className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Website Info</h2>
          </div>
          <div className="relative" ref={tooltipRefs.info}>
            <button
              onClick={() => toggleTooltip("info")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.info && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Info className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Website Info
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    View your website domain, status, and basic configuration
                    details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Website Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#191C27] text-lg mb-4">
                Website Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#848D6F]">Domain</span>
                  <span className="text-sm font-medium text-[#191C27]">
                    {websiteInfo.domain}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#848D6F]">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {websiteInfo.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#848D6F]">Last Updated</span>
                  <span className="text-sm font-medium text-[#191C27]">
                    {websiteInfo.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#848D6F]">Theme</span>
                  <span className="text-sm font-medium text-[#191C27]">
                    {websiteInfo.theme}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#848D6F]">Pages</span>
                  <span className="text-sm font-medium text-[#191C27]">
                    {websiteInfo.pages}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#848D6F]">Services</span>
                  <span className="text-sm font-medium text-[#191C27]">
                    {websiteInfo.services}
                  </span>
                </div>
              </div>
            </div>

            {/* Website Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-[#191C27] text-lg mb-4">
                Website Preview
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-[#848D6F]">
                    {websiteInfo.domain}
                  </span>
                </div>
                <div className="bg-gray-100 rounded h-32 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-8 w-8 text-[#848D6F] mx-auto mb-2" />
                    <p className="text-xs text-[#848D6F]">Website Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Services</h2>
          </div>
          <div className="relative" ref={tooltipRefs.services}>
            <button
              onClick={() => toggleTooltip("services")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.services && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Services
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Manage your service offerings, pricing, and availability on
                    your website.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#191C27] text-lg">
              Your Services
            </h3>
            <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Service</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[#FF5E00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#191C27] text-base">
                        {service.name}
                      </h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {service.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">Price</span>
                        <span className="text-sm font-medium text-[#191C27]">
                          {service.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">Duration</span>
                        <span className="text-sm font-medium text-[#191C27]">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">Bookings</span>
                        <span className="text-sm font-medium text-[#191C27]">
                          {service.bookings}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-[#FF5E00] fill-current" />
                          <span className="text-sm font-medium text-[#191C27]">
                            {service.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="text-[#FF5E00] hover:text-[#FF4A00] text-sm font-medium transition-colors">
                        Edit
                      </button>
                      <button className="text-[#848D6F] hover:text-[#191C27] text-sm font-medium transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
