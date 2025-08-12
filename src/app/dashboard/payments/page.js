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

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Tooltip state
  const [tooltips, setTooltips] = useState({
    paymentAnalytics: false,
    recentPayments: false,
  });

  // Tooltip refs
  const tooltipRefs = {
    paymentAnalytics: useRef(null),
    recentPayments: useRef(null),
  };

  // Mock data for payments
  const payments = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      clientEmail: "sarah.johnson@email.com",
      amount: 250.0,
      currency: "USD",
      status: "completed",
      method: "credit_card",
      methodDetails: "Visa ending in 4242",
      date: "2024-01-15T10:30:00Z",
      invoiceNumber: "INV-2024-001",
      description: "Website Design Services",
      category: "web_design",
      fees: 7.5,
      netAmount: 242.5,
      refunded: false,
      notes: "Payment received on time",
    },
    {
      id: 2,
      clientName: "Mike Chen",
      clientEmail: "mike.chen@techcorp.com",
      amount: 150.0,
      currency: "USD",
      status: "pending",
      method: "bank_transfer",
      methodDetails: "Bank Transfer",
      date: "2024-01-14T14:20:00Z",
      invoiceNumber: "INV-2024-002",
      description: "SEO Optimization",
      category: "marketing",
      fees: 4.5,
      netAmount: 145.5,
      refunded: false,
      notes: "Awaiting bank confirmation",
    },
    {
      id: 3,
      clientName: "Emily Rodriguez",
      clientEmail: "emily.rodriguez@startup.com",
      amount: 500.0,
      currency: "USD",
      status: "completed",
      method: "paypal",
      methodDetails: "PayPal",
      date: "2024-01-13T09:15:00Z",
      invoiceNumber: "INV-2024-003",
      description: "Full Website Package",
      category: "web_design",
      fees: 15.0,
      netAmount: 485.0,
      refunded: false,
      notes: "Premium package payment",
    },
    {
      id: 4,
      clientName: "David Kim",
      clientEmail: "david.kim@agency.com",
      amount: 75.0,
      currency: "USD",
      status: "failed",
      method: "credit_card",
      methodDetails: "Mastercard ending in 5555",
      date: "2024-01-12T16:45:00Z",
      invoiceNumber: "INV-2024-004",
      description: "Logo Design",
      category: "design",
      fees: 2.25,
      netAmount: 72.75,
      refunded: false,
      notes: "Card declined - insufficient funds",
    },
    {
      id: 5,
      clientName: "Lisa Thompson",
      clientEmail: "lisa.thompson@consulting.com",
      amount: 300.0,
      currency: "USD",
      status: "completed",
      method: "credit_card",
      methodDetails: "American Express ending in 1234",
      date: "2024-01-11T11:30:00Z",
      invoiceNumber: "INV-2024-005",
      description: "Brand Identity Package",
      category: "design",
      fees: 9.0,
      netAmount: 291.0,
      refunded: false,
      notes: "Corporate client payment",
    },
    {
      id: 6,
      clientName: "Alex Morgan",
      clientEmail: "alex.morgan@freelance.com",
      amount: 125.0,
      currency: "USD",
      status: "refunded",
      method: "paypal",
      methodDetails: "PayPal",
      date: "2024-01-10T13:20:00Z",
      invoiceNumber: "INV-2024-006",
      description: "Social Media Management",
      category: "marketing",
      fees: 3.75,
      netAmount: 121.25,
      refunded: true,
      notes: "Client requested refund - service not needed",
    },
  ];

  // Payment analytics data
  const paymentAnalytics = {
    totalRevenue: {
      value: "$12,450",
      change: "+12%",
      trend: "up",
      period: "This month",
      previousPeriod: "$11,100",
    },
    averagePayment: {
      value: "$207.50",
      change: "+8%",
      trend: "up",
      period: "This month",
      previousPeriod: "$192.00",
    },
    paymentSuccess: {
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      period: "This month",
      previousPeriod: "92.1%",
    },
    pendingPayments: {
      value: "$1,250",
      change: "-5%",
      trend: "down",
      period: "This month",
      previousPeriod: "$1,315",
    },
  };

  // Payment method distribution
  const paymentMethods = [
    {
      method: "Credit Card",
      percentage: 65,
      amount: "$8,092.50",
      color: "bg-blue-500",
    },
    {
      method: "PayPal",
      percentage: 20,
      amount: "$2,490.00",
      color: "bg-blue-600",
    },
    {
      method: "Bank Transfer",
      percentage: 12,
      amount: "$1,494.00",
      color: "bg-blue-700",
    },
    { method: "Other", percentage: 3, amount: "$373.50", color: "bg-gray-400" },
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      type: "payment_received",
      message: "Payment received from Sarah Johnson",
      amount: "$250.00",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "payment_failed",
      message: "Payment failed for David Kim",
      amount: "$75.00",
      time: "4 hours ago",
      status: "failed",
    },
    {
      id: 3,
      type: "refund_processed",
      message: "Refund processed for Alex Morgan",
      amount: "$125.00",
      time: "1 day ago",
      status: "refunded",
    },
    {
      id: 4,
      type: "payment_received",
      message: "Payment received from Lisa Thompson",
      amount: "$300.00",
      time: "2 days ago",
      status: "completed",
    },
  ];

  const handleSelectAll = () => {
    if (selectedPayments.length === payments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(payments.map((payment) => payment.id));
    }
  };

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4" />;
      case "paypal":
        return <Globe className="h-4 w-4" />;
      case "bank_transfer":
        return <Building className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "payment_received":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "payment_failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "refund_processed":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
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

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || payment.status === selectedStatus;
    const matchesMethod =
      selectedMethod === "all" || payment.method === selectedMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "date":
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case "amount":
        aValue = a.amount;
        bValue = b.amount;
        break;
      case "client":
        aValue = a.clientName;
        bValue = b.clientName;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedPayments = sortedPayments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Payment Analytics Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Payment Analytics
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.paymentAnalytics}>
            <button
              onClick={() => toggleTooltip("paymentAnalytics")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.paymentAnalytics && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Payment Analytics
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Track your payment performance with key metrics including
                    total revenue, average payment amounts, success rates, and
                    pending payments.
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
                    Total Revenue
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {paymentAnalytics.totalRevenue.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {paymentAnalytics.totalRevenue.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {paymentAnalytics.totalRevenue.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#848D6F] mb-1">
                    Average Payment
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {paymentAnalytics.averagePayment.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {paymentAnalytics.averagePayment.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {paymentAnalytics.averagePayment.period}
                    </p>
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
                    Success Rate
                  </p>
                  <p className="text-xl font-semibold text-[#191C27] mb-1">
                    {paymentAnalytics.paymentSuccess.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FF5E00] flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {paymentAnalytics.paymentSuccess.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {paymentAnalytics.paymentSuccess.period}
                    </p>
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
                    {paymentAnalytics.pendingPayments.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-red-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      {paymentAnalytics.pendingPayments.change}
                    </p>
                    <p className="text-xs text-[#848D6F]">
                      {paymentAnalytics.pendingPayments.period}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Recent Payments
            </h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1 ml-2">
              <span className="text-xs font-medium text-[#191C27]">
                {filteredPayments.length} payments
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>

            <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Payment</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#848D6F] focus:border-[#848D6F]"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#848D6F] focus:border-[#848D6F]"
              >
                <option value="all">All Methods</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#848D6F] focus:border-[#848D6F]"
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="amount-asc">Amount (Low to High)</option>
                <option value="client-asc">Client (A-Z)</option>
                <option value="client-desc">Client (Z-A)</option>
              </select>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="p-6">
          {/* Payments Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <div
                        onClick={handleSelectAll}
                        className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors ${
                          selectedPayments.length === paginatedPayments.length
                            ? "bg-[#848D6F] border-[#848D6F]"
                            : "border-gray-300 hover:border-[#848D6F]"
                        }`}
                      >
                        {selectedPayments.length ===
                          paginatedPayments.length && (
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
                        setSortBy("client");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Client</span>
                      {sortBy === "client" &&
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
                        setSortBy("amount");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Amount</span>
                      {sortBy === "amount" &&
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
                        setSortBy("date");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Date</span>
                      {sortBy === "date" &&
                        (sortOrder === "asc" ? (
                          <SortAsc className="h-3 w-3" />
                        ) : (
                          <SortDesc className="h-3 w-3" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 rounded-l-lg">
                      <div className="flex items-center">
                        <div
                          onClick={() => handleSelectPayment(payment.id)}
                          className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors ${
                            selectedPayments.includes(payment.id)
                              ? "bg-[#848D6F] border-[#848D6F]"
                              : "border-gray-300 hover:border-[#848D6F]"
                          }`}
                        >
                          {selectedPayments.includes(payment.id) && (
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
                          {payment.clientName}
                        </div>
                        <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
                          {payment.clientEmail.length > 20
                            ? `${payment.clientEmail.substring(0, 20)}...`
                            : payment.clientEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Net: ${payment.netAmount.toFixed(2)}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {payment.invoiceNumber}
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
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {(page - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(page * itemsPerPage, sortedPayments.length)} of{" "}
                  {sortedPayments.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payouts Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Payouts</h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1 ml-2">
              <span className="text-xs font-medium text-[#191C27]">
                3 pending
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
              <span>Request Payout</span>
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
                      <span>Amount</span>
                      <SortDesc className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Status</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Date</span>
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 rounded-l-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 rounded border-gray-300"></div>
                    </div>
                  </td>
                  <td className="pl-3 pr-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      $2,450.00
                    </div>
                    <div className="text-xs text-gray-500">
                      From 15 payments
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Jan 15, 2024
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Bank Account ****1234
                  </td>
                  <td className="px-6 py-4 text-sm font-medium rounded-r-lg">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 rounded-l-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 rounded border-gray-300"></div>
                    </div>
                  </td>
                  <td className="pl-3 pr-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      $1,850.00
                    </div>
                    <div className="text-xs text-gray-500">
                      From 12 payments
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Jan 8, 2024
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Bank Account ****1234
                  </td>
                  <td className="px-6 py-4 text-sm font-medium rounded-r-lg">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-[#848D6F] hover:text-[#191C27] transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoices Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">Invoices</h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1 ml-2">
              <span className="text-xs font-medium text-[#191C27]">
                24 invoices
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
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 rounded-l-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 rounded border-gray-300"></div>
                    </div>
                  </td>
                  <td className="pl-3 pr-6 py-4">
                    <div className="flex flex-col justify-center">
                      <div className="text-sm font-medium text-gray-900">
                        INV-2024-001
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
                        Website Design
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-xs text-gray-500">
                      sarah.johnson@email.com
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      $250.00
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Jan 15, 2024
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
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 rounded-l-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 rounded border-gray-300"></div>
                    </div>
                  </td>
                  <td className="pl-3 pr-6 py-4">
                    <div className="flex flex-col justify-center">
                      <div className="text-sm font-medium text-gray-900">
                        INV-2024-002
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full inline-block max-w-[120px] truncate">
                        SEO Optimization
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      Mike Chen
                    </div>
                    <div className="text-xs text-gray-500">
                      mike.chen@techcorp.com
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">
                      $150.00
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Jan 20, 2024
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
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Settings Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              Payment Settings
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.paymentAnalytics}>
            <button
              onClick={() => toggleTooltip("paymentAnalytics")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.paymentAnalytics && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Settings className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    Payment Settings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Configure your payment methods, payout preferences, and
                    invoice settings to streamline your payment workflow.
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
                  <CreditCard className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Payment Methods
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
                  <span className="text-[#191C27]">Credit Card Processing</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">PayPal Integration</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Bank Transfer</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
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
                  <DollarSign className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Payout Settings
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
                  <span className="text-[#191C27]">Auto Payouts</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Weekly</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Minimum Payout</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">$50.00</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Payout Account</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">
                      Bank Account ****1234
                    </span>
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
        </div>
      </div>
    </div>
  );
}
