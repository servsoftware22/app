"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Users,
  Calendar,
  Star,
  Activity,
  Globe,
  CreditCard,
  FileText,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Info,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Zap,
  Settings,
  ChevronDown,
  ChevronUp,
  Infinity,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [expandedSections, setExpandedSections] = useState({
    payments: false,
    website: false,
    services: false,
    customers: false,
  });

  const [tooltips, setTooltips] = useState({
    overview: false,
    payments: false,
    website: false,
    services: false,
    customers: false,
  });

  const tooltipRefs = {
    overview: useRef(null),
    payments: useRef(null),
    website: useRef(null),
    services: useRef(null),
    customers: useRef(null),
  };

  const toggleTooltip = (section) => {
    setTooltips((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
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

  // Mock analytics data
  const overviewMetrics = {
    totalRevenue: {
      value: "$45,230",
      change: "+12.5%",
      trend: "up",
      period: "vs last month",
    },
    totalBookings: {
      value: "156",
      change: "+8.2%",
      trend: "up",
      period: "vs last month",
    },
    averageRating: {
      value: "4.8",
      change: "+0.3",
      trend: "up",
      period: "vs last month",
    },
    customerSatisfaction: {
      value: "96%",
      change: "+2.1%",
      trend: "up",
      period: "vs last month",
    },
  };

  const paymentAnalytics = {
    totalPayments: "$45,230",
    thisMonth: "$12,450",
    averagePayment: "$290",
    paymentMethods: [
      { method: "Credit Card", percentage: 65, amount: "$29,400" },
      { method: "PayPal", percentage: 20, amount: "$9,046" },
      { method: "Bank Transfer", percentage: 15, amount: "$6,784" },
    ],
    monthlyTrends: [
      { month: "Jan", amount: 8500 },
      { month: "Feb", amount: 9200 },
      { month: "Mar", amount: 10800 },
      { month: "Apr", amount: 12450 },
    ],
  };

  const websiteAnalytics = {
    totalVisits: "12,847",
    uniqueVisitors: "8,234",
    pageViews: "34,521",
    bounceRate: "32%",
    averageSession: "4m 23s",
    topPages: [
      { page: "Home", views: 8540, conversion: "12.3%" },
      { page: "Services", views: 6230, conversion: "8.7%" },
      { page: "About", views: 4120, conversion: "5.2%" },
      { page: "Contact", views: 2980, conversion: "15.8%" },
    ],
    trafficSources: [
      { source: "Organic Search", percentage: 45, visits: 5780 },
      { source: "Direct", percentage: 30, visits: 3854 },
      { source: "Social Media", percentage: 15, visits: 1927 },
      { source: "Referral", percentage: 10, visits: 1285 },
    ],
  };

  const serviceAnalytics = {
    totalServices: 12,
    activeServices: 10,
    averageRating: 4.8,
    topServices: [
      {
        name: "HVAC Maintenance",
        bookings: 45,
        revenue: "$6,750",
        rating: 4.9,
      },
      { name: "Plumbing Repair", bookings: 38, revenue: "$5,700", rating: 4.8 },
      { name: "Electrical Work", bookings: 32, revenue: "$4,800", rating: 4.7 },
      {
        name: "Emergency Services",
        bookings: 28,
        revenue: "$4,200",
        rating: 4.6,
      },
    ],
    serviceCategories: [
      { category: "Maintenance", bookings: 65, revenue: "$9,750" },
      { category: "Repair", bookings: 45, revenue: "$6,750" },
      { category: "Installation", bookings: 25, revenue: "$3,750" },
      { category: "Emergency", bookings: 21, revenue: "$3,150" },
    ],
  };

  const customerAnalytics = {
    totalCustomers: 234,
    newCustomers: 45,
    repeatCustomers: 189,
    averageLifetime: "$1,250",
    customerSegments: [
      { segment: "Residential", customers: 156, revenue: "$19,500" },
      { segment: "Commercial", customers: 78, revenue: "$25,730" },
    ],
    customerRetention: 89,
    averageOrderValue: "$290",
    customerSatisfaction: 96,
  };

  const periodOptions = [
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "90d", label: "90D" },
    { value: "1y", label: "1Y" },
    { value: "all", label: "∞" },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Overview Analytics
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            {/* Period Switches */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPeriod(option.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedPeriod === option.value
                      ? "bg-white text-[#191C27] shadow-sm"
                      : "text-[#848D6F] hover:text-[#191C27]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
              <Download className="h-4 w-4" />
            </button>
            <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Revenue
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {overviewMetrics.totalRevenue.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {overviewMetrics.totalRevenue.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {overviewMetrics.totalRevenue.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Bookings
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {overviewMetrics.totalBookings.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {overviewMetrics.totalBookings.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {overviewMetrics.totalBookings.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Average Rating
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {overviewMetrics.averageRating.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {overviewMetrics.averageRating.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {overviewMetrics.averageRating.period}
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
                    Customer Satisfaction
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {overviewMetrics.customerSatisfaction.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {overviewMetrics.customerSatisfaction.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {overviewMetrics.customerSatisfaction.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trends Chart */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <LineChart className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Revenue Trends
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-16 w-16 text-[#848D6F] mx-auto mb-4" />
              <p className="text-[#848D6F] text-sm">
                Revenue trends chart will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Payment Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.payments}>
            <button
              onClick={() => toggleTooltip("payments")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.payments && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Payment Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track payment performance, methods, and trends to optimize
                    your revenue collection and payment processing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Payment Methods
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Payment methods pie chart
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Trends Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Payment Trends
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Payment trends bar chart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Website Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.website}>
            <button
              onClick={() => toggleTooltip("website")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.website && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Globe className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Website Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Monitor website performance, traffic sources, and user
                    behavior to optimize your online presence and conversion
                    rates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Sources Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Traffic Sources
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Traffic sources pie chart
                  </p>
                </div>
              </div>
            </div>

            {/* Page Performance Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Page Performance
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Page performance bar chart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Service Analytics
            </h2>
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
                    <Settings className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Service Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Analyze service performance, popularity, and revenue to
                    optimize your service offerings and pricing strategies.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Performance Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Service Performance
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Service performance chart
                  </p>
                </div>
              </div>
            </div>

            {/* Service Categories Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Service Categories
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Service categories chart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Customer Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.customers}>
            <button
              onClick={() => toggleTooltip("customers")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.customers && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Customer Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Understand your customer base, retention rates, and lifetime
                    value to improve customer relationships and business growth.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Growth Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Customer Growth
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Customer growth line chart
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Segments Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#191C27] text-lg">
                  Customer Segments
                </h3>
              </div>
              <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                  <p className="text-[#848D6F] text-sm">
                    Customer segments chart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
