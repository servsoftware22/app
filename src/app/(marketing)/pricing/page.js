"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Wrench,
  Settings,
  Building2,
  ArrowRight,
  Star,
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Mail,
  MessageSquare,
  Bot,
  Globe,
  Zap,
  Shield,
  ChevronDown,
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const [openFeatureSection, setOpenFeatureSection] = useState(null);
  const [openFeatureDetails, setOpenFeatureDetails] = useState(null);

  const pricingPlans = [
    {
      name: "Essentials",
      price: billingCycle === "monthly" ? 19 : 190,
      description: "Everything you need to launch fast and look pro.",
      icon: <Wrench className="h-8 w-8" />,
      badge: "Most Popular",
      features: [
        "Drag-and-drop Website Builder",
        "Mobile-friendly, SEO-ready design",
        "Integrated Client CRM",
        "Appointment Scheduling Tools",
        "Basic Payments setup",
        "Analytics dashboard",
        "Email support",
      ],
      cta: "Start for free",
      popular: false,
      color: "border-gray-200",
      bgColor: "bg-white",
    },
    {
      name: "Pro Tools",
      price: billingCycle === "monthly" ? 49 : 490,
      description:
        "For growing pros who want more power, polish, and performance.",
      icon: <Settings className="h-8 w-8" />,
      badge: "Best Value",
      features: [
        "All Essentials features",
        "Advanced Marketing tools",
        "Full-featured CRM & Scheduling",
        "Enhanced Payments & invoicing",
        "Team management tools (2 users)",
        "Priority chat support",
        "Advanced reporting & analytics",
      ],
      cta: "Start for free",
      popular: true,
      color: "border-[#FF5E00]",
      bgColor: "bg-white",
    },
    {
      name: "Business Hub",
      price: billingCycle === "monthly" ? 199 : 1990,
      description: "The complete system for high-volume service businesses.",
      icon: <Building2 className="h-8 w-8" />,
      badge: "Enterprise",
      features: [
        "Everything in Pro Tools",
        "Multi-site website builder",
        "Full Team Management (unlimited)",
        "Intelligent AI Agent",
        "Advanced Analytics & reporting",
        "Custom domain & integrations",
        "White-glove support",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "border-gray-200",
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0CBBE] via-white to-[#C0CBBE] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              PRICING
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
              Simple, transparent
              <br />
              <span className="text-[#FF5E00]">pricing</span>
            </h1>

            {/* Billing Toggle */}
            <div className="flex flex-col items-center space-y-6 mb-12 mt-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`w-20 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-[#FF5E00] text-white"
                      : "bg-gray-100 text-[#848D6F] hover:bg-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() =>
                    setBillingCycle(
                      billingCycle === "monthly" ? "yearly" : "monthly"
                    )
                  }
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    billingCycle === "yearly" ? "bg-[#FF5E00]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      billingCycle === "yearly"
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`w-20 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    billingCycle === "yearly"
                      ? "bg-[#FF5E00] text-white"
                      : "bg-gray-100 text-[#848D6F] hover:bg-gray-200"
                  }`}
                >
                  Yearly
                </button>
              </div>
              <span className="text-[#FF5E00] font-medium text-sm">
                Save 20%
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-2xl border-2 ${plan.color} ${
                    plan.bgColor
                  } p-8 transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-[#FF5E00] ring-opacity-20" : ""
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#FF5E00] text-white px-4 py-1 rounded-full text-sm font-medium">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-left mb-8">
                    <div className="flex mb-4">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#191C27] mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-[#848D6F] mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#191C27]">
                        ${plan.price}
                      </span>
                      <span className="text-[#848D6F]">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-[#848D6F] text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/auth/signup"
                    className={`block w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      plan.popular
                        ? "bg-[#FF5E00] text-white hover:bg-[#FF4A00]"
                        : "bg-gray-100 text-[#191C27] hover:bg-gray-200"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#191C27] mb-4">
              Complete Feature Breakdown
            </h2>
            <p className="text-lg text-[#848D6F]">
              Compare all features across our plans to find the perfect fit for
              your business.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header */}
              <thead className="bg-[#848D6F]">
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left text-lg py-4 px-6 font-semibold text-white border-r border-gray-200">
                    Features
                  </th>
                  <th className="text-center py-4 px-6 border-r border-gray-200">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-0">
                        Essentials
                      </h3>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 border-r border-gray-200">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-0">
                        Pro Tools
                      </h3>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-0">
                        Business Hub
                      </h3>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Pro Websites */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <Globe className="h-6 w-6" />
                    <span className="text-lg font-bold">Pro Websites</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Drag-and-drop website builder (no code required)",
                  "Professionally designed templates for service industries",
                  "Mobile-optimized & lightning fast",
                  "Built-in SEO tools",
                  "Custom domains & subdomains",
                  "Contact forms and quote request forms",
                  "Google Maps & location embeds",
                  "Blog support for content marketing",
                  "Hosting included – no extra fees",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* Client CRM */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <Users className="h-6 w-6" />
                    <span className="text-lg font-bold">Client CRM</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Smart contact profiles with notes & history",
                  "Pipeline tracking (leads, booked, completed, follow-up)",
                  "Task reminders and notifications",
                  "Tagging and custom fields",
                  "Import/export client lists",
                  "Email and SMS outreach tools",
                  "Built-in client review requests",
                  "Attach files, photos, and job notes per client",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* Scheduling */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    <span className="text-lg font-bold">Scheduling</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Real-time online booking system",
                  "Sync with Google Calendar and iCal",
                  "Set availability, blackout dates, and custom rules",
                  "Accept deposits or prepayments",
                  "Send automated confirmations & reminders",
                  "Buffer time, travel time, and recurring job support",
                  "Team-based scheduling",
                  "Drag-and-drop rescheduling",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* Marketing */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-lg font-bold">Marketing</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Email marketing campaigns",
                  "SMS campaigns (promo codes, updates, reminders)",
                  "Social media post scheduling",
                  "Promo banners and limited-time offer tools",
                  "Automated review requests & follow-ups",
                  "Customer segmentation & targeting",
                  "Custom landing pages and lead forms",
                  "Funnel tracking and conversion metrics",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* Payments */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <CreditCard className="h-6 w-6" />
                    <span className="text-lg font-bold">Payments</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Accept credit/debit cards, ACH, Apple Pay, Google Pay",
                  "Send invoices and estimates with one click",
                  "Accept deposits and partial payments",
                  "Auto-send payment reminders",
                  "Save client cards on file securely",
                  "QuickBooks and accounting integration",
                  "Transaction history per client",
                  "Tip and tax support",
                  "Instant payouts (optional)",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* Team Management */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <Users className="h-6 w-6" />
                    <span className="text-lg font-bold">Team Management</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Add unlimited team members",
                  "Set roles, permissions & access levels",
                  "Assign leads, tasks, and jobs",
                  "Team scheduling and availability tracking",
                  "Time tracking and shift logging",
                  "Internal messaging and announcements",
                  "Performance insights and productivity reports",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* Analytics */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-lg font-bold">Analytics</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "Job pipeline & revenue tracking",
                  "Client source & conversion rates",
                  "Website visitor stats",
                  "Email & SMS campaign performance",
                  "Booking and job trends",
                  "Payment success rates & overdue invoices",
                  "Team performance dashboards",
                  "Exportable reports",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
                {/* AI Agent */}
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-gray-100 text-[#191C27] font-bold text-lg flex items-center gap-3">
                    <Bot className="h-6 w-6" />
                    <span className="text-lg font-bold">AI Agent</span>
                  </td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                  <td className="py-4 px-6 bg-gray-100"></td>
                </tr>
                {[
                  "AI-powered live chat for your website",
                  "Answer FAQs, take messages, book jobs",
                  "Smart lead qualification",
                  "Auto-send quotes, follow-ups, and reminders",
                  "Learn and improve from interactions",
                  "Custom training: feed it your services, pricing & policies",
                  "Works on mobile and desktop",
                  "Saves you hours of admin time every week",
                ].map((feature, i) => (
                  <tr
                    key={feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-100 bg-white"
                        : "border-b border-gray-100 bg-gray-50"
                    }
                  >
                    <td className="py-3 px-6 text-[#848D6F] border-r border-gray-200">
                      {feature}
                    </td>
                    <td className="py-3 px-6 text-center border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center bg-gray-50 border-r border-gray-200">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#191C27] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#848D6F]">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Can I change plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "Is there a free trial?",
                answer:
                  "Absolutely! All plans come with a 14-day free trial. No credit card required to start.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.",
              },
              {
                question: "Do you offer custom pricing for large teams?",
                answer:
                  "Yes! Contact our sales team for custom pricing and enterprise solutions.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => {
                    const newOpenFaq = openFaq === index ? null : index;
                    setOpenFaq(newOpenFaq);
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#191C27] pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: openFaq === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#848D6F] flex-shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-[#848D6F] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-[#FF5E00]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of service professionals who trust ServicePro to grow
            their business.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center bg-white text-[#FF5E00] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF5E00] transition-colors"
            >
              Schedule a call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
