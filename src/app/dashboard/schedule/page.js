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

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    availability: false,
    lunch: false,
    buffer: false,
    weekend: false,
    recurring: false,
    team: false,
    global: false,
    auto: false,
    email: false,
    sms: false,
    inapp: false,
  });

  const [tooltips, setTooltips] = useState({
    calendar: false,
    bookings: false,
    availability: false,
    availabilitySettings: false,
    recurringSettings: false,
    notificationSettings: false,
    confirmations: false,
    cancellations: false,
    reminders: false,
    followup: false,
  });

  const tooltipRefs = {
    calendar: useRef(null),
    bookings: useRef(null),
    availability: useRef(null),
    availabilitySettings: useRef(null),
    recurringSettings: useRef(null),
    notificationSettings: useRef(null),
    confirmations: useRef(null),
    cancellations: useRef(null),
    reminders: useRef(null),
    followup: useRef(null),
  };

  const createDropdownRef = useRef(null);

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

  // Close create dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createDropdownOpen &&
        createDropdownRef.current &&
        !createDropdownRef.current.contains(event.target)
      ) {
        setCreateDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [createDropdownOpen]);

  const createOptions = [
    {
      id: "booking",
      title: "New Booking",
      description: "Schedule a new appointment",
      icon: Calendar,
    },
    {
      id: "event",
      title: "New Event",
      description: "Create a new event",
      icon: CalendarDays,
    },
    {
      id: "timeblock",
      title: "New Time Block",
      description: "Block time on your calendar",
      icon: Clock,
    },
  ];

  const handleCreateOption = (optionId) => {
    console.log(`Creating: ${optionId}`);
    setCreateDropdownOpen(false);
  };

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      client: "Sarah Johnson",
      service: "HVAC Maintenance",
      date: "2024-01-15",
      time: "09:00 AM",
      duration: "2 hours",
      status: "confirmed",
      location: "123 Main St, City",
      phone: "+1 (555) 123-4567",
      email: "sarah@email.com",
      notes: "Annual maintenance check",
      price: "$150",
    },
    {
      id: 2,
      client: "Mike Chen",
      service: "Plumbing Repair",
      date: "2024-01-15",
      time: "02:00 PM",
      duration: "1.5 hours",
      status: "confirmed",
      location: "456 Oak Ave, City",
      phone: "+1 (555) 987-6543",
      email: "mike@email.com",
      notes: "Leaky faucet repair",
      price: "$200",
    },
    {
      id: 3,
      client: "Emily Davis",
      service: "Electrical Installation",
      date: "2024-01-16",
      time: "10:30 AM",
      duration: "3 hours",
      status: "pending",
      location: "789 Pine Rd, City",
      phone: "+1 (555) 456-7890",
      email: "emily@email.com",
      notes: "New outlet installation",
      price: "$300",
    },
    {
      id: 4,
      client: "David Wilson",
      service: "Emergency Service",
      date: "2024-01-17",
      time: "08:00 AM",
      duration: "1 hour",
      status: "confirmed",
      location: "321 Elm St, City",
      phone: "+1 (555) 234-5678",
      email: "david@email.com",
      notes: "Urgent repair needed",
      price: "$250",
    },
  ];

  // Mock data for upcoming bookings
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

  // Mock data for past bookings
  const pastBookings = [
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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = new Date(year, month, 1).getDay();
    return { daysInMonth, startingDay };
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayBookings = bookings.filter(
        (booking) => booking.date === date.toISOString().split("T")[0]
      );
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg ${
            isToday ? "bg-[#FF5E00]/20" : "bg-gray-50"
          } ${isSelected ? "bg-[#848D6F]/20" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-sm font-medium ${
                isToday
                  ? "text-[#FF5E00]"
                  : isSelected
                  ? "text-[#848D6F]"
                  : "text-gray-900"
              }`}
            >
              {day}
            </span>
            {dayBookings.length > 0 && (
              <span className="text-xs bg-[#FF5E00] text-white px-1.5 py-0.5 rounded-full">
                {dayBookings.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayBookings.slice(0, 2).map((booking) => (
              <div
                key={booking.id}
                className={`text-xs p-1 rounded truncate ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
                title={`${booking.time} - ${booking.client}`}
              >
                {booking.time} - {booking.client}
              </div>
            ))}
            {dayBookings.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayBookings.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Calendar</h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 ml-4">
              <button
                onClick={goToPreviousMonth}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <ChevronLeft className="h-3 w-3 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-900">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={goToNextMonth}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <ChevronRight className="h-3 w-3 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              <Filter className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <div className="relative" ref={createDropdownRef}>
              <button
                onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                className="group flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md bg-[#191C27] text-white hover:bg-[#191C27]/90 transition-colors min-w-[120px]"
              >
                <div className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Create
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-white transition-transform duration-200 ml-2 ${
                    createDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {createDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-gray-100 rounded-md overflow-hidden py-2 px-3 w-48">
                  {createOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleCreateOption(option.id)}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-[#848D6F] transition-colors group rounded-md"
                      >
                        <IconComponent className="h-4 w-4 text-[#191C27] group-hover:text-white flex-shrink-0" />
                        <span className="font-medium text-[#191C27] group-hover:text-white text-sm transition-colors">
                          {option.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
            {renderCalendar()}
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
                        <Clock className="h-4 w-4 mr-2" />
                        {booking.duration}
                      </div>
                      <div className="flex items-center text-sm text-[#848D6F]">
                        <MapPin className="h-4 w-4 mr-2" />
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

      {/* Past Bookings Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <List className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Past Bookings
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
                    <List className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Past Bookings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    View your historical appointments and completed services.
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
                {pastBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-[#848D6F] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {booking.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.client}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {booking.service}
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

      {/* Schedule Settings Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Schedule Settings
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.availability}>
            <button
              onClick={() => toggleTooltip("availability")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.availability && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Settings className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Schedule Settings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Configure your availability, team settings, and notification
                    preferences to optimize your scheduling workflow.
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
                  <Clock className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Availability Settings
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="relative"
                    ref={tooltipRefs.availabilitySettings}
                  >
                    <button
                      onClick={() => toggleTooltip("availabilitySettings")}
                      className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    {tooltips.availabilitySettings && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                          <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                            <Clock className="h-3 w-3 text-white" />
                          </div>
                          <h3 className="text-sm font-medium text-[#191C27]">
                            Availability Settings
                          </h3>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-[#848D6F] leading-relaxed">
                            Configure your availability settings to ensure
                            clients can book appointments at the right times.
                            Set your working hours, lunch breaks, buffer times,
                            and weekend availability.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Available Hours</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">8:00 AM - 6:00 PM</span>
                    <button
                      onClick={() => toggleSection("availability")}
                      className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors"
                    >
                      {expandedSections.availability ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {expandedSections.availability && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Available Hours
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-[#848D6F] mb-1">
                              Start Time
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                              <option>8:00 AM</option>
                              <option>9:00 AM</option>
                              <option>10:00 AM</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-[#848D6F] mb-1">
                              End Time
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                              <option>5:00 PM</option>
                              <option>6:00 PM</option>
                              <option>7:00 PM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("lunch")}
                >
                  <span className="text-[#191C27]">Lunch Break</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">12:00 PM - 1:00 PM</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.lunch ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.lunch && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Lunch Break
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm text-[#848D6F]">
                              Enable lunch break
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                              <option>12:00 PM</option>
                              <option>12:30 PM</option>
                            </select>
                            <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                              <option>1:00 PM</option>
                              <option>1:30 PM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("buffer")}
                >
                  <span className="text-[#191C27]">Buffer Time</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">15 minutes</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.buffer ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.buffer && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Buffer Time
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                          <option>No buffer time</option>
                          <option>5 minutes</option>
                          <option>10 minutes</option>
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("weekend")}
                >
                  <span className="text-[#191C27]">Weekend Hours</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">9:00 AM - 3:00 PM</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.weekend ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.weekend && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Weekend Hours
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-[#848D6F] mb-1">
                              Start Time
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                              <option>9:00 AM</option>
                              <option>10:00 AM</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-[#848D6F] mb-1">
                              End Time
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                              <option>3:00 PM</option>
                              <option>4:00 PM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Recurring & Team Settings
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative" ref={tooltipRefs.recurringSettings}>
                    <button
                      onClick={() => toggleTooltip("recurringSettings")}
                      className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    {tooltips.recurringSettings && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                          <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                            <Users className="h-3 w-3 text-white" />
                          </div>
                          <h3 className="text-sm font-medium text-[#191C27]">
                            Recurring & Team Settings
                          </h3>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-[#848D6F] leading-relaxed">
                            Configure recurring appointments and team
                            availability settings. Set up recurring booking
                            patterns and manage team member availability and
                            schedules.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("recurring")}
                >
                  <span className="text-[#191C27]">Recurring Appointments</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled (Weekly)</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.recurring ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.recurring && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Recurring Appointments
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              defaultChecked
                            />
                            <span className="text-sm text-[#848D6F]">
                              Enable recurring appointments
                            </span>
                          </div>
                          <div className="ml-6 space-y-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="recurring"
                                className="mr-2"
                                defaultChecked
                              />
                              <span className="text-sm text-[#848D6F]">
                                Weekly
                              </span>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="recurring"
                                className="mr-2"
                              />
                              <span className="text-sm text-[#848D6F]">
                                Monthly
                              </span>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="recurring"
                                className="mr-2"
                              />
                              <span className="text-sm text-[#848D6F]">
                                Custom
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("team")}
                >
                  <span className="text-[#191C27]">Team Availability</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">3 members active</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.team ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.team && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Team Availability
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#848D6F]">
                              John Smith
                            </span>
                            <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                              <option>Available</option>
                              <option>Unavailable</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#848D6F]">
                              Sarah Johnson
                            </span>
                            <select className="px-2 py-1 border border-gray-300 rounded text-xs">
                              <option>Available</option>
                              <option>Unavailable</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("global")}
                >
                  <span className="text-[#191C27]">Global Availability</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Disabled</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.global ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.global && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Global Availability
                        </label>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-[#848D6F]">
                            Enable global availability settings
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("auto")}
                >
                  <span className="text-[#191C27]">Auto-Scheduling</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.auto ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.auto && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Auto-Scheduling
                        </label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            defaultChecked
                          />
                          <span className="text-sm text-[#848D6F]">
                            Enable AI-powered slot selection
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Notification Channels
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="relative"
                    ref={tooltipRefs.notificationSettings}
                  >
                    <button
                      onClick={() => toggleTooltip("notificationSettings")}
                      className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    {tooltips.notificationSettings && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                          <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                            <Bell className="h-3 w-3 text-white" />
                          </div>
                          <h3 className="text-sm font-medium text-[#191C27]">
                            Notification Channels
                          </h3>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-[#848D6F] leading-relaxed">
                            Configure your notification preferences and
                            channels. Set up email, SMS, and in-app
                            notifications for booking confirmations, reminders,
                            and updates.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("email")}
                >
                  <span className="text-[#191C27]">Email Notifications</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.email ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.email && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          Email Notifications
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#848D6F]">
                              Enable email notifications
                            </span>
                            <input
                              type="checkbox"
                              className="mr-2"
                              defaultChecked
                            />
                          </div>
                          <input
                            type="email"
                            placeholder="notifications@servicepro.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm pb-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("sms")}
                >
                  <span className="text-[#848D6F]">SMS Notifications</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Disabled</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.sms ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.sms && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          SMS Notifications
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#848D6F]">
                              Enable SMS notifications
                            </span>
                            <input type="checkbox" className="mr-2" />
                          </div>
                          <input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                  onClick={() => toggleSection("inapp")}
                >
                  <span className="text-[#191C27]">In-App Notifications</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <div className="p-1 text-[#848D6F]">
                      {expandedSections.inapp ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedSections.inapp && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#191C27] mb-2">
                          In-App Notifications
                        </label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#848D6F]">
                            Enable in-app notifications
                          </span>
                          <input
                            type="checkbox"
                            className="mr-2"
                            defaultChecked
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 text-sm text-[#848D6F] hover:text-[#191C27] transition-colors">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#848D6F] text-white rounded-md hover:bg-[#191C27] transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Notification Settings */}
          <div className="mt-6">
            <div className="space-y-6">
              {/* Confirmations */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#FF5E00]" />
                    <h4 className="font-medium text-[#191C27]">
                      Booking Confirmations
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative" ref={tooltipRefs.confirmations}>
                      <button
                        onClick={() => toggleTooltip("confirmations")}
                        className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                      {tooltips.confirmations && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                            <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-[#191C27]">
                              Booking Confirmations
                            </h3>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-[#848D6F] leading-relaxed">
                              Send confirmation notifications when appointments
                              are booked or confirmed. Configure email, SMS, and
                              in-app confirmations.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Email Confirmation</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">SMS Confirmation</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#191C27]">In-App Confirmation</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellations/Reschedules */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-[#FF5E00]" />
                    <h4 className="font-medium text-[#191C27]">
                      Cancellations & Reschedules
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative" ref={tooltipRefs.cancellations}>
                      <button
                        onClick={() => toggleTooltip("cancellations")}
                        className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                      {tooltips.cancellations && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                            <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                              <AlertCircle className="h-3 w-3 text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-[#191C27]">
                              Cancellations & Reschedules
                            </h3>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-[#848D6F] leading-relaxed">
                              Notify when appointments are cancelled or
                              rescheduled by clients or team members. Configure
                              email, SMS, and in-app notifications for changes.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Email Notification</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">SMS Notification</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#191C27]">In-App Notification</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reminders */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-[#FF5E00]" />
                    <h4 className="font-medium text-[#191C27]">
                      Appointment Reminders
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative" ref={tooltipRefs.reminders}>
                      <button
                        onClick={() => toggleTooltip("reminders")}
                        className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                      {tooltips.reminders && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                            <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                              <Bell className="h-3 w-3 text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-[#191C27]">
                              Appointment Reminders
                            </h3>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-[#848D6F] leading-relaxed">
                              Send reminder notifications to clients before
                              their scheduled appointments. Configure 24-hour,
                              1-hour, and 15-minute reminder options.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">24 Hours Before</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">1 Hour Before</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#191C27]">15 Minutes Before</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Follow-up */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-[#FF5E00]" />
                    <h4 className="font-medium text-[#191C27]">
                      Follow-up Notifications
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative" ref={tooltipRefs.followup}>
                      <button
                        onClick={() => toggleTooltip("followup")}
                        className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                      {tooltips.followup && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                            <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="h-3 w-3 text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-[#191C27]">
                              Follow-up Notifications
                            </h3>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-[#848D6F] leading-relaxed">
                              Send follow-up messages after appointments for
                              feedback and future bookings. Configure email,
                              SMS, and in-app follow-up notifications.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Email Follow-up</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">SMS Follow-up</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#191C27]">In-App Follow-up</span>
                    <div className="w-8 h-4 bg-[#848D6F] rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
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
