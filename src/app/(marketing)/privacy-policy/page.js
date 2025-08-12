"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              1. Information We Collect
            </h2>
            <p className="text-[#848D6F] mb-4">
              We collect information you provide directly to us, such as when
              you create an account, use our services, or contact us for
              support. This may include:
            </p>
            <ul className="list-disc pl-6 text-[#848D6F] mb-4">
              <li>Name, email address, and phone number</li>
              <li>Business information and service details</li>
              <li>Payment and billing information</li>
              <li>Customer data you input into our platform</li>
              <li>Communications with our support team</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-[#848D6F] mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-[#848D6F] mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              3. Information Sharing
            </h2>
            <p className="text-[#848D6F] mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except in the
              following circumstances:
            </p>
            <ul className="list-disc pl-6 text-[#848D6F] mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              4. Data Security
            </h2>
            <p className="text-[#848D6F] mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              5. Data Retention
            </h2>
            <p className="text-[#848D6F] mb-4">
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              policy. You may request deletion of your data at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              6. Your Rights
            </h2>
            <p className="text-[#848D6F] mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-[#848D6F] mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              7. Cookies and Tracking
            </h2>
            <p className="text-[#848D6F] mb-4">
              We use cookies and similar tracking technologies to enhance your
              experience on our platform. You can control cookie settings
              through your browser preferences.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              8. Third-Party Services
            </h2>
            <p className="text-[#848D6F] mb-4">
              Our service may contain links to third-party websites or integrate
              with third-party services. We are not responsible for the privacy
              practices of these external sites.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              9. Children's Privacy
            </h2>
            <p className="text-[#848D6F] mb-4">
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              10. International Transfers
            </h2>
            <p className="text-[#848D6F] mb-4">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-[#848D6F] mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#191C27] mb-4">
              12. Contact Us
            </h2>
            <p className="text-[#848D6F] mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-[#848D6F] mb-4">
              Email: privacy@servicepro.com
              <br />
              Address: [Your Company Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
