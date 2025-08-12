"use client";

import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Upload,
  Settings,
  ChevronDown,
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
  Activity,
  Users,
  Target,
  Zap,
  Globe,
  Info,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Star,
  MessageSquare,
  Edit,
  Trash2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Tooltip state
  const [tooltips, setTooltips] = useState({
    quoteAnalytics: false,
    recentQuotes: false,
  });

  // Tooltip refs
  const tooltipRefs = {
    quoteAnalytics: useRef(null),
    recentQuotes: useRef(null),
  };

  // Mock data for quotes
  const quotes = [
    {
      id: 1,
      quoteNumber: "QT-2024-001",
      clientName: "Sarah Johnson",
      clientEmail: "sarah.johnson@email.com",
      amount: 250.0,
      currency: "USD",
      status: "sent",
      date: "2024-01-15T10:30:00Z",
      dueDate: "2024-01-30T10:30:00Z",
      description: "Website Design Services",
      category: "web_design",
      validUntil: "2024-02-15T10:30:00Z",
      notes: "Initial consultation completed",
    },
    {
      id: 2,
      quoteNumber: "QT-2024-002",
      clientName: "Mike Chen",
      clientEmail: "mike.chen@techcorp.com",
      amount: 150.0,
      currency: "USD",
      status: "accepted",
      date: "2024-01-14T14:20:00Z",
      dueDate: "2024-01-29T14:20:00Z",
      description: "Logo Design Package",
      category: "design",
      validUntil: "2024-02-14T14:20:00Z",
      notes: "Client approved design concept",
    },
    {
      id: 3,
      quoteNumber: "QT-2024-003",
      clientName: "Lisa Rodriguez",
      clientEmail: "lisa.rodriguez@startup.com",
      amount: 500.0,
      currency: "USD",
      status: "expired",
      date: "2024-01-10T09:15:00Z",
      dueDate: "2024-01-25T09:15:00Z",
      description: "Brand Identity Package",
      category: "branding",
      validUntil: "2024-02-10T09:15:00Z",
      notes: "Follow up required",
    },
    {
      id: 4,
      quoteNumber: "QT-2024-004",
      clientName: "David Wilson",
      clientEmail: "david.wilson@agency.com",
      amount: 800.0,
      currency: "USD",
      status: "draft",
      date: "2024-01-12T16:45:00Z",
      dueDate: "2024-01-27T16:45:00Z",
      description: "Marketing Campaign",
      category: "marketing",
      validUntil: "2024-02-12T16:45:00Z",
      notes: "Pending client requirements",
    },
    {
      id: 5,
      quoteNumber: "QT-2024-005",
      clientName: "Emma Davis",
      clientEmail: "emma.davis@consulting.com",
      amount: 300.0,
      currency: "USD",
      status: "sent",
      date: "2024-01-13T11:30:00Z",
      dueDate: "2024-01-28T11:30:00Z",
      description: "SEO Optimization",
      category: "seo",
      validUntil: "2024-02-13T11:30:00Z",
      notes: "Client requested additional services",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "declined":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
        if (
          tooltips[section] &&
          ref.current &&
          !ref.current.contains(event.target)
        ) {
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
  }, [tooltips]);

  return (
    <div className="space-y-6">
      {/* Quote Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Quote Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.quoteAnalytics}>
            <button
              onClick={() => toggleTooltip("quoteAnalytics")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.quoteAnalytics && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Quote Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track your quote performance, conversion rates, and revenue
                    insights.
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
                  <FileText className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Quotes
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    24
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12%
                    </p>
                    <p className="text-xs text-[#848D6F]">from last month</p>
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
                    Accepted
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">8</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +5%
                    </p>
                    <p className="text-xs text-[#848D6F]">from last month</p>
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
                    Pending
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    12
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-red-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -3%
                    </p>
                    <p className="text-xs text-[#848D6F]">from last month</p>
                  </div>
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
                    Total Value
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    $12,450
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +18%
                    </p>
                    <p className="text-xs text-[#848D6F]">from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Quotes Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Recent Quotes
            </h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1 ml-2">
              <span className="text-xs font-medium text-[#191C27]">
                {quotes.length} quotes
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
            </div>
            <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Quote</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 rounded border-gray-300"></div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Quote</span>
                      <SortDesc className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Client</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Amount</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Status</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Due Date</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 rounded-l-lg">
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 rounded border-gray-300"></div>
                      </div>
                    </td>
                    <td className="pl-3 pr-6 py-4">
                      <div className="flex flex-col justify-center">
                        <div className="text-sm font-medium text-gray-900">
                          {quote.quoteNumber}
                        </div>
                        <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
                          {quote.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-[#848D6F] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {quote.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {quote.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {quote.clientEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${quote.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          quote.status
                        )}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(quote.dueDate).toLocaleDateString()}
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
                          <Download className="h-4 w-4" />
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
