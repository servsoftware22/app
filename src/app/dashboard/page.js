"use client";

import {
  Globe,
  Settings,
  Calendar,
  CreditCard,
  Users,
  Link,
  TrendingUp,
  Eye,
  UserCheck,
  Clock,
  Edit,
  Megaphone,
  CheckCircle,
  ArrowRight,
  Plus,
  DollarSign,
  Star,
  MessageSquare,
  Activity,
  BookOpen,
  Zap,
  History,
  Info,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Setup from "./components/Setup";

export default function DashboardPage() {
  const [tooltips, setTooltips] = useState({
    onboarding: false,
    analytics: false,
    activity: false,
    bookings: false,
    actions: false,
    recent: false,
  });

  const tooltipRefs = {
    onboarding: useRef(null),
    analytics: useRef(null),
    activity: useRef(null),
    bookings: useRef(null),
    actions: useRef(null),
    recent: useRef(null),
  };

  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/dashboard/user", { method: "GET" });
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();
        setUserData(data.user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const onboarding = userData?.onboarding;
  const needsSetup = onboarding?.status?.completed !== true;

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

  const analyticsData = {
    payments: {
      value: "$12,450",
      change: "+12%",
      trend: "up",
      period: "This month",
    },
    websiteVisits: {
      value: "2,847",
      change: "+8%",
      trend: "up",
      period: "This week",
    },
    totalClients: { value: "156", change: "+5%", trend: "up", period: "Total" },
    scheduledBookings: {
      value: "23",
      change: "+15%",
      trend: "up",
      period: "This week",
    },
  };

  const upcomingBookings = [
    {
      id: 1,
      client: "Sarah Johnson",
      service: "HVAC Maintenance",
      date: "Today, 2:00 PM",
      status: "confirmed",
      duration: "2 hours",
      location: "Downtown Office",
    },
    {
      id: 2,
      client: "Mike Chen",
      service: "Plumbing Repair",
      date: "Tomorrow, 10:00 AM",
      status: "confirmed",
      duration: "1.5 hours",
      location: "Residential Home",
    },
    {
      id: 3,
      client: "Lisa Rodriguez",
      service: "Electrical Inspection",
      date: "Tomorrow, 3:30 PM",
      status: "pending",
      duration: "1 hour",
      location: "Commercial Building",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      client: "John Smith",
      service: "AC Installation",
      date: "2 hours ago",
      amount: "$1,200",
      status: "completed",
      rating: 5,
      review: "Excellent service, very professional!",
    },
    {
      id: 2,
      client: "Emma Davis",
      service: "Plumbing Emergency",
      date: "1 day ago",
      amount: "$350",
      status: "completed",
      rating: 4,
      review: "Quick response, fixed the issue fast.",
    },
    {
      id: 3,
      client: "David Wilson",
      service: "Electrical Wiring",
      date: "2 days ago",
      amount: "$800",
      status: "completed",
      rating: 5,
      review: "Great work, highly recommend!",
    },
  ];

  const onboardingSteps = [
    {
      title: "Launch my website",
      description:
        "Get your professional website live and start attracting customers",
      icon: Globe,
      completed: true,
      href: "/dashboard/website",
      progress: "100%",
    },
    {
      title: "Add my services",
      description:
        "List all your services with detailed pricing and descriptions",
      icon: Settings,
      completed: true,
      href: "/dashboard/services",
      progress: "100%",
    },
    {
      title: "Setup scheduling",
      description: "Enable online booking for clients to schedule appointments",
      icon: Calendar,
      completed: false,
      href: "/dashboard/scheduling",
      progress: "0%",
    },
    {
      title: "Take Payments",
      description: "Accept secure online payments from your customers",
      icon: CreditCard,
      completed: false,
      href: "/dashboard/payments",
      progress: "0%",
    },
    {
      title: "Add Team Members",
      description: "Invite your team to the platform and manage permissions",
      icon: Users,
      completed: false,
      href: "/dashboard/team",
      progress: "0%",
    },
  ];

  if (loadingUser) {
    return (
      <div className="min-h-[calc(100vh-6rem)] p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500"></div>
      </div>
    );
  }

  // If setup not completed, render Setup component and hide rest of dashboard
  if (needsSetup) {
    console.log("Rendering Setup component");
    return (
      <div className="space-y-6">
        <Setup
          initialStepIndex={0}
          onboarding={onboarding}
          userData={userData}
          onUpdated={(updated) => {
            setUserData((prev) => ({ ...prev, onboarding: updated }));
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Onboarding Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Onboarding</h2>
          </div>
          <div className="relative" ref={tooltipRefs.onboarding}>
            <button
              onClick={() => toggleTooltip("onboarding")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.onboarding && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Onboarding
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Complete these steps to set up your business profile and
                    start attracting customers. Each step will guide you through
                    the essential features.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onboardingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        step.completed ? "bg-[#FF5E00]/10" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          step.completed ? "text-[#FF5E00]" : "text-[#848D6F]"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-[#191C27] text-base">
                          {step.title}
                        </h3>
                        {step.completed && (
                          <CheckCircle className="h-4 w-4 text-[#FF5E00]" />
                        )}
                      </div>
                      <p className="text-sm text-[#848D6F] mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#FF5E00] h-2 rounded-full transition-all duration-300"
                            style={{ width: step.progress }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#848D6F] ml-2">
                          {step.progress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overview Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Overview Analytics
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
                    Overview Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track your business performance with key metrics including
                    payments, website visits, client growth, and booking trends.
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
                  <DollarSign className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Payments
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {analyticsData.payments.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {analyticsData.payments.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {analyticsData.payments.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Website Visits
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {analyticsData.websiteVisits.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {analyticsData.websiteVisits.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {analyticsData.websiteVisits.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Clients
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {analyticsData.totalClients.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {analyticsData.totalClients.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {analyticsData.totalClients.period}
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
                    Scheduled Bookings
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {analyticsData.scheduledBookings.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {analyticsData.scheduledBookings.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {analyticsData.scheduledBookings.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Activity</h2>
          </div>
          <div className="relative" ref={tooltipRefs.activity}>
            <button
              onClick={() => toggleTooltip("activity")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.activity && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Activity className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Activity
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Real-time updates showing recent bookings, payments, website
                    activity, and customer reviews to keep you informed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#FF5E00] rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-[#191C27] font-medium">
                  New client Sarah Johnson booked HVAC maintenance for today
                </p>
                <p className="text-xs text-[#848D6F] mt-1">
                  2 hours ago • $150
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#FF5E00] rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-[#191C27] font-medium">
                  Payment received from Mike Chen
                </p>
                <p className="text-xs text-[#848D6F] mt-1">
                  4 hours ago • $350
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#FF5E00] rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-[#191C27] font-medium">
                  Website traffic increased by 15% this week
                </p>
                <p className="text-xs text-[#848D6F] mt-1">
                  1 day ago • 2,847 visits
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#FF5E00] rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-[#191C27] font-medium">
                  New review received from Lisa Rodriguez
                </p>
                <p className="text-xs text-[#848D6F] mt-1">
                  2 days ago • ⭐⭐⭐⭐⭐
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Upcoming Bookings
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.bookings}>
            <button
              onClick={() => toggleTooltip("bookings")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.bookings && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Upcoming Bookings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    View your next scheduled appointments with client details,
                    service information, and booking status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[#FF5E00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#191C27] text-base">
                        {booking.client}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-[#FF5E00]/10 text-[#FF5E00]"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#848D6F] mb-2">
                      {booking.service}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <Clock className="h-4 w-4 mr-2" />
                        {booking.date}
                      </div>
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <span className="mr-2">⏱</span>
                        {booking.duration}
                      </div>
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <span className="mr-2">📍</span>
                        {booking.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section: Website & Ads */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Quick Actions
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
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Quick Actions
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Quick access to essential tools for managing your website
                    content and running marketing campaigns.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Edit Website */}
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Edit className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#191C27] text-base">
                      Edit your website
                    </h3>
                    <ArrowRight className="h-4 w-4 text-[#848D6F]" />
                  </div>
                  <p className="text-sm text-[#848D6F] mb-4 leading-relaxed">
                    Update your services, pricing, and website content to
                    attract more clients and improve your online presence.
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Edit Website
                    </button>
                    <span className="text-xs text-[#848D6F]">
                      Last updated 2 days ago
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Running Ads */}
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#191C27] text-base">
                      Start running ads
                    </h3>
                    <ArrowRight className="h-4 w-4 text-[#848D6F]" />
                  </div>
                  <p className="text-sm text-[#848D6F] mb-4 leading-relaxed">
                    Create targeted ads to reach new customers and grow your
                    business with our marketing tools.
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Create Ads
                    </button>
                    <span className="text-xs text-[#848D6F]">
                      Budget: $500/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <History className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Recent Bookings
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.recent}>
            <button
              onClick={() => toggleTooltip("recent")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.recent && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <History className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Recent Bookings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    View recently completed services with customer feedback,
                    ratings, and payment information.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-white">
              <h3 className="font-medium text-[#191C27] text-base">
                Latest completed services
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="px-4 py-3 hover:bg-white transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-[#FF5E00]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-[#191C27] text-base">
                            {booking.client}
                          </p>
                          <p className="text-sm text-[#848D6F]">
                            {booking.service}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#191C27] text-base">
                            {booking.amount}
                          </p>
                          <p className="text-sm text-[#848D6F]">
                            {booking.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-[#FF5E00] fill-current"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-[#848D6F]">
                            ({booking.rating}/5)
                          </span>
                        </div>
                        <MessageSquare className="h-4 w-4 text-[#848D6F]" />
                      </div>
                      <p className="text-sm text-[#848D6F] mt-2 italic">
                        "{booking.review}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
