"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  Users,
  Shield,
  Smartphone,
  ChevronDown,
  Calendar,
  BarChart3,
  Zap,
  Settings,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TeamPage() {
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
                TEAM MANAGEMENT
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
                Manage your team
                <br />
                <span className="text-[#FF5E00]">like a pro</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-[#848D6F] mb-8 leading-relaxed">
                Coordinate your team, assign tasks, track performance, and
                collaborate seamlessly with tools built for growing service
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
              Everything you need to manage your team
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              Powerful team management tools to coordinate work, track
              performance, and scale your service business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Collaboration",
                description:
                  "Real-time collaboration with shared calendars, task assignments, and team communication tools.",
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                title: "Work Scheduling",
                description:
                  "Schedule team members, assign jobs, and manage workloads with intelligent scheduling.",
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Team Communication",
                description:
                  "Built-in messaging, file sharing, and project updates to keep everyone connected.",
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Performance Tracking",
                description:
                  "Track team productivity, job completion rates, and individual performance metrics.",
              },
              {
                icon: <Check className="h-8 w-8" />,
                title: "Task Management",
                description:
                  "Create, assign, and track tasks with deadlines, priorities, and completion status.",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Mobile Access",
                description:
                  "Team members can access schedules, tasks, and updates from anywhere on mobile devices.",
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
              Team management templates for every business
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pre-built team workflows, role templates, and management
              structures designed for service businesses.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Service Team Template",
                description:
                  "Complete team management template for service businesses with field teams.",
                image: "bg-gray-200 rounded-lg h-48",
              },
              {
                title: "Project Team Template",
                description:
                  "Template for project-based teams with task management and milestone tracking.",
                image: "bg-gray-200 rounded-lg h-48",
              },
              {
                title: "Small Business Team",
                description:
                  "Simple team management template for small businesses with basic collaboration needs.",
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
                question: "How does team collaboration work?",
                answer:
                  "Our team management platform provides real-time collaboration tools including shared calendars, task assignments, team messaging, and project updates to keep everyone connected and productive.",
              },
              {
                question: "Can team members access it on mobile?",
                answer:
                  "Yes, all team members can access schedules, tasks, and updates from anywhere using our mobile app. Perfect for field teams and remote workers.",
              },
              {
                question: "How do I track team performance?",
                answer:
                  "Track productivity metrics, job completion rates, time tracking, and individual performance with detailed analytics and reporting tools.",
              },
              {
                question: "Can I assign different roles and permissions?",
                answer:
                  "Absolutely! Set up different user roles with specific permissions. Managers can see everything, while team members only see their assigned tasks and schedules.",
              },
              {
                question: "What about team communication?",
                answer:
                  "Built-in messaging, file sharing, and project updates keep everyone connected. No need for separate communication tools.",
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
            Ready to manage your team better?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service professionals who trust ServicePro to
            coordinate their teams and scale their business.
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
