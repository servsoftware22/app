"use client";

import Link from "next/link";
import {
  ArrowRight,
  UserPlus,
  Upload,
  Palette,
  Settings,
  Rocket,
  CreditCard,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Create your account",
      description:
        "Sign up in under 1 minute with your email and business name.",
      icon: <UserPlus className="h-8 w-8" />,
      time: "1 min",
      color: "from-blue-500 to-purple-600",
    },
    {
      number: "02",
      title: "Upload your business details",
      description: "Add your services, contact info, and business description.",
      icon: <Upload className="h-8 w-8" />,
      time: "3 min",
      color: "from-green-500 to-teal-600",
    },
    {
      number: "03",
      title: "Select your template",
      description: "Choose from our collection of industry-specific templates.",
      icon: <Palette className="h-8 w-8" />,
      time: "1 min",
      color: "from-orange-500 to-red-600",
    },
    {
      number: "04",
      title: "Customize your features",
      description: "Configure scheduling, payments, CRM, and marketing tools.",
      icon: <Settings className="h-8 w-8" />,
      time: "5 min",
      color: "from-purple-500 to-pink-600",
    },
    {
      number: "05",
      title: "Launch your site",
      description: "Go live with your professional website and business tools.",
      icon: <Rocket className="h-8 w-8" />,
      time: "3 min",
      color: "from-indigo-500 to-blue-600",
    },
    {
      number: "06",
      title: "Get paid",
      description:
        "Start accepting payments and growing your business immediately.",
      icon: <CreditCard className="h-8 w-8" />,
      time: "Instant",
      color: "from-emerald-500 to-green-600",
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
              HOW IT WORKS
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
              Get your business online
              <br />
              <span className="text-[#FF5E00]">in 15 minutes</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#848D6F] mb-12 max-w-3xl mx-auto leading-relaxed">
              From signup to launch, we've streamlined the entire process so you
              can focus on what matters most—growing your business.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#FF5E00] hover:bg-[#FF7A33] text-white font-semibold rounded-lg text-lg transition-colors"
              >
                Start your free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              Simple 6-step process
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              Everything you need to get your service business online and
              running.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#FF5E00] transition-colors h-full relative">
                  {/* Step Number - Top Left Corner */}
                  <div className="absolute -top-2 -left-2">
                    <div className="w-8 h-8 rounded-lg bg-[#848D6F] flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                  </div>

                  {/* Time Badge - Top Right */}
                  <div className="flex justify-end mb-6">
                    <div className="flex items-center space-x-2 text-sm text-[#848D6F]">
                      <Clock className="h-4 w-4" />
                      <span>{step.time}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="text-[#FF5E00] mb-4">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#191C27] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#848D6F] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Check mark for completed steps */}
                  {index < 6 && (
                    <div className="absolute -bottom-2 -right-2">
                      <div className="w-8 h-8 bg-[#FF5E00] rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              Powerful features, simple setup
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              Every feature is designed to be intuitive and easy to implement.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Client CRM",
                description:
                  "Manage client relationships with ease. Track interactions, manage projects, and build stronger relationships.",
                icon: <Users className="h-8 w-8" />,
                setup: "2 minutes",
                difficulty: "Easy",
              },
              {
                title: "Scheduling",
                description:
                  "Let customers book appointments 24/7. Never double-book again with intelligent scheduling.",
                icon: <Calendar className="h-8 w-8" />,
                setup: "1 minute",
                difficulty: "Easy",
              },
              {
                title: "Marketing",
                description:
                  "Automate your marketing campaigns. Send emails, SMS, and nurture leads effortlessly.",
                icon: <MessageSquare className="h-8 w-8" />,
                setup: "3 minutes",
                difficulty: "Easy",
              },
              {
                title: "Payments",
                description:
                  "Accept payments online instantly. Get paid faster with secure payment processing.",
                icon: <CreditCard className="h-8 w-8" />,
                setup: "2 minutes",
                difficulty: "Easy",
              },
              {
                title: "Team Management",
                description:
                  "Coordinate your team seamlessly. Assign tasks, track performance, and collaborate.",
                icon: <Settings className="h-8 w-8" />,
                setup: "3 minutes",
                difficulty: "Easy",
              },
              {
                title: "Analytics",
                description:
                  "Make data-driven decisions. Track performance, understand your business, and optimize growth.",
                icon: <BarChart3 className="h-8 w-8" />,
                setup: "1 minute",
                difficulty: "Easy",
              },
              {
                title: "AI Agent",
                description:
                  "Automate customer service with AI. Handle inquiries 24/7 and provide instant support.",
                icon: <Bot className="h-8 w-8" />,
                setup: "2 minutes",
                difficulty: "Easy",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#FF5E00] transition-colors"
              >
                {/* Icon */}
                <div className="text-[#FF5E00] mb-4">{feature.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#191C27] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#848D6F] mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Setup Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#848D6F]" />
                    <span className="text-sm text-[#848D6F]">
                      Setup: {feature.setup}
                    </span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {feature.difficulty}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FF5E00]">
        <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl mx-auto">
            Ready to get started?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service professionals who have launched their
            business with ServicePro in under 15 minutes.
          </p>
          <div className="flex flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#FF5E00] font-semibold rounded-lg text-lg hover:bg-gray-50 transition-colors"
            >
              Start your free trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-[#FF5E00] transition-colors"
            >
              Schedule a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
