"use client";

import {
  Settings,
  Info,
  ChevronDown,
  User,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Plus,
  Edit,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Zap,
  Users,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Tooltip state
  const [tooltips, setTooltips] = useState({
    profile: false,
    security: false,
    notifications: false,
    business: false,
    billing: false,
  });

  // Tooltip refs
  const tooltipRefs = {
    profile: useRef(null),
    security: useRef(null),
    notifications: useRef(null),
    business: useRef(null),
    billing: useRef(null),
  };

  const toggleTooltip = (tooltipName) => {
    setTooltips((prev) => ({
      ...prev,
      [tooltipName]: !prev[tooltipName],
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

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "business", name: "Business", icon: Building },
    { id: "billing", name: "Billing", icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Settings</h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-[#191C27] shadow-sm"
                      : "text-[#848D6F] hover:text-[#191C27]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Personal Information
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
                    <span className="text-[#191C27]">Full Name</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">John Doe</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Email Address</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">john@example.com</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Phone Number</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">+1 (555) 123-4567</span>
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
                    <MapPin className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Address Information
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
                    <span className="text-[#191C27]">Street Address</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">123 Main St</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">City</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">New York</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">State</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">NY</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Password Settings
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
                    <span className="text-[#191C27]">Current Password</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">••••••••</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">New Password</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">••••••••</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Confirm Password</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">••••••••</span>
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
                    <Shield className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Two-Factor Authentication
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
                    <span className="text-[#191C27]">SMS Authentication</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Enabled</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">App Authentication</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Disabled</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Email Notifications
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
                    <span className="text-[#191C27]">
                      Payment Confirmations
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Enabled</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Marketing Updates</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Disabled</span>
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
                    <Phone className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      SMS Notifications
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
                    <span className="text-[#191C27]">
                      Appointment Reminders
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Enabled</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Payment Alerts</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Enabled</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Business Information
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
                    <span className="text-[#191C27]">Business Name</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">
                        ServicePro Business
                      </span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Business Type</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Service Provider</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Tax ID</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">12-3456789</span>
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
                    <Calendar className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Business Hours
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
                    <span className="text-[#191C27]">Monday - Friday</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">9:00 AM - 6:00 PM</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Saturday</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">10:00 AM - 4:00 PM</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Sunday</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Closed</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Billing Information
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
                    <span className="text-[#191C27]">Current Plan</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Professional</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Billing Cycle</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Monthly</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Next Billing Date</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">March 15, 2024</span>
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
                    <FileText className="h-5 w-5 text-[#FF5E00]" />
                    <h3 className="font-medium text-[#191C27] text-base">
                      Invoice Settings
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
                    <span className="text-[#191C27]">Auto Invoice</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Enabled</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Payment Terms</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">Net 30</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                    <span className="text-[#191C27]">Late Fee</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#848D6F]">5% after 30 days</span>
                      <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
