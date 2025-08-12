"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  BookOpen,
  Video,
  Users,
  FileText,
  HelpCircle,
  ChevronDown,
  CheckCircle,
  Star,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  const supportCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics and set up your account",
      icon: <BookOpen className="h-8 w-8" />,
      articles: [
        "How to create your first website",
        "Setting up your business profile",
        "Adding your first service",
        "Configuring payment methods",
        "Inviting team members",
      ],
    },
    {
      title: "Website Builder",
      description: "Create and customize your professional website",
      icon: <Globe className="h-8 w-8" />,
      articles: [
        "Using the drag-and-drop editor",
        "Customizing your design",
        "Adding contact forms",
        "Setting up your domain",
        "SEO optimization tips",
      ],
    },
    {
      title: "Scheduling & CRM",
      description: "Manage appointments and customer relationships",
      icon: <Users className="h-8 w-8" />,
      articles: [
        "Setting up your availability",
        "Managing client information",
        "Creating appointment types",
        "Automated reminders",
        "Client communication tools",
      ],
    },
    {
      title: "Payments & Billing",
      description: "Process payments and manage your finances",
      icon: <Shield className="h-8 w-8" />,
      articles: [
        "Setting up payment processing",
        "Creating invoices",
        "Managing deposits",
        "Payment security",
        "Financial reporting",
      ],
    },
    {
      title: "Marketing Tools",
      description: "Promote your business and attract customers",
      icon: <Zap className="h-8 w-8" />,
      articles: [
        "Email marketing campaigns",
        "SMS marketing setup",
        "Social media integration",
        "Review management",
        "Promotional offers",
      ],
    },
    {
      title: "Account & Billing",
      description: "Manage your subscription and account settings",
      icon: <FileText className="h-8 w-8" />,
      articles: [
        "Upgrading your plan",
        "Billing information",
        "Account security",
        "Data export",
        "Account cancellation",
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I get started with ServicePro?",
      answer:
        "Getting started is easy! Sign up for a free trial, complete your business profile, and start building your website. Our guided setup will walk you through each step.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You'll continue to have access until the end of your billing period.",
    },
    {
      question: "Do you offer phone support?",
      answer:
        "Yes! We offer phone support for Pro Tools and Business Hub customers. Essentials customers can reach us via email and chat support.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We take security seriously. All data is encrypted, we use industry-standard security practices, and we're SOC 2 compliant. Your business data is safe with us.",
    },
    {
      question: "Can I integrate with other tools?",
      answer:
        "Absolutely! We integrate with popular tools like QuickBooks, Google Calendar, Mailchimp, and many more. Check our integrations page for the full list.",
    },
    {
      question: "Do you offer training?",
      answer:
        "Yes! We offer free webinars, video tutorials, and personalized training sessions. Business Hub customers get dedicated onboarding support.",
    },
  ];

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageSquare className="h-6 w-6" />,
      available: "Available 24/7",
      action: "Start Chat",
      href: "#",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our experts",
      icon: <Phone className="h-6 w-6" />,
      available: "Mon-Fri 9AM-6PM EST",
      action: "Call Us",
      href: "tel:1-800-SERVICEPRO",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="h-6 w-6" />,
      available: "Response within 4 hours",
      action: "Send Email",
      href: "mailto:support@servicepro.com",
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
              SUPPORT
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
              We're here to
              <br />
              <span className="text-[#FF5E00]">help you succeed</span>
            </h1>

            <p className="text-lg md:text-xl text-[#848D6F] mb-8 max-w-3xl mx-auto leading-relaxed">
              Get the help you need to grow your business. Our support team is
              available 24/7 to answer your questions and guide you to success.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#848D6F]" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, and more..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#191C27] mb-4">
              Get in touch
            </h2>
            <p className="text-lg text-[#848D6F]">
              Choose the way that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-[#FF5E00] bg-opacity-10 rounded-lg mr-4">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#191C27]">
                      {method.title}
                    </h3>
                    <p className="text-sm text-[#848D6F]">{method.available}</p>
                  </div>
                </div>
                <p className="text-[#848D6F] mb-4">{method.description}</p>
                <Link
                  href={method.href}
                  className="inline-flex items-center text-[#FF5E00] font-semibold hover:text-[#FF4A00] transition-colors"
                >
                  {method.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#191C27] mb-4">
              Help Center
            </h2>
            <p className="text-lg text-[#848D6F]">
              Find answers to common questions and learn how to use ServicePro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-[#FF5E00] bg-opacity-10 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#191C27]">
                    {category.title}
                  </h3>
                </div>
                <p className="text-[#848D6F] mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center text-sm text-[#848D6F] hover:text-[#191C27] transition-colors cursor-pointer"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {article}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#191C27] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#848D6F]">
              Quick answers to the most common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
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
            Still need help?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Our support team is ready to help you succeed. Get in touch and
            we'll get back to you right away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-[#FF5E00] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#FF5E00] transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
