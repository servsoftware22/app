"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  Globe,
  Shield,
  Zap,
  Target,
  CheckCircle,
  Star,
  Award,
  Heart,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    {
      title: "Simplicity First",
      description:
        "We believe powerful tools should be simple to use. Every feature is designed with the small business owner in mind.",
      icon: <Lightbulb className="h-8 w-8" />,
    },
    {
      title: "Customer Success",
      description:
        "Your success is our success. We're committed to helping every business owner achieve their goals.",
      icon: <Heart className="h-8 w-8" />,
    },
    {
      title: "Innovation",
      description:
        "We continuously evolve our platform to meet the changing needs of modern service businesses.",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Reliability",
      description:
        "Your business depends on our tools. We ensure 99.9% uptime and secure, reliable service.",
      icon: <Shield className="h-8 w-8" />,
    },
  ];

  const stats = [
    {
      number: "50,000+",
      label: "Businesses Served",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <Award className="h-6 w-6" />,
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      number: "4.9/5",
      label: "Customer Rating",
      icon: <Star className="h-6 w-6" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0CBBE] via-white to-[#C0CBBE] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
                Empowering small businesses
                <br />
                <span className="text-[#FF5E00]">to thrive</span>
              </h1>
              <p className="text-lg md:text-xl text-[#848D6F] mb-8 leading-relaxed">
                We're on a mission to level the playing field for service
                businesses. Our platform gives you the tools you need to compete
                with the big guys and grow your business on your own terms.
              </p>
              <div className="flex flex-row gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#FF5E00] text-white font-semibold rounded-lg text-base hover:bg-[#FF4A00] transition-colors"
                >
                  Start your free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#FF5E00] text-[#FF5E00] font-semibold rounded-lg text-base hover:bg-[#FF5E00] hover:text-white transition-colors"
                >
                  Schedule a demo
                </Link>
              </div>
            </div>

            {/* Right Column - Video Box */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#848D6F] to-[#6B7355] rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Our Story</h3>
                  <p className="text-white/80">
                    Watch how we're helping businesses grow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              OUR MISSION
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              Leveling the playing field
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              We believe every service business deserves access to the same
              powerful tools that big corporations use. Our mission is to
              democratize business technology.
            </p>
          </div>

          {/* Mission Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-[#191C27] mb-6">
                Why we do what we do
              </h3>
              <p className="text-lg text-[#848D6F] mb-6 leading-relaxed">
                Small businesses are the backbone of our economy, yet they often
                struggle with outdated tools and complex systems. We're changing
                that by providing enterprise-grade technology in a simple,
                affordable package.
              </p>
              <p className="text-lg text-[#848D6F] mb-8 leading-relaxed">
                From the solo contractor to the growing agency, we're here to
                help you compete, grow, and succeed in today's digital economy.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-6 w-6 text-[#848D6F]" />
                <span className="text-[#848D6F] font-medium">
                  Trusted by 50,000+ businesses
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#848D6F] to-[#6B7355] rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center text-white">
                <Target className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-white/80">
                  A world where every small business has the tools to succeed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#FF5E00] text-white mb-8">
              OUR VALUES
            </div>
            <h2 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-8 max-w-3xl mx-auto">
              What drives us forward
            </h2>
            <p className="text-xl text-[#848D6F] max-w-2xl mx-auto">
              These core values guide everything we do and every decision we
              make.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#FF5E00] transition-colors"
              >
                <div className="text-[#FF5E00] mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[#191C27] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#848D6F] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-[#191C27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl mx-auto">
              Trusted by thousands
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our track record speaks for itself.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-[#FF5E00] mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FF5E00]">
        <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-normal text-white mb-8 max-w-3xl mx-auto">
            Ready to join our mission?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Start your journey with ServicePro and see how we can help your
            business thrive.
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
