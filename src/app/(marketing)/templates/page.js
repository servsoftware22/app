"use client";

import Link from "next/link";
import {
  Search,
  Filter,
  Globe,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  BarChart3,
  Bot,
  ArrowRight,
  Star,
  Eye,
  Building2,
  Wrench,
  Droplets,
  Zap,
  Scissors,
  Dumbbell,
  Camera,
  Car,
} from "lucide-react";
import { useState } from "react";

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", icon: <Filter className="h-5 w-5" /> },
    { name: "General Contractors", icon: <Building2 className="h-5 w-5" /> },
    { name: "HVAC Technicians", icon: <Wrench className="h-5 w-5" /> },
    { name: "Plumbers", icon: <Droplets className="h-5 w-5" /> },
    { name: "Electricians", icon: <Zap className="h-5 w-5" /> },
    { name: "Landscapers", icon: <Globe className="h-5 w-5" /> },
    { name: "Cleaning Services", icon: <Settings className="h-5 w-5" /> },
    { name: "Barbers", icon: <Scissors className="h-5 w-5" /> },
    { name: "Salons", icon: <Scissors className="h-5 w-5" /> },
    { name: "Personal Trainers", icon: <Dumbbell className="h-5 w-5" /> },
    { name: "Photographers", icon: <Camera className="h-5 w-5" /> },
    { name: "Mobile Detailers", icon: <Car className="h-5 w-5" /> },
  ];

  const templates = [
    // General Contractors
    {
      id: 1,
      name: "Contractor Website Template",
      category: "General Contractors",
      description:
        "Complete website template for contractors with project galleries and booking integration.",
      image: "bg-gradient-to-br from-blue-500 to-purple-600",
      rating: 4.9,
      views: 1247,
      popular: true,
    },
    {
      id: 2,
      name: "Contractor CRM Template",
      category: "General Contractors",
      description:
        "CRM template designed for contractors with project tracking and client management.",
      image: "bg-gradient-to-br from-green-500 to-teal-600",
      rating: 4.8,
      views: 892,
      popular: false,
    },

    // HVAC Technicians
    {
      id: 3,
      name: "HVAC Service Website",
      category: "HVAC Technicians",
      description:
        "Professional website template for HVAC technicians with service scheduling.",
      image: "bg-gradient-to-br from-orange-500 to-red-600",
      rating: 4.8,
      views: 1103,
      popular: true,
    },
    {
      id: 4,
      name: "HVAC Business CRM",
      category: "HVAC Technicians",
      description:
        "Complete CRM template for HVAC businesses with maintenance scheduling.",
      image: "bg-gradient-to-br from-indigo-500 to-blue-600",
      rating: 4.9,
      views: 1567,
      popular: true,
    },

    // Plumbers
    {
      id: 5,
      name: "Plumbing Service Website",
      category: "Plumbers",
      description:
        "Website template for plumbers with emergency service booking and pricing.",
      image: "bg-gradient-to-br from-purple-500 to-pink-600",
      rating: 4.8,
      views: 734,
      popular: false,
    },
    {
      id: 6,
      name: "Plumbing Business CRM",
      category: "Plumbers",
      description:
        "CRM template for plumbing businesses with job tracking and client management.",
      image: "bg-gradient-to-br from-yellow-500 to-orange-600",
      rating: 4.8,
      views: 987,
      popular: false,
    },

    // Electricians
    {
      id: 7,
      name: "Electrical Service Website",
      category: "Electricians",
      description:
        "Professional website template for electricians with safety certifications display.",
      image: "bg-gradient-to-br from-teal-500 to-green-600",
      rating: 4.8,
      views: 1342,
      popular: true,
    },
    {
      id: 8,
      name: "Electrical Business CRM",
      category: "Electricians",
      description:
        "CRM template for electrical contractors with project management and safety protocols.",
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
      rating: 4.9,
      views: 678,
      popular: false,
    },

    // Landscapers
    {
      id: 9,
      name: "Landscaping Website",
      category: "Landscapers",
      description:
        "Beautiful website template for landscapers with portfolio galleries and seasonal services.",
      image: "bg-gradient-to-br from-pink-500 to-red-600",
      rating: 4.8,
      views: 1123,
      popular: false,
    },
    {
      id: 10,
      name: "Landscaping Business CRM",
      category: "Landscapers",
      description:
        "CRM template for landscaping businesses with seasonal scheduling and maintenance tracking.",
      image: "bg-gradient-to-br from-green-500 to-emerald-600",
      rating: 4.8,
      views: 945,
      popular: false,
    },

    // Cleaning Services
    {
      id: 11,
      name: "Cleaning Service Website",
      category: "Cleaning Services",
      description:
        "Website template for cleaning services with service packages and scheduling.",
      image: "bg-gradient-to-br from-purple-500 to-violet-600",
      rating: 4.8,
      views: 1289,
      popular: true,
    },
    {
      id: 12,
      name: "Cleaning Business CRM",
      category: "Cleaning Services",
      description:
        "CRM template for cleaning businesses with recurring service management.",
      image: "bg-gradient-to-br from-orange-500 to-yellow-600",
      rating: 4.9,
      views: 756,
      popular: false,
    },

    // Barbers
    {
      id: 13,
      name: "Barbershop Website",
      category: "Barbers",
      description:
        "Modern website template for barbershops with appointment booking and style galleries.",
      image: "bg-gradient-to-br from-emerald-500 to-teal-600",
      rating: 4.8,
      views: 1034,
      popular: false,
    },
    {
      id: 14,
      name: "Barbershop CRM",
      category: "Barbers",
      description:
        "CRM template for barbershops with client preferences and appointment management.",
      image: "bg-gradient-to-br from-blue-500 to-cyan-600",
      rating: 4.8,
      views: 1456,
      popular: true,
    },

    // Salons
    {
      id: 15,
      name: "Salon Website Template",
      category: "Salons",
      description:
        "Elegant website template for salons with service menus and stylist profiles.",
      image: "bg-gradient-to-br from-indigo-500 to-purple-600",
      rating: 4.8,
      views: 823,
      popular: false,
    },
    {
      id: 16,
      name: "Salon Business CRM",
      category: "Salons",
      description:
        "CRM template for salons with appointment scheduling and client history tracking.",
      image: "bg-gradient-to-br from-red-500 to-pink-600",
      rating: 4.9,
      views: 987,
      popular: false,
    },

    // Personal Trainers
    {
      id: 17,
      name: "Personal Training Website",
      category: "Personal Trainers",
      description:
        "Dynamic website template for personal trainers with workout programs and client testimonials.",
      image: "bg-gradient-to-br from-yellow-500 to-orange-600",
      rating: 4.8,
      views: 734,
      popular: false,
    },
    {
      id: 18,
      name: "Personal Training CRM",
      category: "Personal Trainers",
      description:
        "CRM template for personal trainers with client progress tracking and workout planning.",
      image: "bg-gradient-to-br from-green-500 to-blue-600",
      rating: 4.8,
      views: 567,
      popular: false,
    },

    // Photographers
    {
      id: 19,
      name: "Photography Website",
      category: "Photographers",
      description:
        "Portfolio website template for photographers with gallery displays and booking system.",
      image: "bg-gradient-to-br from-violet-500 to-purple-600",
      rating: 4.8,
      views: 1234,
      popular: true,
    },
    {
      id: 20,
      name: "Photography Business CRM",
      category: "Photographers",
      description:
        "CRM template for photographers with session management and client galleries.",
      image: "bg-gradient-to-br from-cyan-500 to-blue-600",
      rating: 4.9,
      views: 1098,
      popular: false,
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              TEMPLATES
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-normal text-[#191C27] mb-6 leading-none tracking-tight">
              Ready-to-use templates
              <br />
              <span className="text-[#FF5E00]">for your business</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#848D6F] mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose from our collection of professional templates designed
              specifically for service businesses. Get started quickly with
              pre-built workflows.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? "bg-[#FF5E00] text-white"
                      : "bg-white text-[#848D6F] border border-gray-200 hover:border-[#FF5E00] hover:text-[#FF5E00]"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-end mb-8">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-[#FF5E00] hover:text-[#FF4A00] font-medium"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#FF5E00] transition-colors group"
              >
                {/* Template Image */}
                <div className={`${template.image} h-48 relative`}>
                  {template.popular && (
                    <div className="absolute top-4 left-4 bg-[#FF5E00] text-white text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        href={`/templates/${template.id}`}
                        className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-[#FF5E00] hover:bg-[#FF5E00] hover:text-white transition-colors"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Template Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#848D6F] bg-gray-100 px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#191C27] mb-2 group-hover:text-[#FF5E00] transition-colors">
                    {template.name}
                  </h3>

                  <p className="text-[#848D6F] mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>{template.views.toLocaleString()}</span>
                    </div>

                    <Link
                      href={`/templates/${template.id}`}
                      className="inline-flex items-center text-[#FF5E00] hover:text-[#FF4A00] font-medium group-hover:gap-2 transition-all"
                    >
                      View Template
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[#191C27] mb-2">
                No templates found
              </h3>
              <p className="text-[#848D6F] mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center px-4 py-2 bg-[#FF5E00] text-white rounded-lg hover:bg-[#FF7A33] transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
