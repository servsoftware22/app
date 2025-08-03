import Link from "next/link";
import { Check, Zap, Shield, Users, BarChart3, Calendar, Phone, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Professional Websites</span>{" "}
                  <span className="block text-blue-600 xl:inline">Made Simple</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Launch your professional website in minutes. Complete with CRM, scheduling, 
                  and analytics - everything service professionals need to grow their business.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/auth/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Free Trial
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/solutions"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      View Templates
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-blue-400 to-purple-500 sm:h-72 md:h-96 lg:w-full lg:h-full"></div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Everything You Need
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Complete business platform for service professionals
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              From website creation to customer management, we&apos;ve got you covered.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Professional Websites
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Beautiful, mobile-ready websites with your branding. Launch in minutes.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Customer CRM
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Manage customers, track leads, and organize your business efficiently.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Scheduling System
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Online booking, appointment management, and calendar integration.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Analytics & Insights
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Track performance, understand your customers, and grow your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Built for Service Professionals
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Perfect for your industry
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Plumbers", description: "Service scheduling, emergency calls, job tracking" },
              { name: "Electricians", description: "Quote management, safety compliance, project tracking" },
              { name: "HVAC Technicians", description: "Maintenance scheduling, emergency services, billing" },
              { name: "Landscapers", description: "Seasonal services, project management, client portals" },
              { name: "Contractors", description: "Project management, material tracking, client communication" },
              { name: "Cleaning Services", description: "Recurring appointments, team management, quality control" },
            ].map((industry) => (
              <div key={industry.name} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Choose the plan that&apos;s right for your business
            </p>
          </div>

          <div className="mt-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {/* Starter Plan */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Starter
                </h3>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Perfect for solo professionals
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    $29
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </p>
                <Link
                  href="/auth/signup"
                  className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-xs font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                  What&apos;s included
                </h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Professional website
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Basic CRM
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Online scheduling
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Email support
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border border-blue-500 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Professional
                </h3>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Best for growing teams
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    $99
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </p>
                <Link
                  href="/auth/signup"
                  className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-xs font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                  What&apos;s included
                </h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Everything in Starter
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Advanced CRM
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Team management
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Priority support
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Advanced analytics
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to grow your business?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of service professionals who trust our platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
            >
              Start Free Trial
            </Link>
            <Link
              href="/support"
              className="w-full inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 sm:w-auto"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 