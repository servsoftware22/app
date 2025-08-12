"use client";

import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Smile,
  MoreHorizontal,
  Settings,
  Zap,
  Brain,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share,
  Copy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  CreditCard,
  ArrowUpRight,
  RefreshCw,
  DollarSign,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AIAgentPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    insights: false,
    automation: false,
    analytics: false,
  });

  const [tooltips, setTooltips] = useState({
    chatbot: false,
    actions: false,
    insights: false,
    automation: false,
  });

  const tooltipRefs = {
    actions: useRef(null),
    insights: useRef(null),
    aiAutomation: useRef(null),
  };

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "👤",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content:
            "I understand your request. Let me analyze that and provide you with the best solution.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: "🤖",
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    {
      id: "schedule",
      title: "Schedule Appointment",
      description: "Book a new client appointment",
      icon: Calendar,
    },
    {
      id: "invoice",
      title: "Create Invoice",
      description: "Generate invoice for completed work",
      icon: FileText,
    },
    {
      id: "payment",
      title: "Process Payment",
      description: "Accept payment from client",
      icon: CreditCard,
    },
    {
      id: "client",
      title: "Add New Client",
      description: "Create new client profile",
      icon: Users,
    },
    {
      id: "service",
      title: "Add Service",
      description: "Create new service offering",
      icon: Settings,
    },
    {
      id: "report",
      title: "Generate Report",
      description: "Create business performance report",
      icon: BarChart3,
    },
  ];

  const aiInsights = [
    {
      id: 1,
      title: "Revenue Optimization",
      description:
        "Your revenue could increase by 23% with optimized pricing strategies",
      type: "opportunity",
      confidence: 89,
      impact: "High",
      category: "Revenue",
    },
    {
      id: 2,
      title: "Customer Retention",
      description:
        "Implementing a loyalty program could improve retention by 15%",
      type: "recommendation",
      confidence: 92,
      impact: "Medium",
      category: "Customers",
    },
    {
      id: 3,
      title: "Schedule Optimization",
      description: "Reducing buffer times could increase capacity by 18%",
      type: "efficiency",
      confidence: 85,
      impact: "High",
      category: "Operations",
    },
  ];

  const automationRules = [
    {
      id: 1,
      name: "Auto Follow-up",
      description: "Send follow-up emails 3 days after service completion",
      status: "active",
      triggers: 156,
      success: 94,
    },
    {
      id: 2,
      name: "Payment Reminders",
      description: "Send payment reminders for overdue invoices",
      status: "active",
      triggers: 89,
      success: 87,
    },
    {
      id: 3,
      name: "Review Requests",
      description: "Request reviews 2 days after service completion",
      status: "inactive",
      triggers: 0,
      success: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Section */}
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
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action)}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left group relative"
                >
                  <div className="w-8 h-8 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4 text-[#FF5E00]" />
                  </div>
                  <p className="text-sm font-medium text-[#191C27] group-hover:text-[#FF5E00] transition-colors">
                    {action.title}
                  </p>
                  <p className="text-xs text-[#848D6F] mt-1">
                    {action.description}
                  </p>
                  <div className="absolute top-3 right-3">
                    <ArrowUpRight className="h-4 w-4 text-[#848D6F] group-hover:text-[#FF5E00] transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">AI Insights</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Business Optimization */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <span className="text-xs font-medium text-[#FF5E00] bg-[#FF5E00]/10 px-2 py-1 rounded-full">
                  High Impact
                </span>
              </div>
              <h3 className="font-medium text-[#191C27] mb-2">
                Business Optimization
              </h3>
              <p className="text-sm text-[#848D6F] mb-4">
                AI analysis suggests 23% efficiency improvement in scheduling
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#848D6F]">Confidence</span>
                <span className="text-sm font-medium text-[#191C27]">94%</span>
              </div>
            </div>

            {/* Customer Insights */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <span className="text-xs font-medium text-[#FF5E00] bg-[#FF5E00]/10 px-2 py-1 rounded-full">
                  New
                </span>
              </div>
              <h3 className="font-medium text-[#191C27] mb-2">
                Customer Insights
              </h3>
              <p className="text-sm text-[#848D6F] mb-4">
                Peak booking times identified: 2-4 PM weekdays
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#848D6F]">Accuracy</span>
                <span className="text-sm font-medium text-[#191C27]">89%</span>
              </div>
            </div>

            {/* Revenue Prediction */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#FF5E00]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-[#FF5E00]" />
                </div>
                <span className="text-xs font-medium text-[#FF5E00] bg-[#FF5E00]/10 px-2 py-1 rounded-full">
                  Trending
                </span>
              </div>
              <h3 className="font-medium text-[#191C27] mb-2">
                Revenue Prediction
              </h3>
              <p className="text-sm text-[#848D6F] mb-4">
                Expected 15% revenue increase next quarter
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#848D6F]">Reliability</span>
                <span className="text-sm font-medium text-[#191C27]">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Automation Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#191C27] rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium text-[#191C27]">
              AI Automation Settings
            </h2>
          </div>
          <div className="relative" ref={tooltipRefs.aiAutomation}>
            <button
              onClick={() => toggleTooltip("aiAutomation")}
              className="p-2 text-[#848D6F] hover:text-[#191C27] transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            {tooltips.aiAutomation && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <div className="w-5 h-5 bg-[#191C27] rounded flex items-center justify-center flex-shrink-0">
                    <Settings className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-[#191C27]">
                    AI Automation Settings
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#848D6F] leading-relaxed">
                    Configure your AI automation rules and preferences to
                    streamline your business processes.
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
                  <MessageSquare className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Communication Automation
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
                  <span className="text-[#191C27]">Automated Responses</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Email Auto-Replies</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">SMS Notifications</span>
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
                  <Calendar className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Scheduling Automation
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
                  <span className="text-[#191C27]">Smart Scheduling</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Auto Reminders</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">24h before</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Conflict Resolution</span>
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
                  <CreditCard className="h-5 w-5 text-[#FF5E00]" />
                  <h3 className="font-medium text-[#191C27] text-base">
                    Payment Automation
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
                    Auto Invoice Generation
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Disabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">Payment Reminders</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848D6F]">Enabled</span>
                    <button className="p-1 text-[#848D6F] hover:text-[#191C27] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-[#191C27]">
                    Auto Payment Processing
                  </span>
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
        </div>
      </div>
    </div>
  );
}
