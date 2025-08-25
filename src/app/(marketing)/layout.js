"use client";

import Link from "next/link";
import {
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
  Shield,
  BookOpen,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MarketingLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

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

  // Handle scroll events for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

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
      description: "Build stunning websites that convert visitors into clients",
      icon: <Globe className="h-5 w-5" />,
      href: "/solutions/websites",
    },
    {
      name: "Client CRM",
      description: "Manage client relationships smoothly and efficiently",
      icon: <Users className="h-5 w-5" />,
      href: "/solutions/crm",
    },
    {
      name: "Scheduling",
      description: "Completely automate your business's scheduling process",
      icon: <Calendar className="h-5 w-5" />,
      href: "/solutions/scheduling",
    },
    {
      name: "Marketing",
      description:
        "Grow your business with smart and effective marketing tools",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/solutions/marketing",
    },
    {
      name: "Payments",
      description: "Get paid faster and easier with secure payment processing",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/solutions/payments",
    },
    {
      name: "Team Management",
      description: "Lead your team with tools for efficiency and productivity",
      icon: <Settings className="h-5 w-5" />,
      href: "/solutions/team",
    },
    {
      name: "Analytics",
      description: "Make data-driven decisions with insights and reports",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/solutions/analytics",
    },
    {
      name: "AI Agent",
      description: "Automate customer service and more with intelligent AI",
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

  const featuresItems = [
    {
      name: "Automation",
      icon: <Zap className="h-5 w-5" />,
      href: "/features/automation",
    },
    {
      name: "Integrations",
      icon: <Grid3X3 className="h-5 w-5" />,
      href: "/features/integrations",
    },
    {
      name: "Reporting",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/features/reporting",
    },
    {
      name: "Security",
      icon: <Shield className="h-5 w-5" />,
      href: "/features/security",
    },
    {
      name: "Mobile App",
      icon: <Settings className="h-5 w-5" />,
      href: "/features/mobile",
    },
    {
      name: "API Access",
      icon: <BookOpen className="h-5 w-5" />,
      href: "/features/api",
    },
  ];

  // Render the Start for free button
  const renderStartButton = () => {
    return (
      <Link
        href="/auth/signup"
        className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--primary)] hover:bg-[#FF7A33] text-white font-semibold rounded-lg text-base transition-colors lotto-button ml-2"
        onClick={() => setActiveDropdown(null)}
      >
        <span className="lotto-button-text">Start for free</span>
        <ArrowRight className="lotto-button-arrow ml-2 h-4 w-4 transform -rotate-45" />
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Top Banner - Zapier Style */}
      {isBannerVisible && (
        <div
          className="py-2 px-4 relative font-fustat transition-all duration-300 text-white z-30 hidden md:block"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          <div className="w-full flex items-center justify-between">
            <Link
              href="/auth/signup"
              className="flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <span className="text-sm font-normal text-link-underline">
                ⚡ The all-in-one platform for service professionals. Start your
                free trial today
              </span>
              <ArrowRight className="h-4 w-4 transform -rotate-45 transition-transform duration-300" />
            </Link>
            <div className="flex items-center space-x-6">
              <div className="hidden xl:flex items-center space-x-2">
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
      <nav
        className={`sticky top-0 z-[60] font-fustat transition-all duration-300 ${
          isScrolled ? "header-scrolled" : "header-transparent"
        }`}
        style={{
          backgroundColor: isScrolled ? "var(--neutral)" : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-18">
            {/* Left: Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setActiveDropdown(null)}
              >
                <img
                  src="/logos/ToolpageIcon.png"
                  alt="Toolpage"
                  className="h-7 mb-1 w-auto"
                />
                <span
                  className="ml-2 text-2xl font-semibold"
                  style={{
                    fontFamily: "Fustat, sans-serif",
                    color: "var(--text-dark)",
                  }}
                >
                  ToolPage
                </span>
              </Link>

              {/* Navigation Links */}
              <div
                className="hidden lg:flex items-center space-x-3"
                ref={dropdownRef}
              >
                {/* Solutions Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("solutions")}
                    className="pl-2 pr-0 py-2 text-base font-medium transition-colors flex items-center schedule-call-button"
                    style={{ color: "var(--text-dark)" }}
                  >
                    <span className="schedule-call-text">Products</span>
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
                        className="absolute top-full left-0 mt-2 w-[50rem] rounded-xl products-dropdown"
                      >
                        <div
                          className="products-dropdown-inner p-4 py-6"
                          style={{ backgroundColor: "var(--neutral)" }}
                        >
                          <div className="grid grid-cols-3 gap-3">
                            {solutionsItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-start p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer product-card"
                                style={{ backgroundColor: "var(--neutral)" }}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div
                                  className="mr-3 mt-0.5 product-card-icon transition-colors duration-300"
                                  style={{ color: "var(--secondary)" }}
                                >
                                  {item.icon}
                                </div>
                                <div className="flex-1">
                                  <div
                                    className="text-sm font-semibold mb-2 product-card-title text-link-underline"
                                    style={{ color: "var(--text-dark)" }}
                                  >
                                    {item.name}
                                  </div>
                                  <div
                                    className="text-xs leading-relaxed"
                                    style={{ color: "var(--text-medium)" }}
                                  >
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href="/solutions/finance"
                              className="flex items-start p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer product-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 mt-0.5 product-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <CreditCard className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div
                                  className="text-sm font-semibold mb-2 product-card-title text-link-underline"
                                  style={{ color: "var(--text-dark)" }}
                                >
                                  Finance
                                </div>
                                <div
                                  className="text-xs leading-relaxed"
                                  style={{ color: "var(--text-medium)" }}
                                >
                                  Easily manage finances, integrations and more
                                </div>
                              </div>
                            </Link>
                            <Link
                              href="/solutions/training"
                              className="flex items-start p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer product-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 mt-0.5 product-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <BookOpen className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div
                                  className="text-sm font-semibold mb-2 product-card-title text-link-underline"
                                  style={{ color: "var(--text-dark)" }}
                                >
                                  Training
                                </div>
                                <div
                                  className="text-xs leading-relaxed"
                                  style={{ color: "var(--text-medium)" }}
                                >
                                  Create and manage training materials for your
                                  team
                                </div>
                              </div>
                            </Link>
                            <Link
                              href="/solutions/compliance"
                              className="flex items-start p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer product-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 mt-0.5 product-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <Shield className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div
                                  className="text-sm font-semibold mb-2 product-card-title text-link-underline"
                                  style={{ color: "var(--text-dark)" }}
                                >
                                  Compliance
                                </div>
                                <div
                                  className="text-xs leading-relaxed"
                                  style={{ color: "var(--text-medium)" }}
                                >
                                  Stay compliant with federal and local
                                  regulations
                                </div>
                              </div>
                            </Link>
                            <Link
                              href="/solutions/growth"
                              className="flex items-start p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer product-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 mt-0.5 product-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <TrendingUp className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div
                                  className="text-sm font-semibold mb-2 product-card-title text-link-underline"
                                  style={{ color: "var(--text-dark)" }}
                                >
                                  Growth
                                </div>
                                <div
                                  className="text-xs leading-relaxed"
                                  style={{ color: "var(--text-medium)" }}
                                >
                                  Scale your business operations with
                                  easy-to-use tools
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Bottom Links */}
                        <div className="px-6 pt-2 pb-4">
                          <div className="flex items-center space-x-6">
                            <Link
                              href="/how-it-works"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">
                                How It Works
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                            <div
                              className="w-1 h-1"
                              style={{ backgroundColor: "var(--primary)" }}
                            ></div>
                            <Link
                              href="/blog"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">Blog</span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                            <div
                              className="w-1 h-1"
                              style={{ backgroundColor: "var(--primary)" }}
                            ></div>
                            <Link
                              href="/about"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">About</span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                            <div
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: "var(--primary)" }}
                            ></div>
                            <Link
                              href="/contact"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">
                                Contact
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
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
                    className="pl-2 pr-0 py-2 text-base font-medium transition-colors flex items-center schedule-call-button"
                    style={{ color: "var(--text-dark)" }}
                  >
                    <span className="schedule-call-text">Industries</span>
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
                        className="absolute top-full left-0 mt-2 w-[28rem] rounded-xl industries-dropdown"
                        style={{ backgroundColor: "var(--neutral-dark)" }}
                      >
                        <div
                          className="industries-dropdown-inner p-4"
                          style={{ backgroundColor: "var(--neutral)" }}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {industriesItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer industry-card"
                                style={{ backgroundColor: "var(--neutral)" }}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div
                                  className="mr-3 industry-card-icon transition-colors duration-300"
                                  style={{ color: "var(--secondary)" }}
                                >
                                  {item.icon}
                                </div>
                                <span
                                  className="text-sm font-medium industry-card-title text-link-underline"
                                  style={{ color: "var(--text-dark)" }}
                                >
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Links */}
                        <div className="px-6 pt-2 pb-4">
                          <div className="flex items-center space-x-6">
                            <Link
                              href="/industries"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">
                                View All Industries
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                            <div
                              className="w-1 h-1"
                              style={{ backgroundColor: "var(--primary)" }}
                            ></div>
                            <Link
                              href="/contact"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">
                                Get Industry Help
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Features Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("features")}
                    className="pl-2 pr-0 py-2 text-base font-medium transition-colors flex items-center schedule-call-button"
                    style={{ color: "var(--text-dark)" }}
                  >
                    <span className="schedule-call-text">Features</span>
                    <div className="relative w-3 h-3 ml-1">
                      <motion.div
                        animate={{
                          rotate: activeDropdown === "features" ? 180 : 0,
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
                    {activeDropdown === "features" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute top-full left-0 mt-2 w-[24rem] rounded-xl features-dropdown"
                        style={{ backgroundColor: "var(--neutral-dark)" }}
                      >
                        <div
                          className="features-dropdown-inner p-4"
                          style={{ backgroundColor: "var(--neutral)" }}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <Link
                              href="/features/analytics"
                              className="flex items-center p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer feature-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 feature-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <BarChart3 className="h-5 w-5" />
                              </div>
                              <span
                                className="text-sm font-medium feature-card-title text-link-underline"
                                style={{ color: "var(--text-dark)" }}
                              >
                                Analytics
                              </span>
                            </Link>
                            <Link
                              href="/features/automation"
                              className="flex items-center p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer feature-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 feature-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <Zap className="h-5 w-5" />
                              </div>
                              <span
                                className="text-sm font-medium feature-card-title text-link-underline"
                                style={{ color: "var(--text-dark)" }}
                              >
                                Automation
                              </span>
                            </Link>
                            <Link
                              href="/features/integrations"
                              className="flex items-center p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer feature-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 feature-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <Settings className="h-5 w-5" />
                              </div>
                              <span
                                className="text-sm font-medium feature-card-title text-link-underline"
                                style={{ color: "var(--text-dark)" }}
                              >
                                Integrations
                              </span>
                            </Link>
                            <Link
                              href="/features/security"
                              className="flex items-center p-3 rounded-lg hover:bg-[var(--neutral-dark)] transition-all duration-300 cursor-pointer feature-card"
                              style={{ backgroundColor: "var(--neutral)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className="mr-3 feature-card-icon transition-colors duration-300"
                                style={{ color: "var(--secondary)" }}
                              >
                                <Shield className="h-5 w-5" />
                              </div>
                              <span
                                className="text-sm font-medium feature-card-title text-link-underline"
                                style={{ color: "var(--text-dark)" }}
                              >
                                Security
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* Bottom Links */}
                        <div className="px-6 pt-2 pb-4">
                          <div className="flex items-center space-x-6">
                            <Link
                              href="/features"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">
                                Explore All Features
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                            <div
                              className="w-1 h-1"
                              style={{ backgroundColor: "var(--primary)" }}
                            ></div>
                            <Link
                              href="/contact"
                              className="flex items-center text-sm transition-colors hover:opacity-80"
                              style={{ color: "var(--text-dark)" }}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-link-underline">
                                Request Demo
                              </span>
                              <ArrowRight className="ml-2 h-4 w-4 transform -rotate-45" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/pricing"
                  className="px-2 py-2 text-base font-medium transition-colors schedule-call-button"
                  style={{ color: "var(--text-dark)" }}
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="schedule-call-text">Pricing</span>
                </Link>
              </div>
            </div>

            {/* Right: Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4 ml-auto">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center py-2.5 text-[#191C27] font-semibold text-base transition-colors schedule-call-button"
                onClick={() => setActiveDropdown(null)}
              >
                <span className="schedule-call-text">Login</span>
              </Link>
              {renderStartButton()}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2 ml-auto">
              <button
                onClick={() => {
                  console.log(
                    "Hamburger clicked, current state:",
                    isMobileMenuOpen
                  );
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="hover:text-[var(--neutral)]"
                style={{ color: "var(--text-dark)" }}
              >
                <div
                  className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
                >
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            {/* CTA Buttons */}
            <div className="mobile-menu-cta">
              <Link
                href="/auth/login"
                className="mobile-menu-login-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="schedule-call-text">Login</span>
              </Link>
              <Link
                href="/auth/signup"
                className="mobile-menu-start-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="lotto-button-text">Start for free</span>
                <ArrowRight className="lotto-button-arrow ml-2 h-4 w-4 transform -rotate-45" />
              </Link>
            </div>

            <div
              className={`mobile-menu-section ${
                openDropdown === "products" ? "open" : ""
              }`}
              onClick={() =>
                setOpenDropdown(openDropdown === "products" ? null : "products")
              }
            >
              <div className="mobile-menu-section-header">
                <h4 className="mobile-menu-section-title">Products</h4>
                <ChevronDown className="mobile-menu-section-arrow" size={20} />
              </div>
              <div className="mobile-menu-links">
                {solutionsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mobile-menu-link"
                    style={{ padding: "0rem 1rem" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mobile-menu-link-icon">{item.icon}</div>
                    <span className="mobile-menu-link-text">{item.name}</span>
                  </Link>
                ))}
                <Link
                  href="/solutions/finance"
                  className="mobile-menu-link"
                  style={{ padding: "0rem 1rem" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-link-icon">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="mobile-menu-link-text">Finance</span>
                </Link>
                <Link
                  href="/solutions/training"
                  className="mobile-menu-link"
                  style={{ padding: "0rem 1rem" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-link-icon">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="mobile-menu-link-text">Training</span>
                </Link>
                <Link
                  href="/solutions/compliance"
                  className="mobile-menu-link"
                  style={{ padding: "0rem 1rem" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-link-icon">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="mobile-menu-link-text">Compliance</span>
                </Link>
                <Link
                  href="/solutions/growth"
                  className="mobile-menu-link"
                  style={{ padding: "0rem 1rem" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-link-icon">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="mobile-menu-link-text">Growth</span>
                </Link>
              </div>
            </div>

            <div
              className={`mobile-menu-section ${
                openDropdown === "industries" ? "open" : ""
              }`}
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "industries" ? null : "industries"
                )
              }
            >
              <div className="mobile-menu-section-header">
                <h4 className="mobile-menu-section-title">Industries</h4>
                <ChevronDown className="mobile-menu-section-arrow" size={20} />
              </div>
              <div className="mobile-menu-links">
                {industriesItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mobile-menu-link"
                    style={{ padding: "0rem 1rem" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mobile-menu-link-icon">{item.icon}</div>
                    <span className="mobile-menu-link-text">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`mobile-menu-section ${
                openDropdown === "features" ? "open" : ""
              }`}
              onClick={() =>
                setOpenDropdown(openDropdown === "features" ? null : "features")
              }
            >
              <div className="mobile-menu-section-header">
                <h4 className="mobile-menu-section-title">Features</h4>
                <ChevronDown className="mobile-menu-section-arrow" size={20} />
              </div>
              <div className="mobile-menu-links">
                {featuresItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mobile-menu-link"
                    style={{ padding: "0rem 1rem" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mobile-menu-link-icon">{item.icon}</div>
                    <span className="mobile-menu-link-text">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pricing"
              className="mobile-menu-pricing"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Pricing</span>
              <ArrowRight className="mobile-menu-pricing-arrow" />
            </Link>

            {/* Bottom Links */}
            <div className="mobile-menu-bottom-links">
              <Link
                href="/how-it-works"
                className="mobile-menu-bottom-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
                <ArrowRight className="mobile-menu-bottom-link-arrow" />
              </Link>
              <Link
                href="/blog"
                className="mobile-menu-bottom-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
                <ArrowRight className="mobile-menu-bottom-link-arrow" />
              </Link>
              <Link
                href="/about"
                className="mobile-menu-bottom-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
                <ArrowRight className="mobile-menu-bottom-link-arrow" />
              </Link>
              <Link
                href="/contact"
                className="mobile-menu-bottom-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
                <ArrowRight className="mobile-menu-bottom-link-arrow" />
              </Link>
            </div>
          </div>
        </div>
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
