"use client";

import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  Bot,
  Shield,
  Smartphone,
  ChevronDown,
  Users,
  BarChart3,
  Zap,
  MessageSquare,
  Brain,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AiAgentPage() {
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
                AI AGENT
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
                Automate customer service
                <br />
                <span className="text-[#FF5E00]">with AI</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-[#848D6F] mb-8 leading-relaxed">
                Let AI handle customer inquiries, book appointments, and provide
                instant support 24/7 while you focus on growing your business.
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
              Everything you need to automate customer service
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              Powerful AI tools to handle inquiries, book appointments, and
              provide instant support around the clock.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-8 w-8" />,
                title: "24/7 Customer Support",
                description:
                  "AI agents handle customer inquiries instantly, providing immediate responses and support anytime.",
              },
              {
                icon: <MessageSquare className="h-8 w-8" />,
                title: "Smart Conversations",
                description:
                  "Natural language processing understands customer intent and provides relevant, helpful responses.",
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                title: "Appointment Booking",
                description:
                  "AI can book appointments, check availability, and send confirmations automatically.",
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Learning & Improvement",
                description:
                  "AI learns from every interaction to provide better, more accurate responses over time.",
              },
              {
                icon: <Check className="h-8 w-8" />,
                title: "Seamless Handoff",
                description:
                  "When AI can't help, smoothly transfer to human agents with full conversation context.",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Multi-Channel Support",
                description:
                  "Handle inquiries across website chat, SMS, email, and social media from one AI system.",
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
              AI agent templates for every business
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pre-built AI conversation flows, response templates, and
              automation workflows designed for service businesses.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Customer Service Agent",
                description:
                  "Complete AI agent template for handling customer inquiries and support requests.",
                image: "bg-gray-200 rounded-lg h-48",
              },
              {
                title: "Appointment Booking Agent",
                description:
                  "AI agent template for booking appointments and managing scheduling inquiries.",
                image: "bg-gray-200 rounded-lg h-48",
              },
              {
                title: "Sales & Lead Generation",
                description:
                  "AI agent template for qualifying leads and converting prospects into customers.",
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
                question: "How does the AI agent work?",
                answer:
                  "Our AI agent uses natural language processing to understand customer inquiries and provide relevant responses. It can handle common questions, book appointments, and escalate complex issues to human agents when needed.",
              },
              {
                question: "Can the AI book appointments?",
                answer:
                  "Yes! The AI agent can check your availability, book appointments, send confirmations, and even handle rescheduling requests automatically.",
              },
              {
                question: "What happens when AI can't help?",
                answer:
                  "When the AI reaches its limits, it seamlessly transfers the conversation to a human agent with full context, ensuring customers always get the help they need.",
              },
              {
                question: "How does the AI learn and improve?",
                answer:
                  "The AI learns from every conversation, improving its responses over time. You can also train it with your specific business knowledge and FAQs.",
              },
              {
                question: "Can I customize the AI responses?",
                answer:
                  "Absolutely! Customize the AI's personality, responses, and knowledge base to match your brand voice and business needs.",
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
            Ready to automate your customer service?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service professionals who trust ServicePro to
            provide 24/7 customer support with AI.
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
