import React from 'react';
import { typography,layout } from '@/lib/styles';

const WepchoTermsOfService = () => {
  return (
    <main className={layout.columnSection}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center">
          <h1 className={typography.heading2}>
            TERMS OF SERVICE
          </h1>
          <p className={typography.smallParagraph}>
            Last Updated: July 2, 2025
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <p className={typography.paragraph}>
            Welcome to WEPHCO. These Terms of Service ("Terms") govern your access to and use of the website located at www.wephco.com (the "Website") operated by WEPHCO GROUPS ("WEPHCO", "we", "us", or "our").
          </p>
          <p className={typography.paragraph}>
            By accessing or using the Website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with these Terms, please do not use the Website.
          </p>
        </section>

        {/* Policy Sections */}
        <div className="space-y-12">

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              1. Who We Are
            </h2>
            <p className={typography.paragraph}>
              WEPHCO is a real estate and investment brokerage company offering professional property marketing, sales, acquisitions, leasing, and investment advisory services across Nigeria, the UK, UAE, and other international markets.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              2. Use of Our Website
            </h2>
            <p className={typography.paragraph}>
              By using www.wephco.com, you agree to:
            </p>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
              <li>Be at least 18 years old or of legal age in your jurisdiction.</li>
              <li>Use the Website for lawful purposes only.</li>
              <li>Not engage in any activity that interferes with or disrupts the Website or the servers and networks connected to it.</li>
              <li>Not reproduce, duplicate, copy, sell, resell or exploit any portion of the Website without our express written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              3. Services Disclaimer
            </h2>
            <p className={typography.paragraph}>
              The content on this Website is provided for general information and marketing purposes only. While we strive to ensure that all information is accurate and up to date, we do not guarantee the accuracy, completeness, or suitability of any content.
            </p>
            <p className={typography.paragraph}>
              Property listings, investment projections, and real estate advice provided on this site do not constitute professional financial, legal, or tax advice. We encourage users to seek independent counsel before making any real estate or investment decisions.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              4. User Accounts
            </h2>
            <p className={typography.paragraph}>
              To access certain features of the Website, you may be required to create an account or submit personal details through our contact forms. You agree to:
            </p>
             <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
                <li>Provide accurate, current, and complete information.</li>
                <li>Keep your login credentials secure and confidential.</li>
                <li>Notify us immediately of any unauthorized access or use of your account.</li>
            </ul>
            <p className={typography.paragraph}>
              We reserve the right to suspend or terminate any user account that violates these Terms.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              5. Intellectual Property
            </h2>
            <p className={typography.paragraph}>
              All content, trademarks, logos, graphics, and software used on the Website are the intellectual property of WEPHCO or its partners, and are protected by applicable copyright and trademark laws.
            </p>
            <p className={typography.paragraph}>You may not:</p>
            <ul className={typography.paragraph + " list-disc list-inside space-y-2 pl-4"}>
              <li>Copy, reproduce, modify, republish, upload, post, transmit, or distribute any content without prior written consent.</li>
              <li>Use any WEPHCO trademark or branding without explicit authorization.</li>
            </ul>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              6. Third-Party Links
            </h2>
            <p className={typography.paragraph}>
              The Website may contain links to third-party websites or services that are not owned or controlled by WEPHCO. We do not endorse or assume responsibility for any third-party content, terms, or practices.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              7. Limitation of Liability
            </h2>
            <p className={typography.paragraph}>
              To the fullest extent permitted by law, WEPHCO shall not be liable for any indirect, incidental, special, or consequential damages arising out of or relating to your use of the Website or reliance on any information provided herein.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              8. Indemnification
            </h2>
            <p className={typography.paragraph}>
              You agree to indemnify, defend, and hold harmless WEPHCO and its directors, employees, affiliates, and partners from and against any claims, damages, losses, or expenses arising out of your use of the Website or your violation of these Terms.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              9. Changes to These Terms
            </h2>
            <p className={typography.paragraph}>
              WEPHCO reserves the right to modify or replace these Terms at any time. We will notify users by updating the “Last Updated” date at the top of this page. Continued use of the Website after changes have been made constitutes acceptance of those changes.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              10. Termination
            </h2>
            <p className={typography.paragraph}>
              We reserve the right to terminate or restrict your access to the Website at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to our interests.
            </p>
          </section>

          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              11. Governing Law
            </h2>
            <p className={typography.paragraph}>
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the Nigerian courts.
            </p>
          </section>
          
          <section>
            <h2 className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              12. Contact Us
            </h2>
            <p className={typography.paragraph}>
              For questions, concerns, or feedback regarding these Terms of Service, please contact us at:
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
                <address className="not-italic text-gray-700 dark:text-gray-500 leading-relaxed">
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

export default WepchoTermsOfService;