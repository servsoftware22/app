"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Zap,
  Shield,
  Users,
  BarChart3,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Star,
  Clock,
  Globe,
  Settings,
  MessageSquare,
  FileText,
  CreditCard,
  Headphones,
  BookOpen,
  Video,
  Download,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [industryScrollPosition, setIndustryScrollPosition] = useState(0);

  const industries = [
    { name: "General Contractors" },
    { name: "HVAC Technicians" },
    { name: "Plumbers" },
    { name: "Electricians" },
    { name: "Landscapers" },
    { name: "Cleaning Services" },
    { name: "Barbers" },
    { name: "Salons" },
    { name: "Personal Trainers" },
    { name: "Photographers" },
    { name: "Mobile Detailers" },
    { name: "Any Other Service" },
  ];

  const cardWidth = 280; // 264px width + 24px gap
  const totalWidth = industries.length * cardWidth;

  // Create a duplicated array for seamless infinite scroll
  const duplicatedIndustries = [...industries, ...industries];

  const tabs = [
    "Websites",
    "CRM",
    "Scheduling",
    "Analytics",
    "Team",
    "Payments",
  ];

  const advantages = [
    {
      title: "Exceptional Design, Built to Convert",
      company: "Hand-Crafted Templates",
      quote:
        "Your website is your first impression — make it count. Our hand-crafted templates are sleek, modern, and tailored for trades and service professionals. No cookie-cutter themes. Just clean, professional design that builds trust and drives action.",
      author: "— Premium templates included",
      stats: [
        { value: "50+", label: "professional templates" },
        { value: "100%", label: "mobile responsive" },
      ],
    },
    {
      title: "Fast, Painless Launch",
      company: "Skip the Delays",
      quote:
        "We've stripped away the fluff. Skip the months of delays, endless revisions, and back-and-forth emails. Our process gets you online quickly, so you can focus on your work — not on waiting for your site to launch.",
      author: "— Drag-and-drop builder",
      stats: [
        { value: "30 min", label: "to go live" },
        { value: "0", label: "coding required" },
      ],
    },
    {
      title: "Transparent Pricing, Unmatched Value",
      company: "Honest Pricing",
      quote:
        "No bloated agency fees. No mystery invoices. Just simple, honest pricing that gives you a premium site without draining your wallet. You shouldn't have to overpay to stand out online — and with us, you won't.",
      author: "— Transparent pricing",
      stats: [
        { value: "90%", label: "less than agencies" },
        { value: "$29", label: "per month" },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Zapier Style */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0CBBE] via-white to-[#C0CBBE] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
              Websites that work
              <br />
              <span className="text-[#FF5E00]">as hard as you do</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#848D6F] mb-8 max-w-2xl mx-auto leading-relaxed">
              Get a stunning, high-performing website tailored for service pros
              — launched in minutes, for a price that makes sense.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-4 justify-center mb-8">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF5E00] hover:bg-[#FF7A33] text-white font-semibold rounded-lg text-base transition-colors"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-[#191C27] font-semibold rounded-lg text-base border-2 border-gray-200 transition-colors"
              >
                Schedule a call
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Zapier Style */}
      <div className="border-b border-gray-200 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`py-4 px-1 border-b-2 font-lg text-md whitespace-nowrap transition-all duration-300 ease-in-out ${
                  index === activeTab
                    ? "border-[#FF5E00] text-[#FF5E00]"
                    : "border-transparent text-[#848D6F] hover:text-[#191C27]"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Video Container */}
      <div className="bg-white py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF5E00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <p className="text-[#848D6F] font-medium">Watch Demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Stories Section */}
      <div className="py-20 bg-[#191C27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              THE CHOICE IS SIMPLE
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl">
              Look Better. Launch Faster. Pay Less.
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Launch a pro-grade site with better design, faster setup, and
              unbeatable pricing that leaves the competition in the dust.
            </p>
          </div>

          {/* Testimonial Slides */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px] flex-shrink-0"
                >
                  {/* Left Panel - White Background */}
                  <div className="bg-white p-8 flex flex-col justify-between">
                    {/* Title */}
                    <div className="flex items-center mb-6">
                      <span className="text-sm font-medium text-[#848D6F]">
                        {advantage.company}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-[#191C27] mb-6">
                        {advantage.title}
                      </h3>
                      <p className="text-l text-[#191C27] leading-relaxed mb-6">
                        {advantage.quote}
                      </p>
                      <p className="text-sm text-[#848D6F]">
                        {advantage.author}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-8 mt-8">
                      {advantage.stats.map((stat, statIndex) => (
                        <div key={statIndex}>
                          <div className="text-6xl font-s text-[#FF5E00] mb-2">
                            {stat.value}
                          </div>
                          <div className="text-sm text-[#848D6F]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Panel - Dark Background */}
                  <div className="bg-[#848D6F] p-8 flex items-end justify-center">
                    <div className="text-center">
                      <div className="text-white text-sm">
                        {advantage.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation and CTA */}
          <div className="flex items-center justify-between mt-12">
            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                disabled={activeSlide === 0}
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4 text-[#191C27] rotate-180" />
              </button>
              <button
                onClick={() =>
                  setActiveSlide(
                    Math.min(advantages.length - 1, activeSlide + 1)
                  )
                }
                disabled={activeSlide === advantages.length - 1}
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4 text-[#191C27]" />
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FF5E00] hover:bg-[#FF4A00] text-white font-semibold rounded-lg text-lg transition-colors"
            >
              See how it works
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Everything You Need Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              EVERYTHING YOUR BUSINESS NEEDS IN ONE PLACE
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl">
              Everything you need in one place
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl">
              ServicePro brings websites, CRM, scheduling, marketing, payments,
              team management, and analytics into one place, so you can focus on
              growing your business.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: "🌐",
                title: "Build stunning websites that convert",
                description:
                  "ServicePro Websites make professional sites easy with drag-and-drop tools and mobile-ready templates.",
                cta: "Explore websites →",
              },
              {
                icon: "👥",
                title: "Manage clients and track relationships",
                description:
                  "ServicePro CRM keeps all your customer data organized and helps you never miss a follow-up.",
                cta: "Explore CRM →",
              },
              {
                icon: "📅",
                title: "Automate scheduling and bookings",
                description:
                  "ServicePro Scheduling handles appointments, reminders, and payments all in one seamless system.",
                cta: "Explore scheduling →",
              },
              {
                icon: "📢",
                title: "Create marketing campaigns that work",
                description:
                  "ServicePro Marketing helps you reach new customers with email campaigns, social media, and SEO tools.",
                cta: "Explore marketing →",
              },
              {
                icon: "💳",
                title: "Accept payments and manage invoices",
                description:
                  "ServicePro Payments processes credit cards, sends invoices, and tracks your cash flow automatically.",
                cta: "Explore payments →",
              },
              {
                icon: "👨‍💼",
                title: "Coordinate your team and projects",
                description:
                  "ServicePro Team Management helps you assign tasks, track progress, and keep everyone on the same page.",
                cta: "Explore team management →",
              },
              {
                icon: "📊",
                title: "Track performance and grow smarter",
                description:
                  "ServicePro Analytics shows you what's working, what's not, and how to optimize your business.",
                cta: "Explore analytics →",
              },
              {
                icon: "🚀",
                title: "Start your free trial today",
                description:
                  "Join thousands of service professionals who trust ServicePro to grow their business.",
                cta: "Start for free →",
                isCTA: true,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 border rounded-lg transition-colors ${
                  feature.isCTA
                    ? "bg-[#FF5E00] border-[#FF5E00] text-white"
                    : "border-gray-200 hover:border-[#FF5E00]"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold mb-3 ${
                        feature.isCTA ? "text-white" : "text-[#191C27]"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`mb-4 ${
                        feature.isCTA ? "text-white/90" : "text-[#848D6F]"
                      }`}
                    >
                      {feature.description}
                    </p>
                    <a
                      href="#"
                      className={`inline-flex items-center font-medium transition-colors ${
                        feature.isCTA
                          ? "text-white hover:text-white/80"
                          : "text-[#191C27] hover:text-[#FF5E00]"
                      }`}
                    >
                      {feature.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Take Control Section - Slide Format */}
      <div className="py-20 bg-[#191C27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column - Dynamic Card */}
            <div className="w-full relative h-full">
              {/* Background Image Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.2, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 right-0 w-96 h-80 bg-gray-200 rounded-xl"
                />
              </AnimatePresence>

              {/* Main Card */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-lg max-w-sm"
                  >
                    {[
                      {
                        icon: "💳",
                        title: "Upfront payments",
                        description:
                          "Get paid immediately when customers book your services. Secure online payments with instant confirmation and no payment delays.",
                        features: [
                          "Custom pricing with online payment",
                          "Secure payment at booking",
                          "Instant confirmation",
                          "No payment delays",
                        ],
                      },
                      {
                        icon: "📄",
                        title: "Flexible invoicing",
                        description:
                          "Send professional invoices with custom payment terms. Track payments and manage your cash flow with ease.",
                        features: [
                          "Custom quotes and invoicing",
                          "Payment terms you control",
                          "Professional payment tracking",
                          "Automated reminders",
                        ],
                      },
                      {
                        icon: "🔄",
                        title: "Recurring services",
                        description:
                          "Set up automated billing for ongoing services. Build predictable revenue streams with subscription management.",
                        features: [
                          "Automated billing cycles",
                          "Subscription management",
                          "Predictable revenue",
                          "Customer retention",
                        ],
                      },
                    ][activeSlide] && (
                      <div>
                        {/* Icon */}
                        <div className="text-3xl mb-4">
                          {
                            [
                              {
                                icon: "💳",
                                title: "Upfront payments",
                                description:
                                  "Get paid immediately when customers book your services. Secure online payments with instant confirmation and no payment delays.",
                                features: [
                                  "Custom pricing with online payment",
                                  "Secure payment at booking",
                                  "Instant confirmation",
                                  "No payment delays",
                                ],
                              },
                              {
                                icon: "📄",
                                title: "Flexible invoicing",
                                description:
                                  "Send professional invoices with custom payment terms. Track payments and manage your cash flow with ease.",
                                features: [
                                  "Custom quotes and invoicing",
                                  "Payment terms you control",
                                  "Professional payment tracking",
                                  "Automated reminders",
                                ],
                              },
                              {
                                icon: "🔄",
                                title: "Recurring services",
                                description:
                                  "Set up automated billing for ongoing services. Build predictable revenue streams with subscription management.",
                                features: [
                                  "Automated billing cycles",
                                  "Subscription management",
                                  "Predictable revenue",
                                  "Customer retention",
                                ],
                              },
                            ][activeSlide].icon
                          }
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-[#191C27] mb-3">
                          {
                            [
                              {
                                icon: "💳",
                                title: "Upfront payments",
                                description:
                                  "Get paid immediately when customers book your services. Secure online payments with instant confirmation and no payment delays.",
                                features: [
                                  "Custom pricing with online payment",
                                  "Secure payment at booking",
                                  "Instant confirmation",
                                  "No payment delays",
                                ],
                              },
                              {
                                icon: "📄",
                                title: "Flexible invoicing",
                                description:
                                  "Send professional invoices with custom payment terms. Track payments and manage your cash flow with ease.",
                                features: [
                                  "Custom quotes and invoicing",
                                  "Payment terms you control",
                                  "Professional payment tracking",
                                  "Automated reminders",
                                ],
                              },
                              {
                                icon: "🔄",
                                title: "Recurring services",
                                description:
                                  "Set up automated billing for ongoing services. Build predictable revenue streams with subscription management.",
                                features: [
                                  "Automated billing cycles",
                                  "Subscription management",
                                  "Predictable revenue",
                                  "Customer retention",
                                ],
                              },
                            ][activeSlide].title
                          }
                        </h3>

                        {/* Description */}
                        <p className="text-[#848D6F] leading-relaxed mb-4 text-sm">
                          {
                            [
                              {
                                icon: "💳",
                                title: "Upfront payments",
                                description:
                                  "Get paid immediately when customers book your services. Secure online payments with instant confirmation and no payment delays.",
                                features: [
                                  "Custom pricing with online payment",
                                  "Secure payment at booking",
                                  "Instant confirmation",
                                  "No payment delays",
                                ],
                              },
                              {
                                icon: "📄",
                                title: "Flexible invoicing",
                                description:
                                  "Send professional invoices with custom payment terms. Track payments and manage your cash flow with ease.",
                                features: [
                                  "Custom quotes and invoicing",
                                  "Payment terms you control",
                                  "Professional payment tracking",
                                  "Automated reminders",
                                ],
                              },
                              {
                                icon: "🔄",
                                title: "Recurring services",
                                description:
                                  "Set up automated billing for ongoing services. Build predictable revenue streams with subscription management.",
                                features: [
                                  "Automated billing cycles",
                                  "Subscription management",
                                  "Predictable revenue",
                                  "Customer retention",
                                ],
                              },
                            ][activeSlide].description
                          }
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          {[
                            {
                              icon: "💳",
                              title: "Upfront payments",
                              description:
                                "Get paid immediately when customers book your services. Secure online payments with instant confirmation and no payment delays.",
                              features: [
                                "Custom pricing with online payment",
                                "Secure payment at booking",
                                "Instant confirmation",
                                "No payment delays",
                              ],
                            },
                            {
                              icon: "📄",
                              title: "Flexible invoicing",
                              description:
                                "Send professional invoices with custom payment terms. Track payments and manage your cash flow with ease.",
                              features: [
                                "Custom quotes and invoicing",
                                "Payment terms you control",
                                "Professional payment tracking",
                                "Automated reminders",
                              ],
                            },
                            {
                              icon: "🔄",
                              title: "Recurring services",
                              description:
                                "Set up automated billing for ongoing services. Build predictable revenue streams with subscription management.",
                              features: [
                                "Automated billing cycles",
                                "Subscription management",
                                "Predictable revenue",
                                "Customer retention",
                              ],
                            },
                          ][activeSlide].features.map(
                            (feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center"
                              >
                                <Check className="h-3 w-3 text-[#FF5E00] mr-2 flex-shrink-0" />
                                <span className="text-[#848D6F] text-xs">
                                  {feature}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column - Static Content */}
            <div className="flex flex-col justify-center">
              <div className="max-w-lg">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
                  PAYMENT CONTROL
                </div>

                {/* Main Title */}
                <h2 className="text-5xl md:text-6xl font-normal text-white mb-6">
                  Get paid on your terms
                </h2>

                {/* Subtitle */}
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Choose the payment option that works best for your business —
                  from upfront payments to flexible invoicing and recurring
                  services.
                </p>

                {/* Learn More Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FF5E00] hover:bg-[#FF4A00] text-white font-semibold rounded-lg text-lg transition-colors mb-8"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                {/* Navigation Squares */}
                <div className="flex space-x-3">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-2 h-2 transition-colors ${
                        activeSlide === index
                          ? "bg-[#FF5E00]"
                          : "bg-gray-400 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              INDUSTRIES WE SERVE
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              Built for service professionals
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              Professional templates and tools optimized for your specific
              industry needs
            </p>
          </div>

          {/* Industry Slider */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const newPosition = industryScrollPosition - cardWidth;
                if (newPosition < 0) {
                  // Jump to the end of the first set (seamless loop)
                  setIndustryScrollPosition(totalWidth - cardWidth);
                } else {
                  setIndustryScrollPosition(newPosition);
                }
              }}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg cursor-pointer"
            >
              <ArrowRight className="h-6 w-6 text-[#191C27] rotate-180" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const newPosition = industryScrollPosition + cardWidth;
                if (newPosition >= totalWidth) {
                  // Jump back to the beginning (seamless loop)
                  setIndustryScrollPosition(0);
                } else {
                  setIndustryScrollPosition(newPosition);
                }
              }}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg cursor-pointer"
            >
              <ArrowRight className="h-6 w-6 text-[#191C27]" />
            </button>

            {/* Slider Container */}
            <div
              className="overflow-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div
                className="flex space-x-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${industryScrollPosition}px)`,
                }}
              >
                {duplicatedIndustries.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-64 h-80 bg-[#848D6F] rounded-xl border border-gray-200 hover:border-[#FF5E00] transition-colors relative"
                  >
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-lg font-semibold text-white">
                        {industry.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FF5E00]">
        <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl mx-auto">
            Ready to transform your service business?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service professionals who trust ServicePro to grow
            their operations.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#FF5E00] font-semibold rounded-lg text-base hover:bg-gray-50 transition-colors"
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg text-base hover:bg-white hover:text-[#FF5E00] transition-colors"
            >
              Schedule a call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
