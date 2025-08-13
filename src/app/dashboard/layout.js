"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { dashboardAPI } from "@/lib/api";
import {
  Home,
  Calendar,
  Users,
  Settings,
  FileText,
  Receipt,
  CreditCard,
  Bot,
  Puzzle,
  Globe,
  Search,
  HelpCircle,
  MoreHorizontal,
  Menu,
  X,
  LogOut,
  User,
  Plus,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Edit,
  Zap,
  Wrench,
  MessageSquare,
  Bell,
  Activity,
  Sparkles,
  Crown,
  Mail,
  Phone,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if user is authenticated
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          router.push("/auth/login");
          return;
        }

        // Get user data from secure API endpoint
        const { user: userData } = await dashboardAPI.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/auth/login");
        return;
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createDropdownOpen && !event.target.closest(".create-dropdown")) {
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
      id: "client",
      title: "New Client",
      description: "Create a new client profile",
      icon: Users,
    },
    {
      id: "service",
      title: "New Service",
      description: "Create a new service offering",
      icon: Settings,
    },
    {
      id: "team",
      title: "New Team Member",
      description: "Invite a new team member",
      icon: Users,
    },
    {
      id: "quote",
      title: "New Quote",
      description: "Create a professional quote",
      icon: FileText,
    },
    {
      id: "invoice",
      title: "New Invoice",
      description: "Generate a new invoice",
      icon: Receipt,
    },
  ];

  const handleCreateOption = (optionId) => {
    console.log(`Creating: ${optionId}`);
    setCreateDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500"></div>
      </div>
    );
  }

  // Determine setup mode based on users.onboarding.status.completed
  const needsSetup = user?.onboarding?.status?.completed !== true;

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Jobs", href: "/dashboard/jobs", icon: Wrench },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Requests", href: "/dashboard/requests", icon: MessageSquare },
  ];

  const websiteOptions = [
    {
      id: "website",
      title: "Website",
      description: "Manage your website",
      icon: Globe,
      href: "/dashboard/website",
    },
    {
      id: "editor",
      title: "Editor",
      description: "Edit website content and design",
      icon: Edit,
      href: "/dashboard/website/editor",
    },
    {
      id: "features",
      title: "Features",
      description: "Manage website features and functionality",
      icon: Zap,
      href: "/dashboard/website/features",
    },
    {
      id: "services",
      title: "Services",
      description: "Manage your service offerings",
      icon: FileText,
      href: "/dashboard/website/services",
    },
  ];

  const paymentOptions = [
    {
      id: "payments",
      title: "Payments",
      description: "Manage payments and transactions",
      icon: CreditCard,
      href: "/dashboard/payments",
    },
    {
      id: "quotes",
      title: "Quotes",
      description: "Create and manage quotes",
      icon: FileText,
      href: "/dashboard/quotes",
    },
    {
      id: "invoices",
      title: "Invoices",
      description: "Manage invoices and billing",
      icon: Receipt,
      href: "/dashboard/invoices",
    },
  ];

  const bottomNavigation = [
    { name: "My Team", href: "/dashboard/team", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
    { name: "AI Agent", href: "/dashboard/ai-agent", icon: Bot },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        {!needsSetup && (
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
        <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
          <Link href="/" className="flex items-center">
            <img
              src="/logos/ToolpageIcon.png"
              alt="Toolpage"
              className="h-6 mb-1 w-auto"
            />
            <span
              className="ml-2 text-xl font-semibold text-[#191C27]"
              style={{ fontFamily: "Fustat, sans-serif" }}
            >
              ToolPage
            </span>
          </Link>
          <div className="flex flex-1" />
          {needsSetup ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#848D6F]" />
                  <span className="hidden xl:inline text-sm text-black">
                    info@toolpage.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#848D6F]" />
                  <span className="hidden xl:inline text-sm text-black">
                    +1(650)880-2099
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-[#848D6F] text-white">
                Setup
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Activity className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Sparkles className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <HelpCircle className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button className="bg-[#FF5E00] hover:bg-[#FF4A00] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                <Crown className="h-4 w-4" />
                <span>Upgrade</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      {!needsSetup && (
        <div
          className={`fixed inset-0 z-50 lg:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white border-r border-gray-200">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
              <span className="text-lg font-semibold text-gray-900">
                ServicePro
              </span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
              <div className="create-dropdown">
                <button
                  onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                  className="w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md bg-[#191C27] text-white hover:bg-[#191C27]/90 transition-colors"
                >
                  <div className="flex items-center">
                    <Plus className="mr-3 h-5 w-5" />
                    Create
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-white transition-transform duration-200 ${
                      createDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Dropdown Options */}
                {createDropdownOpen && (
                  <div className="mt-1 bg-gray-100 rounded-md overflow-hidden py-2 px-3">
                    {createOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleCreateOption(option.id)}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-[#848D6F] transition-colors group rounded-md"
                        >
                          <Icon className="h-4 w-4 text-[#191C27] group-hover:text-white flex-shrink-0" />
                          <span className="font-medium text-[#191C27] group-hover:text-white text-sm transition-colors">
                            {option.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-[#848D6F] text-white"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${isActive ? "text-white" : ""}`}
                    />
                    {item.name}
                  </Link>
                );
              })}

              {/* Website Section */}
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Website
                </div>
                {websiteOptions.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[#848D6F] text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Payments Section */}
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payments
                </div>
                {paymentOptions.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[#848D6F] text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Navigation */}
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tools
                </div>
                {bottomNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[#848D6F] text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className="border-t border-gray-200 p-4 flex-shrink-0 mt-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-[#848D6F] rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    <Mail className="h-3 w-3 inline-block mr-1" /> {user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    <Phone className="h-3 w-3 inline-block mr-1" />{" "}
                    {user?.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-3 w-full bg-gray-50 hover:bg-gray-100 text-[#191C27] px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {!needsSetup && (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-56 lg:flex-col lg:top-16">
          <div className="flex flex-col h-full bg-white border-r border-gray-200">
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto min-h-0">
              <div className="create-dropdown">
                <button
                  onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                  className="w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md bg-[#191C27] text-white hover:bg-[#191C27]/90 transition-colors"
                >
                  <div className="flex items-center">
                    <Plus className="mr-3 h-5 w-5" />
                    Create
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-white transition-transform duration-200 ${
                      createDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-[#848D6F] text-white"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${isActive ? "text-white" : ""}`}
                    />
                    {item.name}
                  </Link>
                );
              })}

              {/* Website Section */}
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Website
                </div>
                {websiteOptions.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[#848D6F] text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Payments Section */}
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payments
                </div>
                {paymentOptions.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[#848D6F] text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Navigation */}
              <div className="pt-4">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tools
                </div>
                {bottomNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-[#848D6F] text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-[#848D6F] rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    <Mail className="h-3 w-3 inline-block mr-1" /> {user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    <Phone className="h-3 w-3 inline-block mr-1" />{" "}
                    {user?.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-3 w-full bg-gray-50 hover:bg-gray-100 text-[#191C27] px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={needsSetup ? "" : "lg:pl-56"}>
        <main className={needsSetup ? "" : "py-6"}>
          {needsSetup ? (
            <div className="min-h-[calc(100vh-4rem)]">{children}</div>
          ) : (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          )}
        </main>
      </div>

      {/* Create Modal */}
      {/* The CreateModal component is removed as per the edit hint. */}
    </div>
  );
}
