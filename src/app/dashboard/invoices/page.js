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
  Receipt,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Tooltip state
  const [tooltips, setTooltips] = useState({
    invoiceAnalytics: false,
    recentInvoices: false,
  });

  // Tooltip refs
  const tooltipRefs = {
    invoiceAnalytics: useRef(null),
    recentInvoices: useRef(null),
  };

  // Mock data for invoices
  const invoices = [
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      clientName: "Sarah Johnson",
      clientEmail: "sarah.johnson@email.com",
      amount: 250.0,
      currency: "USD",
      status: "paid",
      date: "2024-01-15T10:30:00Z",
      dueDate: "2024-01-30T10:30:00Z",
      description: "Website Design Services",
      category: "web_design",
      paidDate: "2024-01-20T10:30:00Z",
      notes: "Payment received on time",
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      clientName: "Mike Chen",
      clientEmail: "mike.chen@techcorp.com",
      amount: 150.0,
      currency: "USD",
      status: "overdue",
      date: "2024-01-14T14:20:00Z",
      dueDate: "2024-01-29T14:20:00Z",
      description: "Logo Design Package",
      category: "design",
      paidDate: null,
      notes: "Payment reminder sent",
    },
    {
      id: 3,
      invoiceNumber: "INV-2024-003",
      clientName: "Lisa Rodriguez",
      clientEmail: "lisa.rodriguez@startup.com",
      amount: 500.0,
      currency: "USD",
      status: "pending",
      date: "2024-01-10T09:15:00Z",
      dueDate: "2024-02-10T09:15:00Z",
      description: "Brand Identity Package",
      category: "branding",
      paidDate: null,
      notes: "Invoice sent to client",
    },
    {
      id: 4,
      invoiceNumber: "INV-2024-004",
      clientName: "David Wilson",
      clientEmail: "david.wilson@agency.com",
      amount: 800.0,
      currency: "USD",
      status: "draft",
      date: "2024-01-12T16:45:00Z",
      dueDate: "2024-01-27T16:45:00Z",
      description: "Marketing Campaign",
      category: "marketing",
      paidDate: null,
      notes: "Draft invoice - pending approval",
    },
    {
      id: 5,
      invoiceNumber: "INV-2024-005",
      clientName: "Emma Davis",
      clientEmail: "emma.davis@consulting.com",
      amount: 300.0,
      currency: "USD",
      status: "paid",
      date: "2024-01-13T11:30:00Z",
      dueDate: "2024-01-28T11:30:00Z",
      description: "SEO Optimization",
      category: "seo",
      paidDate: "2024-01-25T11:30:00Z",
      notes: "Payment received early",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "cancelled":
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
      {/* Invoice Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Invoice Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.invoiceAnalytics}>
            <button
              onClick={() => toggleTooltip("invoiceAnalytics")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.invoiceAnalytics && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Invoice Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track your invoice performance, payment rates, and revenue
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
                  <Receipt className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Total Invoices
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    24
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +15%
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
                    Paid
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    18
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8%
                    </p>
                    <p className="text-xs text-[#848D6F]">from last month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Overdue
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">3</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-red-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -2
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
                    Total Revenue
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    $15,750
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +22%
                    </p>
                    <p className="text-xs text-[#848D6F]">from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Recent Invoices
            </h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1 ml-2">
              <span className="text-xs font-medium text-[#191C27]">
                {invoices.length} invoices
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
              <span>New Invoice</span>
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
                      <span>Invoice</span>
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
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
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
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
                          {invoice.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-[#848D6F] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {invoice.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invoice.clientEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(invoice.dueDate).toLocaleDateString()}
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
