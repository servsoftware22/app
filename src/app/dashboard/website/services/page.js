"use client";

import { useState } from "react";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  DollarSign,
  Clock,
  Star,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

export default function WebsiteServicesPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: "active", name: "Active", count: 6 },
    { id: "draft", name: "Draft", count: 2 },
    { id: "archived", name: "Archived", count: 1 },
  ];

  const activeServices = [
    {
      id: 1,
      name: "HVAC Maintenance",
      description: "Complete HVAC system maintenance and inspection",
      price: "$150",
      duration: "2 hours",
      category: "HVAC",
      status: "active",
      featured: true,
      rating: 4.8,
      reviews: 24,
      bookings: 156,
    },
    {
      id: 2,
      name: "Plumbing Repair",
      description: "Emergency and routine plumbing repairs",
      price: "$120",
      duration: "1.5 hours",
      category: "Plumbing",
      status: "active",
      featured: false,
      rating: 4.9,
      reviews: 18,
      bookings: 89,
    },
    {
      id: 3,
      name: "Electrical Installation",
      description: "Professional electrical wiring and installation",
      price: "$200",
      duration: "3 hours",
      category: "Electrical",
      status: "active",
      featured: true,
      rating: 4.7,
      reviews: 31,
      bookings: 203,
    },
    {
      id: 4,
      name: "AC Installation",
      description: "Complete air conditioning system installation",
      price: "$1,200",
      duration: "6 hours",
      category: "HVAC",
      status: "active",
      featured: false,
      rating: 4.6,
      reviews: 12,
      bookings: 45,
    },
    {
      id: 5,
      name: "Emergency Plumbing",
      description: "24/7 emergency plumbing services",
      price: "$200",
      duration: "2 hours",
      category: "Plumbing",
      status: "active",
      featured: true,
      rating: 4.9,
      reviews: 42,
      bookings: 178,
    },
    {
      id: 6,
      name: "Electrical Inspection",
      description: "Comprehensive electrical safety inspection",
      price: "$80",
      duration: "1 hour",
      category: "Electrical",
      status: "active",
      featured: false,
      rating: 4.5,
      reviews: 15,
      bookings: 67,
    },
  ];

  const draftServices = [
    {
      id: 7,
      name: "Smart Home Installation",
      description: "Installation of smart home devices and systems",
      price: "$300",
      duration: "4 hours",
      category: "Technology",
      status: "draft",
      featured: false,
    },
    {
      id: 8,
      name: "Water Heater Repair",
      description: "Repair and maintenance of water heaters",
      price: "$180",
      duration: "2.5 hours",
      category: "Plumbing",
      status: "draft",
      featured: false,
    },
  ];

  const archivedServices = [
    {
      id: 9,
      name: "Old Service",
      description: "This service is no longer offered",
      price: "$100",
      duration: "1 hour",
      category: "General",
      status: "archived",
      featured: false,
    },
  ];

  const getServicesByTab = () => {
    switch (activeTab) {
      case "active":
        return activeServices;
      case "draft":
        return draftServices;
      case "archived":
        return archivedServices;
      default:
        return activeServices;
    }
  };

  const toggleServiceStatus = (serviceId) => {
    console.log(`Toggling service status: ${serviceId}`);
  };

  const toggleFeatured = (serviceId) => {
    console.log(`Toggling featured status: ${serviceId}`);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-[#FF5E00]" />
            </div>
            <div>
              <p className="text-sm text-[#848D6F]">Total Services</p>
              <p className="text-xl font-semibold text-[#191C27]">9</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-[#FF5E00]" />
            </div>
            <div>
              <p className="text-sm text-[#848D6F]">Active Services</p>
              <p className="text-xl font-semibold text-[#191C27]">6</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-[#FF5E00]" />
            </div>
            <div>
              <p className="text-sm text-[#848D6F]">Featured Services</p>
              <p className="text-xl font-semibold text-[#191C27]">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-[#FF5E00]" />
            </div>
            <div>
              <p className="text-sm text-[#848D6F]">Total Bookings</p>
              <p className="text-xl font-semibold text-[#191C27]">740</p>
            </div>
          </div>
        </div>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getServicesByTab().map((service) => (
              <div
                key={service.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="h-5 w-5 text-[#FF5E00]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#191C27] text-base">
                        {service.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {service.featured && (
                          <span className="text-xs bg-[#FF5E00]/10 text-[#FF5E00] px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                          <MoreHorizontal className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#848D6F] mb-3">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-[#848D6F]" />
                            <span className="text-sm font-medium text-[#191C27]">
                              {service.price}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-[#848D6F]" />
                            <span className="text-sm text-[#848D6F]">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      {service.rating && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-[#FF5E00] fill-current" />
                            <span className="text-sm text-[#848D6F]">
                              {service.rating} ({service.reviews} reviews)
                            </span>
                          </div>
                          <span className="text-xs text-[#848D6F]">
                            {service.bookings} bookings
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#848D6F] bg-gray-100 px-2 py-1 rounded-full">
                          {service.category}
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Service Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#191C27]">
                Add New Service
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows="3"
                  placeholder="Enter service description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="$0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#191C27] mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="1 hour"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191C27] mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>HVAC</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>General</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#FF5E00] text-white rounded-md hover:bg-[#FF4A00] transition-colors">
                Create Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
