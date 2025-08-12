"use client";

import {
  Calendar,
  Clock,
  Users,
  Plus,
  Filter,
  Search,
  Info,
  Settings,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  List,
  DollarSign,
  ChevronDown,
  CalendarDays,
  Square,
  Bell,
  MessageSquare,
  Shield,
  UserCheck,
  Zap,
  Globe,
  Edit,
  ChevronRight as ChevronRightIcon,
  Eye,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function JobsPage() {
  const [tooltips, setTooltips] = useState({
    jobs: false,
  });

  const tooltipRefs = {
    jobs: useRef(null),
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
      if (tooltips.jobs && !tooltipRefs.jobs.current?.contains(event.target)) {
        setTooltips((prev) => ({ ...prev, jobs: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltips.jobs]);

  // Mock data for upcoming jobs
  const upcomingJobs = [
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

  // Mock data for past jobs
  const pastJobs = [
    {
      id: 1,
      client: "John Smith",
      service: "AC Installation",
      date: "2024-01-10",
      time: "09:00 AM",
      status: "completed",
      amount: "$1,200",
      duration: "4 hours",
      location: "Residential Home",
    },
    {
      id: 2,
      client: "Emma Davis",
      service: "Plumbing Emergency",
      date: "2024-01-09",
      time: "02:30 PM",
      status: "completed",
      amount: "$350",
      duration: "1.5 hours",
      location: "Apartment Complex",
    },
    {
      id: 3,
      client: "David Wilson",
      service: "Electrical Wiring",
      date: "2024-01-08",
      time: "11:00 AM",
      status: "completed",
      amount: "$800",
      duration: "3 hours",
      location: "Office Building",
    },
    {
      id: 4,
      client: "Maria Garcia",
      service: "HVAC Repair",
      date: "2024-01-07",
      time: "03:00 PM",
      status: "completed",
      amount: "$450",
      duration: "2 hours",
      location: "Retail Store",
    },
    {
      id: 5,
      client: "Robert Johnson",
      service: "Plumbing Maintenance",
      date: "2024-01-06",
      time: "10:30 AM",
      status: "completed",
      amount: "$280",
      duration: "1 hour",
      location: "Restaurant",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Upcoming Jobs Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Upcoming Jobs
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.jobs}>
            <button
              onClick={() => toggleTooltip("jobs")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.jobs && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Upcoming Jobs
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    View your next scheduled jobs with client details, service
                    information, and job status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[#FF5E00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#191C27] text-base">
                        {job.client}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "confirmed"
                            ? "bg-[#FF5E00]/10 text-[#FF5E00]"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#848D6F] mb-2">{job.service}</p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.date}
                      </div>
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.duration}
                      </div>
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Jobs Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <List className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Past Jobs</h2>
          </div>
          <div className="relative" ref={tooltipRefs.jobs}>
            <button
              onClick={() => toggleTooltip("jobs")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.jobs && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <List className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Past Jobs
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    View your historical jobs and completed services.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {pastJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(job.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-[#848D6F] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {job.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {job.client}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {job.service}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
