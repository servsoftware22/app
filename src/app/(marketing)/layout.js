"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Grid3X3,
  Globe,
  Users,
  Calendar,
  BarChart3,
  CreditCard,
  Settings,
  MessageSquare,
  Wrench,
  Droplets,
  Zap,
  Scissors,
  Dumbbell,
  Camera,
  Car,
  Building2,
  ArrowRight,
  Bot,
  Mail,
  Phone,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authAPI } from "@/lib/api";

export default function MarketingLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isOwner: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.checkAuth();
        setAuthStatus(response);
      } catch (error) {
        console.error("Error checking auth:", error);
        setAuthStatus({ isAuthenticated: false, isOwner: false });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const solutionsItems = [
    {
      name: "Websites",
      description: "Build stunning websites that convert visitors",
      icon: <Globe className="h-5 w-5" />,
      href: "/solutions/websites",
    },
    {
      name: "Client CRM",
      description: "Manage client relationships like a pro",
      icon: <Users className="h-5 w-5" />,
      href: "/solutions/crm",
    },
    {
      name: "Scheduling",
      description: "Book appointments with ease and efficiency",
      icon: <Calendar className="h-5 w-5" />,
      href: "/solutions/scheduling",
    },
    {
      name: "Marketing",
      description: "Grow your business with smart marketing tools",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/solutions/marketing",
    },
    {
      name: "Payments",
      description: "Get paid faster with secure payment processing",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/solutions/payments",
    },
    {
      name: "Team Management",
      description: "Manage your team like a professional leader",
      icon: <Settings className="h-5 w-5" />,
      href: "/solutions/team",
    },
    {
      name: "Analytics",
      description: "Make data-driven decisions with insights",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/solutions/analytics",
    },
    {
      name: "AI Agent",
      description: "Automate customer service with intelligent AI",
      icon: <Bot className="h-5 w-5" />,
      href: "/solutions/ai-agent",
    },
  ];

  const industriesItems = [
    {
      name: "General Contractors",
      icon: <Building2 className="h-5 w-5" />,
      href: "/industries/contractors",
    },
    {
      name: "HVAC Technicians",
      icon: <Wrench className="h-5 w-5" />,
      href: "/industries/hvac",
    },
    {
      name: "Plumbers",
      icon: <Droplets className="h-5 w-5" />,
      href: "/industries/plumbers",
    },
    {
      name: "Electricians",
      icon: <Zap className="h-5 w-5" />,
      href: "/industries/electricians",
    },
    {
      name: "Landscapers",
      icon: <Globe className="h-5 w-5" />,
      href: "/industries/landscapers",
    },
    {
      name: "Cleaning Services",
      icon: <Settings className="h-5 w-5" />,
      href: "/industries/cleaning",
    },
    {
      name: "Barbers",
      icon: <Scissors className="h-5 w-5" />,
      href: "/industries/barbers",
    },
    {
      name: "Salons",
      icon: <Scissors className="h-5 w-5" />,
      href: "/industries/salons",
    },
    {
      name: "Personal Trainers",
      icon: <Dumbbell className="h-5 w-5" />,
      href: "/industries/trainers",
    },
    {
      name: "Photographers",
      icon: <Camera className="h-5 w-5" />,
      href: "/industries/photographers",
    },
    {
      name: "Mobile Detailers",
      icon: <Car className="h-5 w-5" />,
      href: "/industries/detailers",
    },
    {
      name: "Any Other Service",
      icon: <Settings className="h-5 w-5" />,
      href: "/industries/other",
    },
  ];

  // Render the appropriate button based on auth status
  const renderAuthButton = () => {
    if (isLoading) {
      return (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#FF5E00] mr-2" />
          <div className="text-gray-500 text-sm">Loading</div>
        </div>
      );
    }

    if (authStatus.isAuthenticated && authStatus.isOwner) {
      return (
        <Link
          href="/dashboard"
          className="bg-[#ff5500] hover:bg-[#ff4400] text-white px-4 py-3 rounded-md text-md font-semibold transition-all duration-300 ease-in-out ml-2 leading-none"
          onClick={() => setActiveDropdown(null)}
        >
          Dashboard
        </Link>
      );
    }

    return (
      <Link
        href="/auth/signup"
        className="bg-[#ff5500] hover:bg-[#ff4400] text-white px-6 py-3 rounded-md text-md font-semibold transition-all duration-300 ease-in-out ml-2 leading-none"
        onClick={() => setActiveDropdown(null)}
      >
        Start for free
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Top Banner - Zapier Style */}
      {isBannerVisible && (
        <div className="bg-[#191C27] text-white py-2 px-4 relative font-fustat">
          <div className="w-full flex items-center justify-between">
            <span className="text-sm font-medium">
              ⚡ From concept to launch—see what ToolPage can really do. Start
              your free trial today.
            </span>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@toolpage.io</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">650-880-2099</span>
              </div>
              <button
                onClick={() => setIsBannerVisible(false)}
                className="text-white hover:text-gray-200 transition-colors ml-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 font-fustat">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setActiveDropdown(null)}
              >
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
            </div>

            {/* Right: Navigation and Auth Button */}
            <div
              className="hidden md:flex items-center space-x-2 ml-auto"
              ref={dropdownRef}
            >
              {/* Solutions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className="text-[#191C27] hover:text-[#ff5500] px-2 py-2 rounded-md text-md font-medium flex items-center"
                >
                  Products
                  <div className="relative w-3 h-3 ml-1">
                    <motion.div
                      animate={{
                        rotate: activeDropdown === "solutions" ? 180 : 0,
                      }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transformOrigin: "50% 50%" }}
                    >
                      <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {activeDropdown === "solutions" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[32rem] bg-white rounded-lg shadow-lg border border-gray-200 p-6"
                    >
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {solutionsItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="text-[#ff5500] mr-3 mt-0.5">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-[#191C27] mb-1">
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500 leading-relaxed">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Links */}
                      <div className="border-t border-gray-200 pt-4 px-3">
                        <div className="flex items-center space-x-6">
                          <Link
                            href="/how-it-works"
                            className="flex items-center text-sm text-[#FF5E00] hover:text-[#FF4A00] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            How It Works
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                          <Link
                            href="/blog"
                            className="flex items-center text-sm text-[#FF5E00] hover:text-[#FF4A00] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Blog
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                          <Link
                            href="/about"
                            className="flex items-center text-sm text-[#FF5E00] hover:text-[#FF4A00] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            About
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                          <Link
                            href="/contact"
                            className="flex items-center text-sm text-[#FF5E00] hover:text-[#FF4A00] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Contact
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("industries")}
                  className="text-[#191C27] hover:text-[#ff5500] px-2 py-2 rounded-md text-md font-medium flex items-center"
                >
                  Industries
                  <div className="relative w-3 h-3 ml-1">
                    <motion.div
                      animate={{
                        rotate: activeDropdown === "industries" ? 180 : 0,
                      }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transformOrigin: "50% 50%" }}
                    >
                      <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {activeDropdown === "industries" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[28rem] bg-white rounded-lg shadow-lg border border-gray-200 p-4"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {industriesItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="text-[#ff5500] mr-2">
                              {item.icon}
                            </div>
                            <span className="text-sm font-normal text-[#191C27]">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/templates"
                className="text-[#191C27] hover:text-[#ff5500] px-2 py-2 rounded-md text-md font-medium mr-3"
                onClick={() => setActiveDropdown(null)}
              >
                Templates
              </Link>

              <Link
                href="/pricing"
                className="text-[#191C27] hover:text-[#ff5500] px-2 py-2 rounded-md text-md font-medium mr-3"
                onClick={() => setActiveDropdown(null)}
              >
                Pricing
              </Link>

              <Link
                href="/support"
                className="text-[#191C27] hover:text-[#ff5500] px-2 py-2 rounded-md text-md font-medium mr-3"
                onClick={() => setActiveDropdown(null)}
              >
                Support
              </Link>

              {renderAuthButton()}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#191C27] hover:text-[#848D6F]"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="px-3 py-2">
                  <h4 className="text-xs font-semibold text-[#848D6F] uppercase tracking-wide mb-2">
                    Products
                  </h4>
                  <div className="space-y-1">
                    {solutionsItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-[#191C27] hover:text-[#848D6F] text-sm font-semibold"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="px-3 py-2">
                  <h4 className="text-xs font-semibold text-[#848D6F] uppercase tracking-wide mb-2">
                    Industries
                  </h4>
                  <div className="space-y-1">
                    {industriesItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-[#191C27] hover:text-[#848D6F] text-sm font-semibold"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/templates"
                  className="block px-3 py-2 text-[#191C27] hover:text-[#848D6F] text-sm font-semibold"
                >
                  Templates
                </Link>
                <Link
                  href="/pricing"
                  className="block px-3 py-2 text-[#191C27] hover:text-[#848D6F] text-sm font-semibold"
                >
                  Pricing
                </Link>
                <Link
                  href="/support"
                  className="block px-3 py-2 text-[#191C27] hover:text-[#848D6F] text-sm font-semibold"
                >
                  Support
                </Link>
                {authStatus.isAuthenticated && authStatus.isOwner ? (
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 bg-[#FF5E00] hover:bg-[#FF4A00] text-white text-sm font-semibold rounded-md transition-all duration-300 ease-in-out"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 bg-[#FF5E00] hover:bg-[#FF4A00] text-white text-sm font-semibold rounded-md transition-all duration-300 ease-in-out"
                  >
                    Start for free
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#191C27] text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            {/* ServicePro Newsletter Container */}
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Toolpage</h3>
              <p className="text-gray-400 text-sm mb-6">
                The complete platform for service professionals to grow their
                business.
              </p>
              {/* Newsletter Form */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Stay updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#FF5E00]"
                  />
                  <button className="px-4 py-2 bg-[#FF5E00] hover:bg-[#FF4A00] text-white font-semibold rounded-r-lg transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Link Columns Container */}
            <div className="md:w-3/4">
              <div className="flex gap-18 justify-end">
                <div>
                  <h4 className="text-sm font-semibold mb-4">Products</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link
                        href="/solutions/websites"
                        className="hover:text-white"
                      >
                        Websites
                      </Link>
                    </li>
                    <li>
                      <Link href="/solutions/crm" className="hover:text-white">
                        Client CRM
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/solutions/scheduling"
                        className="hover:text-white"
                      >
                        Scheduling
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/solutions/marketing"
                        className="hover:text-white"
                      >
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/solutions/payments"
                        className="hover:text-white"
                      >
                        Payments
                      </Link>
                    </li>
                    <li>
                      <Link href="/solutions/team" className="hover:text-white">
                        Team Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/solutions/analytics"
                        className="hover:text-white"
                      >
                        Analytics
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Industries</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link
                        href="/industries/contractors"
                        className="hover:text-white"
                      >
                        General Contractors
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/hvac"
                        className="hover:text-white"
                      >
                        HVAC Technicians
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/plumbers"
                        className="hover:text-white"
                      >
                        Plumbers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/electricians"
                        className="hover:text-white"
                      >
                        Electricians
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/landscapers"
                        className="hover:text-white"
                      >
                        Landscapers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/cleaning"
                        className="hover:text-white"
                      >
                        Cleaning Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/barbers"
                        className="hover:text-white"
                      >
                        Barbers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/industries/other"
                        className="hover:text-white"
                      >
                        Other Services
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Templates</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link
                        href="/templates/websites"
                        className="hover:text-white"
                      >
                        Website Templates
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/templates/landing-pages"
                        className="hover:text-white"
                      >
                        Landing Pages
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/templates/forms"
                        className="hover:text-white"
                      >
                        Contact Forms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/templates/portfolios"
                        className="hover:text-white"
                      >
                        Portfolios
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Account</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link href="/auth/signup" className="hover:text-white">
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link href="/auth/login" className="hover:text-white">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:text-white">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="hover:text-white">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-white">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-white">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="hover:text-white">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-white">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <Link href="/about" className="hover:text-white">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-white">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="hover:text-white">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2025 ServicePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
