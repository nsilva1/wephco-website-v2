import type { Metadata } from 'next';
import React from 'react';
import { typography, layout } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'Refund Policy | WEPHCO Global Brokerage & Investment Advisory',
  description:
    "Learn about WEPHCO Global Brokerage & Investment Advisory's refund policy, including terms for consultations, brokerage, property management, events, and advisory services.",
};

const WephcoRefundPolicy = () => {
  return (
    <main className={layout.columnSection}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 text-center">
          <h1 className={typography.heading2}>REFUND POLICY</h1>
          <p className={typography.smallParagraph}>
            Effective Date: 11 August 2026
          </p>
          <p className={`${typography.smallParagraph} mt-1 font-semibold`}>
            WEPHCO Global Brokerage & Investment Advisory
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10 space-y-4">
          <p className={typography.paragraph}>
            WEPHCO Global Brokerage & Investment Advisory (“WEPHCO,” “we,” “us,”
            or “our”) is committed to providing professional real estate
            brokerage, property advisory, consultation, property management,
            investment and related services.
          </p>
          <p className={typography.paragraph}>
            This Refund Policy explains the circumstances under which payments
            made to WEPHCO may or may not be refundable.
          </p>
        </section>

        {/* Policy Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              1. General Policy
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                All payments made to WEPHCO are subject to the nature of the
                service, the terms communicated to the client before payment,
                and any applicable agreement or engagement letter.
              </p>
              <p className={typography.paragraph}>
                Before making payment, clients are encouraged to review the
                applicable service description, quotation, proposal, invoice,
                engagement terms and any other relevant documentation.
              </p>
              <p className={typography.paragraph}>
                Payment for a service does not automatically guarantee the
                purchase, sale, allocation, approval, financing, appreciation or
                successful completion of a property or investment transaction.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              2. Consultation and Advisory Fees
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Fees paid for consultations, property advisory, investment
                advisory, acquisition consultation, deal preparation, research,
                due diligence coordination or other professional advisory
                services are generally non-refundable once the service has
                commenced.
              </p>
              <p className={typography.paragraph}>
                Where a consultation or advisory appointment is cancelled before
                the agreed service has commenced, WEPHCO may, at its discretion:
              </p>
              <ul
                className={`${typography.paragraph} list-disc list-inside space-y-2 pl-4`}>
                <li>Reschedule the appointment;</li>
                <li>Transfer the payment to another eligible service; or</li>
                <li>Issue a refund where the circumstances reasonably justify it.</li>
              </ul>
              <p className={typography.paragraph}>
                Any applicable administrative or third-party costs may be
                deducted from an approved refund.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              3. Property Brokerage Transactions
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Payments relating to the reservation, acquisition or purchase of
                a property are subject to the terms and conditions of the
                relevant property developer, vendor, owner or transaction
                agreement.
              </p>
              <p className={typography.paragraph}>
                Where WEPHCO acts as a brokerage or intermediary, WEPHCO cannot
                independently guarantee the refund of monies paid directly to a
                developer, vendor, property owner, escrow account or other third
                party.
              </p>
              <p className={typography.paragraph}>
                Any refund relating to such payments will be handled in
                accordance with the applicable sale, reservation, allocation or
                purchase agreement.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              4. Reservation, Deposit and Booking Payments
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Reservation fees, booking fees, initial deposits and other
                transaction-related payments may be non-refundable where the
                applicable property or developer terms specify that they are
                non-refundable.
              </p>
              <p className={typography.paragraph}>
                Clients will be informed, where reasonably possible, of material
                payment and refund conditions before such payments are made.
              </p>
              <p className={typography.paragraph}>
                Where a third party controls the funds, WEPHCO will assist the
                client with the refund process where appropriate but cannot
                guarantee the third party’s decision or timeline.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              5. Property Management Services
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Payments for property management services are governed by the
                applicable property management agreement.
              </p>
              <p className={typography.paragraph}>
                Where a client terminates a property management engagement, any
                refund, outstanding balance, management fee or other financial
                obligation will be calculated in accordance with the signed
                agreement.
              </p>
              <p className={typography.paragraph}>
                Fees already earned for services performed before termination will
                generally not be refundable.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              6. Events, Training and Tickets
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Payments for WEPHCO events, conferences, exhibitions, training
                programmes, workshops and related activities may be subject to
                specific event terms.
              </p>
              <p className={typography.paragraph}>Unless otherwise stated:</p>
              <ul
                className={`${typography.paragraph} list-disc list-inside space-y-2 pl-4`}>
                <li>Event tickets are non-refundable after confirmation;</li>
                <li>
                  Tickets may be transferable to another eligible attendee with
                  prior written approval;
                </li>
                <li>
                  Where an event is postponed, WEPHCO may provide a transfer to
                  the rescheduled event;
                </li>
                <li>
                  Where an event is cancelled by WEPHCO, registered attendees may
                  be offered a refund or alternative arrangement, subject to the
                  circumstances and applicable third-party costs.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              7. Digital and Creative Services
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Fees paid for completed or commenced digital, marketing,
                creative, design, research, documentation or other professional
                services are generally non-refundable once work has commenced.
              </p>
              <p className={typography.paragraph}>
                Where work has not commenced, WEPHCO may consider a refund request
                on a case-by-case basis.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              8. Third-Party Charges
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                WEPHCO may engage or facilitate services involving third parties,
                including property developers, vendors, consultants, legal
                professionals, government agencies, payment processors, banks
                and other service providers.
              </p>
              <p className={typography.paragraph}>
                Third-party fees, government charges, taxes, bank charges,
                payment-processing fees and other costs may be non-refundable
                and may be deducted from any approved refund where legally and
                contractually permissible.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              9. Approved Refunds
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Where a refund is approved, WEPHCO will normally process the
                refund through the original payment method where practicable.
              </p>
              <p className={typography.paragraph}>
                Refund processing time may depend on the payment provider, bank
                or financial institution involved.
              </p>
              <p className={typography.paragraph}>
                WEPHCO is not responsible for delays caused by a client’s bank,
                payment processor or other third-party financial institution.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              10. How to Request a Refund
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                A refund request should be submitted in writing and should
                include:
              </p>
              <ul
                className={`${typography.paragraph} list-disc list-inside space-y-2 pl-4`}>
                <li>Full name;</li>
                <li>Contact details;</li>
                <li>Payment date;</li>
                <li>Amount paid;</li>
                <li>Invoice, receipt or transaction reference;</li>
                <li>Service or property concerned;</li>
                <li>Reason for the refund request; and</li>
                <li>Supporting documentation, where applicable.</li>
              </ul>
              <p className={typography.paragraph}>
                Requests should be submitted through WEPHCO’s official customer
                service or administrative channels.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              11. Review of Refund Requests
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Each refund request will be reviewed based on:
              </p>
              <ul
                className={`${typography.paragraph} list-disc list-inside space-y-2 pl-4`}>
                <li>The service purchased;</li>
                <li>Whether the service has commenced or been completed;</li>
                <li>The applicable agreement or terms;</li>
                <li>The nature of the payment;</li>
                <li>Any third-party obligations;</li>
                <li>Any applicable cancellation conditions; and</li>
                <li>Applicable Nigerian laws and regulations.</li>
              </ul>
              <p className={typography.paragraph}>
                Submitting a refund request does not automatically constitute
                approval of the refund.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              12. Exceptions
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                Nothing in this Refund Policy is intended to remove or restrict
                any rights that a client may have under applicable law.
              </p>
              <p className={typography.paragraph}>
                Where applicable law provides a mandatory right to a refund or
                remedy, such rights will continue to apply.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              13. Policy Updates
            </h2>
            <div className="space-y-4">
              <p className={typography.paragraph}>
                WEPHCO reserves the right to amend this Refund Policy from time to
                time to reflect changes in our services, business practices,
                payment arrangements or applicable legal requirements.
              </p>
              <p className={typography.paragraph}>
                The updated version will be published on our website with the
                effective date.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2
              className={`${typography.heading3} mb-4 border-l-4 border-blue-600 pl-4`}>
              14. Contact
            </h2>
            <p className={typography.paragraph}>
              For refund enquiries or clarification regarding a payment, please
              contact WEPHCO Global Brokerage & Investment Advisory through the
              official contact channels provided on our website.
            </p>
            <div className={`mt-4 space-y-4 ${typography.paragraph}`}>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <a
                  href="mailto:contact@wephco.com"
                  className="text-blue-600 hover:text-blue-800 underline font-medium">
                  contact@wephco.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">🌐</span>
                <a
                  href="https://www.wephco.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium">
                  www.wephco.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl pt-1">📍</span>
                <address className="not-italic text-gray-700 dark:text-gray-400 leading-relaxed">
                  Suite 1030, Los Angeles Mall, Ahmadu Bello Way, Abuja, Nigeria.
                </address>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                WEPHCO Global Brokerage & Investment Advisory
              </p>
              <p>
                Real Estate Brokerage | Property Management | Investment &
                Acquisition Advisory
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default WephcoRefundPolicy;
