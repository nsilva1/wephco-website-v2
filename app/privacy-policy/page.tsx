import React from 'react';
import { typography, layout } from '../../lib/styles'

const WephcoPrivacyPolicy = () => {
  return (
    <main className={layout.columnSection}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center">
          <h1 className={typography.heading2}>
            PRIVACY POLICY
          </h1>
          <p className={typography.smallParagraph}>
            Last Updated: July 2, 2025
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <p className={typography.paragraph}>
            This Privacy Policy explains how WEPHCO ("we," "us," or "our") collects, uses, discloses, and protects your personal information when you visit our website: www.wephco.com (the “Website”).
          </p>
          <p className={typography.paragraph}>
            By using the Website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services or this Website.
          </p>
        </section>

        {/* Policy Sections */}
        <div className="space-y-12">

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              1. Who We Are
            </h2>
            <p className={typography.paragraph}>
              WEPHCO is a real estate and investment brokerage firm offering property marketing, sales, leasing, acquisitions, and investment advisory services in Nigeria and internationally.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              2. Information We Collect
            </h2>
            <p className={typography.paragraph}>
              We collect the following types of information:
            </p>
            <h3 className={`${typography.subtitle} mb-3 mt-6`}>
              a. Personal Information You Provide to Us:
            </h3>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Location (City, State, Country)</li>
              <li>ID or passport number (for verification when applicable)</li>
              <li>Property preferences or investment interests</li>
              <li>Other information you submit via forms or contact pages</li>
            </ul>
            <h3 className={`${typography.subtitle} mb-3 mt-6`}>
              b. Information Collected Automatically:
            </h3>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring site or search engine</li>
              <li>Cookies and usage tracking (see Section 6)</li>
            </ul>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              3. How We Use Your Information
            </h2>
            <p className={typography.paragraph}>
              We use your information to:
            </p>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
              <li>Respond to inquiries or service requests</li>
              <li>Provide updates about our properties or investment opportunities</li>
              <li>Process transactions or appointments</li>
              <li>Send promotional materials (only with your consent)</li>
              <li>Improve user experience and functionality of the Website</li>
              <li>Maintain legal and regulatory compliance</li>
            </ul>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              4. How We Share Your Information
            </h2>
            <p className={typography.paragraph}>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
                <li>Service providers (e.g. hosting, CRM, marketing support)</li>
                <li>Legal or regulatory authorities if required by law</li>
                <li>Business partners or affiliates where necessary for service fulfillment (e.g. property developers, agents, consultants)</li>
            </ul>
            <p className={typography.paragraph}>
              All third-party partners are required to protect your data in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              5. Data Security
            </h2>
            <p className={typography.paragraph}>
              We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, loss, or misuse. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              6. Cookies & Tracking Technologies
            </h2>
            <p className={typography.paragraph}>
              We use cookies and similar tracking technologies to improve the functionality of our website and understand user behavior. You can control or delete cookies through your browser settings. Please note that disabling cookies may affect certain features of the Website.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              7. Your Rights
            </h2>
            <p className={typography.paragraph}>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
              <li>Access the personal data we hold about you</li>
              <li>Correct or update your personal data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Object to or restrict certain types of data processing</li>
            </ul>
            <p className={typography.paragraph}>
              To exercise any of these rights, contact us at <a href="mailto:contact@wephco.com" className="text-blue-600 hover:text-blue-800 underline font-medium">contact@wephco.com</a>.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              8. Retention of Data
            </h2>
            <p className={typography.paragraph}>
              We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by law.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              9. Links to Third-Party Sites
            </h2>
            <p className={typography.paragraph}>
              Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies before providing any information.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              10. Children’s Privacy
            </h2>
            <p className={typography.paragraph}>
              Our Website is not directed at children under 18. We do not knowingly collect personal data from children. If we become aware that we have collected data from a minor without parental consent, we will delete it promptly.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              11. Changes to This Privacy Policy
            </h2>
            <p className={typography.paragraph}>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with a new "Last Updated" date. Continued use of our Website after such updates constitutes your acceptance of the revised policy.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              12. Contact Us
            </h2>
            <p className={typography.paragraph}>
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:
            </p>
            <div className={`space-y-4 ${typography.paragraph}`}>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <a href="mailto:contact@wephco.com" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  contact@wephco.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">🌐</span>
                <a href="https://www.wephco.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">
                  www.wephco.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl pt-1">📍</span>
                <address className="not-italic text-gray-700 leading-relaxed">
                  Suite 1030, Los Angeles Mall, Ahmadu Bello Way, Abuja, Nigeria.
                </address>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default WephcoPrivacyPolicy;