"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#FF5E00] hover:text-[#FF4A00] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to ServicePro
          </Link>
          <h1 className="text-4xl font-bold text-[#191C27] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#848D6F]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#848D6F] mb-4">
              By accessing and using ServicePro ("the Service"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              2. Description of Service
            </h2>
            <p className="text-[#848D6F] mb-4">
              ServicePro provides a comprehensive platform for service
              professionals, including website building tools, customer
              relationship management (CRM), scheduling systems, payment
              processing, analytics, and team management features.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              3. User Accounts
            </h2>
            <p className="text-[#848D6F] mb-4">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account or password.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              4. Acceptable Use
            </h2>
            <p className="text-[#848D6F] mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-[#848D6F] mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with the proper functioning of the Service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              5. Payment Terms
            </h2>
            <p className="text-[#848D6F] mb-4">
              ServicePro offers both free and paid plans. Paid subscriptions are
              billed in advance on a monthly or annual basis. All fees are
              non-refundable except as required by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              6. Data and Privacy
            </h2>
            <p className="text-[#848D6F] mb-4">
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-[#848D6F] mb-4">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of ServicePro and its
              licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              8. Termination
            </h2>
            <p className="text-[#848D6F] mb-4">
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-[#848D6F] mb-4">
              In no event shall ServicePro, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-[#848D6F] mb-4">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days notice prior to any new terms taking
              effect.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              11. Contact Information
            </h2>
            <p className="text-[#848D6F] mb-4">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="text-[#848D6F] mb-4">
              Email: legal@servicepro.com
              <br />
              Address: [Your Company Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
