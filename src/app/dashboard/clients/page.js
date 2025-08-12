"use client";

import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building,
  Tag,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  RefreshCw,
  FileText,
  CreditCard,
  Activity,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  Info,
  Gift,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedClients, setSelectedClients] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table, grid, list
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Tooltip state
  const [tooltips, setTooltips] = useState({
    emailMarketing: false,
    salesOpportunities: false,
  });

  // Tooltip refs
  const tooltipRefs = {
    emailMarketing: useRef(null),
    salesOpportunities: useRef(null),
  };

  // Mock data for clients
  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      company: "Johnson & Associates",
      status: "active",
      source: "website",
      value: 2500,
      lastContact: "2024-01-15",
      nextFollowUp: "2024-01-25",
      totalBookings: 8,
      totalRevenue: 3200,
      tags: ["VIP", "Regular"],
      notes: "Prefers morning appointments",
      address: "123 Main St, City, State 12345",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@techcorp.com",
      phone: "+1 (555) 987-6543",
      company: "TechCorp Solutions",
      status: "prospect",
      source: "referral",
      value: 1500,
      lastContact: "2024-01-10",
      nextFollowUp: "2024-01-20",
      totalBookings: 2,
      totalRevenue: 800,
      tags: ["New", "High Potential"],
      notes: "Interested in premium services",
      address: "456 Oak Ave, City, State 12345",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@designstudio.com",
      phone: "+1 (555) 456-7890",
      company: "Design Studio Pro",
      status: "inactive",
      source: "social",
      value: 800,
      lastContact: "2023-12-20",
      nextFollowUp: "2024-02-01",
      totalBookings: 5,
      totalRevenue: 2100,
      tags: ["Past Client"],
      notes: "Moved to different city",
      address: "789 Pine Rd, City, State 12345",
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@construction.com",
      phone: "+1 (555) 321-6540",
      company: "Thompson Construction",
      status: "active",
      source: "website",
      value: 5000,
      lastContact: "2024-01-18",
      nextFollowUp: "2024-01-28",
      totalBookings: 12,
      totalRevenue: 8500,
      tags: ["VIP", "Regular", "High Value"],
      notes: "Large commercial projects",
      address: "321 Construction Blvd, City, State 12345",
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily.davis@consulting.com",
      phone: "+1 (555) 654-3210",
      company: "Davis Consulting Group",
      status: "prospect",
      source: "referral",
      value: 3000,
      lastContact: "2024-01-12",
      nextFollowUp: "2024-01-22",
      totalBookings: 0,
      totalRevenue: 0,
      tags: ["New", "High Potential"],
      notes: "Initial consultation scheduled",
      address: "654 Business Park, City, State 12345",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "prospect", label: "Prospect" },
    { value: "inactive", label: "Inactive" },
  ];

  const sourceOptions = [
    { value: "all", label: "All Sources" },
    { value: "website", label: "Website" },
    { value: "referral", label: "Referral" },
    { value: "social", label: "Social Media" },
    { value: "advertising", label: "Advertising" },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || client.status === selectedStatus;
    const matchesSource =
      selectedSource === "all" || client.source === selectedSource;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "name") {
      aValue = a.name;
      bValue = b.name;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedClients = sortedClients.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(sortedClients.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedClients.length === paginatedClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedClients.map((client) => client.id));
    }
  };

  const handleSelectClient = (clientId) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "prospect":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "website":
        return <Globe className="h-4 w-4" />;
      case "referral":
        return <Users className="h-4 w-4" />;
      case "social":
        return <MessageSquare className="h-4 w-4" />;
      case "advertising":
        return <Target className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  // Tooltip functions
  const toggleTooltip = (tooltipName) => {
    setTooltips((prev) => ({
      ...prev,
      [tooltipName]: !prev[tooltipName],
    }));
  };

  // Close tooltips when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(tooltipRefs).forEach((key) => {
        if (
          tooltipRefs[key].current &&
          !tooltipRefs[key].current.contains(event.target)
        ) {
          setTooltips((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Clients</h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1 ml-2">
              <span className="text-xs font-medium text-[#191C27]">
                {filteredClients.length} clients
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Search className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Upload className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-white text-[#848D6F] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-[#848D6F] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Zap className="h-4 w-4" />
              </button>
            </div>

            <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Client</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedClients.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedClients.length} client
                {selectedClients.length !== 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Send Email
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Export
                </button>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <div
                        onClick={handleSelectAll}
                        className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors ${
                          selectedClients.length === paginatedClients.length &&
                          paginatedClients.length > 0
                            ? "bg-[#848D6F] border-[#848D6F]"
                            : "border-gray-300 hover:border-[#848D6F]"
                        }`}
                      >
                        {selectedClients.length === paginatedClients.length &&
                          paginatedClients.length > 0 && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button
                      onClick={() => {
                        setSortBy("name");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Client</span>
                      {sortBy === "name" &&
                        (sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button
                      onClick={() => {
                        setSortBy("status");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Status</span>
                      {sortBy === "status" &&
                        (sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button
                      onClick={() => {
                        setSortBy("value");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Value</span>
                      {sortBy === "value" &&
                        (sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button
                      onClick={() => {
                        setSortBy("lastContact");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Last Contact</span>
                      {sortBy === "lastContact" &&
                        (sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button
                      onClick={() => {
                        setSortBy("nextFollowUp");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Next Follow-up</span>
                      {sortBy === "nextFollowUp" &&
                        (sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedClients.map((client) => (
                  <tr
                    key={client.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 rounded-l-lg">
                      <div className="flex items-center">
                        <div
                          onClick={() => handleSelectClient(client.id)}
                          className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors ${
                            selectedClients.includes(client.id)
                              ? "bg-[#848D6F] border-[#848D6F]"
                              : "border-gray-300 hover:border-[#848D6F]"
                          }`}
                        >
                          {selectedClients.includes(client.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="pl-3 pr-6 py-4">
                      <div className="flex flex-col justify-center">
                        <div className="text-sm font-medium text-gray-900">
                          {client.name}
                        </div>
                        <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
                          {client.email.length > 20
                            ? `${client.email.substring(0, 20)}...`
                            : client.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          client.status
                        )}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        ${client.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(client.lastContact).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(client.nextFollowUp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium rounded-r-lg">
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

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {(page - 1) * itemsPerPage + 1} to{" "}
              {Math.min(page * itemsPerPage, sortedClients.length)} of{" "}
              {sortedClients.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Marketing Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Email Marketing
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative" ref={tooltipRefs.emailMarketing}>
              <button
                onClick={() => toggleTooltip("emailMarketing")}
                className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
              >
                <Info className="h-5 w-5" />
              </button>
              {tooltips.emailMarketing && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                    <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                      <Mail className="h-3 w-3 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-[#191C27]">
                      Email Marketing
                    </h3>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-[#848D6F] leading-relaxed">
                      Create and send targeted email campaigns to engage your
                      clients and boost bookings. Choose from various campaign
                      types to reach different segments of your audience.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#191C27] text-base mb-2">
                    Seasonal Promotions
                  </h3>
                  <p className="text-sm text-[#848D6F] mb-3">
                    Send seasonal offers and special promotions to boost
                    bookings
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#848D6F]">
                      1,247 recipients
                    </span>
                    <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#191C27] text-base mb-2">
                    Loyalty Rewards
                  </h3>
                  <p className="text-sm text-[#848D6F] mb-3">
                    Reward loyal customers with exclusive discounts and offers
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#848D6F]">
                      892 recipients
                    </span>
                    <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#191C27] text-base mb-2">
                    Referral Program
                  </h3>
                  <p className="text-sm text-[#848D6F] mb-3">
                    Encourage referrals with special incentives for both parties
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#848D6F]">
                      1,156 recipients
                    </span>
                    <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#191C27] text-base mb-2">
                    Re-engagement
                  </h3>
                  <p className="text-sm text-[#848D6F] mb-3">
                    Reconnect with inactive clients to bring them back
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#848D6F]">
                      634 recipients
                    </span>
                    <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gift className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#191C27] text-base mb-2">
                    Birthday Offers
                  </h3>
                  <p className="text-sm text-[#848D6F] mb-3">
                    Send personalized birthday discounts and special offers
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#848D6F]">
                      156 recipients
                    </span>
                    <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#191C27] text-base mb-2">
                    New Services
                  </h3>
                  <p className="text-sm text-[#848D6F] mb-3">
                    Announce new services and special introductory pricing
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#848D6F]">
                      1,423 recipients
                    </span>
                    <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Opportunities Section */}
      <div className="bg-white border border-gray-200 rounded-lg mt-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Sales Opportunities
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative" ref={tooltipRefs.salesOpportunities}>
              <button
                onClick={() => toggleTooltip("salesOpportunities")}
                className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
              >
                <Info className="h-5 w-5" />
              </button>
              {tooltips.salesOpportunities && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                    <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                      <Target className="h-3 w-3 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-[#191C27]">
                      Sales Opportunities
                    </h3>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-[#848D6F] leading-relaxed">
                      Identify and follow up with clients who haven't booked
                      recently. These are potential opportunities to re-engage
                      and increase revenue.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#848D6F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">MJ</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Mike Johnson
                  </h3>
                  <p className="text-xs text-[#848D6F]">
                    Last booking: 3 months ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  High Value
                </span>
                <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                  View
                </button>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                  Skip
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#848D6F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">SL</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Sarah Lee
                  </h3>
                  <p className="text-xs text-[#848D6F]">
                    Last booking: 2 months ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Medium Value
                </span>
                <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                  View
                </button>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                  Skip
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#848D6F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">DW</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    David Wilson
                  </h3>
                  <p className="text-xs text-[#848D6F]">
                    Last booking: 4 months ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  High Value
                </span>
                <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                  View
                </button>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                  Skip
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#848D6F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">AB</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Amy Brown
                  </h3>
                  <p className="text-xs text-[#848D6F]">
                    Last booking: 1 month ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Regular Client
                </span>
                <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                  View
                </button>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                  Skip
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#848D6F] rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">RK</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Robert Kim
                  </h3>
                  <p className="text-xs text-[#848D6F]">
                    Last booking: 5 months ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Medium Value
                </span>
                <button className="text-xs bg-[#848D6F] text-white px-3 py-1 rounded-md hover:bg-[#191C27] transition-colors">
                  View
                </button>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors">
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
