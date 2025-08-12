"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  MessageSquare,
  Mail,
  Shield,
  Smartphone,
  ChevronDown,
  Users,
  BarChart3,
  Zap,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MarketingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Two Column Layout */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0CBBE] via-white to-[#C0CBBE] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Title Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
                MARKETING
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
                Grow your business
                <br />
                <span className="text-[#FF5E00]">with smart marketing</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-[#848D6F] mb-8 leading-relaxed">
                Automate your marketing campaigns, nurture leads, and convert
                more customers with powerful marketing tools built for service
                businesses.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-4 mb-8">
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

            {/* Right Column - Video Box */}
            <div className="bg-gray-100 rounded-xl h-full min-h-[400px] flex items-center justify-center">
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

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              FEATURES
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              Everything you need to market your business
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              Powerful marketing tools to attract new customers, nurture leads,
              and grow your service business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="h-8 w-8" />,
                title: "Email Marketing",
                description:
                  "Create beautiful email campaigns, automate follow-ups, and nurture leads with targeted messaging.",
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "SMS Marketing",
                description:
                  "Send promotional messages, appointment reminders, and special offers directly to customer phones.",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Lead Generation",
                description:
                  "Capture leads through website forms, landing pages, and social media with automated follow-up.",
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Analytics & Tracking",
                description:
                  "Track campaign performance, conversion rates, and ROI with detailed marketing analytics.",
              },
              {
                icon: <Check className="h-8 w-8" />,
                title: "Automated Campaigns",
                description:
                  "Set up automated marketing campaigns that nurture leads and convert prospects into customers.",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Social Media Integration",
                description:
                  "Connect your social media accounts and share content automatically across all platforms.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#FF5E00] transition-colors"
              >
                <div className="text-[#FF5E00] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#191C27] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#848D6F]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="py-20 bg-[#191C27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              TEMPLATES
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl mx-auto">
              Marketing templates for every campaign
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pre-built email campaigns, SMS templates, and marketing workflows
              designed for service businesses.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Welcome Series",
                description:
                  "Automated email sequence to welcome new customers and introduce your services.",
                image: "bg-gray-200 rounded-lg h-48",
              },
              {
                title: "Promotional Campaigns",
                description:
                  "Templates for seasonal promotions, special offers, and service announcements.",
                image: "bg-gray-200 rounded-lg h-48",
              },
              {
                title: "Follow-up Sequences",
                description:
                  "Automated follow-up campaigns to re-engage customers and drive repeat business.",
                image: "bg-gray-200 rounded-lg h-48",
              },
            ].map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#FF5E00] transition-colors"
              >
                <div className={template.image}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#191C27] mb-2">
                    {template.title}
                  </h3>
                  <p className="text-[#848D6F] mb-4">{template.description}</p>
                  <Link
                    href="/templates"
                    className="inline-flex items-center text-[#FF5E00] hover:text-[#FF4A00] font-medium"
                  >
                    View Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              QUESTIONS
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              Frequently asked questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                question: "How does email marketing work?",
                answer:
                  "Our email marketing platform lets you create beautiful campaigns, segment your audience, and automate follow-up sequences. Track opens, clicks, and conversions to optimize your campaigns.",
              },
              {
                question: "Can I send SMS marketing campaigns?",
                answer:
                  "Yes, you can send promotional SMS messages, appointment reminders, and special offers directly to customer phones. All SMS campaigns comply with opt-in requirements.",
              },
              {
                question: "How do I capture leads?",
                answer:
                  "Use our lead capture forms on your website, landing pages, or social media. Leads are automatically added to your marketing database for follow-up campaigns.",
              },
              {
                question: "What about marketing analytics?",
                answer:
                  "Track campaign performance, email open rates, click-through rates, and conversion metrics. Our analytics help you understand what works and optimize your marketing efforts.",
              },
              {
                question: "Can I automate my marketing campaigns?",
                answer:
                  "Absolutely! Set up automated email sequences, SMS reminders, and follow-up campaigns that run automatically based on customer actions and triggers.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-[#191C27]">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-[#848D6F] transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
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
                  <div className="px-6 pb-6 pt-4">
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
      <div className="bg-[#FF5E00]">
        <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl mx-auto">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service professionals who trust ServicePro to
            automate their marketing and attract more customers.
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
