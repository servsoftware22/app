"use client";

import {
  Users,
  TrendingUp,
  Settings,
  Plus,
  MoreHorizontal,
  Star,
  Clock,
  DollarSign,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  UserPlus,
  Activity,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Filter,
  Search,
  Shield,
  Bell,
  ChevronDown,
  Eye,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function TeamPage() {
  const [tooltips, setTooltips] = useState({
    members: false,
    performance: false,
    settings: false,
  });

  const tooltipRefs = {
    members: useRef(null),
    performance: useRef(null),
    settings: useRef(null),
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

  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Technician",
      email: "sarah.johnson@servicepro.com",
      phone: "+1 (555) 123-4567",
      location: "Downtown Office",
      avatar: "SJ",
      status: "active",
      rating: 4.8,
      completedJobs: 156,
      totalEarnings: "$12,450",
      thisMonth: "$2,100",
      specialties: ["HVAC", "Plumbing", "Electrical"],
      availability: "Mon-Fri, 8AM-6PM",
      joinDate: "2022-03-15",
      performance: {
        jobsCompleted: 156,
        customerRating: 4.8,
        onTimeRate: 98,
        repeatCustomers: 45,
      },
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Plumbing Specialist",
      email: "mike.chen@servicepro.com",
      phone: "+1 (555) 234-5678",
      location: "West Branch",
      avatar: "MC",
      status: "active",
      rating: 4.9,
      completedJobs: 203,
      totalEarnings: "$18,750",
      thisMonth: "$3,200",
      specialties: ["Plumbing", "Water Systems"],
      availability: "Mon-Sat, 7AM-7PM",
      joinDate: "2021-08-22",
      performance: {
        jobsCompleted: 203,
        customerRating: 4.9,
        onTimeRate: 99,
        repeatCustomers: 67,
      },
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      role: "Electrical Technician",
      email: "lisa.rodriguez@servicepro.com",
      phone: "+1 (555) 345-6789",
      location: "East Branch",
      avatar: "LR",
      status: "active",
      rating: 4.7,
      completedJobs: 134,
      totalEarnings: "$11,200",
      thisMonth: "$1,800",
      specialties: ["Electrical", "Security Systems"],
      availability: "Mon-Fri, 9AM-5PM",
      joinDate: "2023-01-10",
      performance: {
        jobsCompleted: 134,
        customerRating: 4.7,
        onTimeRate: 96,
        repeatCustomers: 38,
      },
    },
    {
      id: 4,
      name: "David Wilson",
      role: "HVAC Technician",
      email: "david.wilson@servicepro.com",
      phone: "+1 (555) 456-7890",
      location: "North Branch",
      avatar: "DW",
      status: "on_leave",
      rating: 4.6,
      completedJobs: 89,
      totalEarnings: "$8,900",
      thisMonth: "$0",
      specialties: ["HVAC", "Air Quality"],
      availability: "On Leave",
      joinDate: "2023-06-05",
      performance: {
        jobsCompleted: 89,
        customerRating: 4.6,
        onTimeRate: 94,
        repeatCustomers: 23,
      },
    },
  ];

  const teamAnalytics = {
    totalMembers: 4,
    activeMembers: 3,
    averageRating: 4.8,
    totalJobsCompleted: 582,
    totalEarnings: "$51,300",
    thisMonthEarnings: "$7,100",
    customerSatisfaction: 96,
    onTimeRate: 97,
  };

  const performanceMetrics = [
    {
      title: "Total Jobs Completed",
      value: teamAnalytics.totalJobsCompleted,
      change: "+12%",
      trend: "up",
      icon: CheckCircle,
    },
    {
      title: "Average Rating",
      value: teamAnalytics.averageRating,
      change: "+0.2",
      trend: "up",
      icon: Star,
    },
    {
      title: "On-Time Rate",
      value: `${teamAnalytics.onTimeRate}%`,
      change: "+3%",
      trend: "up",
      icon: Clock,
    },
    {
      title: "Customer Satisfaction",
      value: `${teamAnalytics.customerSatisfaction}%`,
      change: "+5%",
      trend: "up",
      icon: Award,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      member: "Sarah Johnson",
      action: "Completed HVAC maintenance job",
      time: "2 hours ago",
      amount: "$150",
      status: "completed",
    },
    {
      id: 2,
      member: "Mike Chen",
      action: "Started plumbing repair",
      time: "4 hours ago",
      amount: "$350",
      status: "in_progress",
    },
    {
      id: 3,
      member: "Lisa Rodriguez",
      action: "Scheduled electrical inspection",
      time: "1 day ago",
      amount: "$200",
      status: "scheduled",
    },
    {
      id: 4,
      member: "Sarah Johnson",
      action: "Received 5-star review",
      time: "2 days ago",
      amount: "Review",
      status: "review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Team Overview Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Team Overview
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Add Team Member</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Members
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {teamAnalytics.totalMembers}
                  </p>
                  <p className="text-xs text-[#848D6F]">
                    {teamAnalytics.activeMembers} active
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Earnings
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {teamAnalytics.totalEarnings}
                  </p>
                  <p className="text-xs text-[#848D6F]">
                    {teamAnalytics.thisMonthEarnings} this month
                  </p>
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
                    {teamAnalytics.averageRating}
                  </p>
                  <p className="text-xs text-[#848D6F]">
                    {teamAnalytics.customerSatisfaction}% satisfaction
                  </p>
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
                    On-Time Rate
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {teamAnalytics.onTimeRate}%
                  </p>
                  <p className="text-xs text-[#848D6F]">
                    {teamAnalytics.totalJobsCompleted} jobs completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Team Members</h2>
          </div>
          <div className="relative" ref={tooltipRefs.members}>
            <button
              onClick={() => toggleTooltip("members")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.members && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Team Members
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Manage your team members, view their performance metrics,
                    contact information, and availability status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold text-[#FF5E00]">
                        {member.avatar}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-[#191C27] text-lg">
                          {member.name}
                        </h3>
                        <p className="text-sm text-[#848D6F]">{member.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {member.status === "active" ? "Active" : "On Leave"}
                        </span>
                        <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-[#FF5E00] fill-current" />
                          <span className="text-sm font-medium text-[#191C27]">
                            {member.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">
                          Jobs Completed
                        </span>
                        <span className="text-sm font-medium text-[#191C27]">
                          {member.completedJobs}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">
                          This Month
                        </span>
                        <span className="text-sm font-medium text-[#191C27]">
                          {member.thisMonth}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#848D6F]">
                          Specialties
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#FF5E00]/10 text-[#FF5E00] text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="w-full bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Performance Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.performance}>
            <button
              onClick={() => toggleTooltip("performance")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.performance && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Performance Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track team performance metrics including job completion
                    rates, customer ratings, on-time performance, and earnings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#FF5E00]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#848D6F] mb-1">
                        {metric.title}
                      </p>
                      <p className="text-xl font-semibold text-[#191C27] mb-1">
                        {metric.value}
                      </p>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-[#FF5E00] mr-1" />
                        <p className="text-sm text-[#FF5E00]">
                          {metric.change}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#191C27] text-lg">
                Team Performance Trends
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
                  <Filter className="h-4 w-4" />
                </button>
                <select className="text-sm border border-gray-200 rounded-md px-3 py-1">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last 6 months</option>
                </select>
              </div>
            </div>
            <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-[#848D6F] mx-auto mb-2" />
                <p className="text-[#848D6F] text-sm">
                  Performance chart will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Recent Activity
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-3 h-3 bg-[#FF5E00] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-[#191C27] font-medium">
                      {activity.member}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : activity.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : activity.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {activity.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-[#848D6F] mb-1">
                    {activity.action}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#848D6F]">{activity.time}</p>
                    <p className="text-sm font-medium text-[#191C27]">
                      {activity.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Settings Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Team Settings
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.settings}>
            <button
              onClick={() => toggleTooltip("settings")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.settings && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Settings className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Team Settings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Configure team permissions, notification settings, and
                    management preferences for your team.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Permissions
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Booking Management</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Payment Access</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Disabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Client Management</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Team Analytics</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">View Only</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Notifications
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">New Bookings</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Payment Updates</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Performance Reports</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Weekly</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Team Activity</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Real-time</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Team Management
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Auto Assignment</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Workload Balancing</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Smart</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Performance Tracking</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Real-time</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Team Scheduling</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Flexible</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
