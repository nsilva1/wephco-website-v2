import * as React from 'react';
import {
  Body,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
} from '@react-email/components';

export interface BookingConfirmationEmailProps {
  customerName?: string;
  customerEmail?: string;
  bookingId?: string;
  serviceName?: string;
  bookingDate?: string;
  bookingTime?: string;
  meetingLocation?: string;
  meetingLink?: string;
  consultantName?: string;
  consultantRole?: string;
  notes?: string;
  companyName?: string;
  supportEmail?: string;
  companyWebsite?: string;
  logoUrl?: string;
}

export const BookingConfirmationEmail = ({
  customerName = 'Sarah Jenkins',
  // customerEmail = 'sarah.jenkins@example.com',
  bookingId = 'WPH-BK-89420',
  serviceName = 'Real Estate Private Consultation',
  bookingDate = 'Friday, August 14, 2026',
  bookingTime = '02:00 PM EST',
  meetingLocation = 'Virtual Meeting',
  meetingLink = 'https://meet.google.com/abc-defg-hij',
  consultantName = 'Wisdom Nwachukwu',
  consultantRole = 'Founder, WEPHCO',
  notes = 'Please have your current investment portfolio and target location preferences ready for discussion.',
  companyName = 'WEPHCO',
  supportEmail = 'support@wephco.com',
  companyWebsite = 'https://wephco.com',
  logoUrl,
}: BookingConfirmationEmailProps) => {
  const currentYear = new Date().getFullYear();
  const previewText = `Your booking for ${serviceName} on ${bookingDate} is confirmed (${bookingId})`;

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#003f2d',
                gold: '#d6ad3d',
                'gold-light': '#e0b53f',
                'gold-dark': '#b18420',
                'gold-muted': '#8c6418',
              },
              fontFamily: {
                serif: ['Georgia', 'serif'],
              },
            },
          },
        }}
      >
        <Body className="bg-[#f4f5f3] font-sans my-0 mx-0 p-0 text-[#17212b]">
          <div className="w-full bg-[#f4f5f3] py-7.5 px-0">
            <table
              role="presentation"
              className="max-w-170 w-170 bg-white mx-auto my-0 p-0 border-collapse"
              align="center"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td>
                    {/* Hero Header */}
                    <div className="bg-[#003f2d] pt-8.5 px-8.75 pb-7.5 text-center border-b-1.25 border-solid border-[#d6ad3d]">
                      <div className="font-serif text-[62px] leading-none text-[#e0b53f]">
                        W
                      </div>
                      <div className="font-serif text-[28px] tracking-[7px] text-white font-bold uppercase">
                        {companyName}
                      </div>
                      <div className="text-[12px] tracking-[3px] text-[#e0b53f] mt-2.5 uppercase font-semibold">
                        PREMIUM REAL ESTATE SOLUTIONS
                      </div>
                      <div className="font-serif text-[35px] leading-[1.15] text-white mt-8.5 mb-1">
                        Your Investor Consultation<br />
                        <span className="text-[#e0b53f]">is Confirmed.</span>
                      </div>
                      <div className="text-[14px] text-[#e8eee9] tracking-[0.4px]">
                        Strategic Guidance. Global Opportunities. Lasting Wealth.
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-[38px_42px]">
                      <table role="presentation" className="w-full border-collapse">
                        <tbody>
                          <tr>
                            <td className="w-[56%] align-top pr-5">
                              <p className="text-[22px] font-bold text-[#003f2d] my-0 mb-4.5">
                                Dear {customerName},
                              </p>
                              <p className="text-[15px] leading-[1.75] text-[#4b5660] my-0">
                                Thank you for choosing {companyName} for your real estate investment journey.
                                Your consultation has been successfully scheduled. We look forward to
                                providing strategic insights and tailored opportunities aligned with
                                your wealth objectives.
                              </p>
                              <div className="font-serif italic text-[25px] text-[#174c3c] mt-5">
                                The {companyName} Advisory Team
                              </div>
                              <div className="text-[11px] tracking-[2px] text-[#7b8388] mt-1.25 uppercase">
                                EXCELLENCE &nbsp;•&nbsp; TRUST &nbsp;•&nbsp; RESULTS
                              </div>
                            </td>
                            <td className="w-[44%] align-top">
                              <div className="bg-[#fafaf8] border border-solid border-[#e4dcc7] rounded-[12px] p-6 text-center">
                                <div className="text-[12px] tracking-[2px] text-[#b18420] font-bold uppercase">
                                  BOOKING CONFIRMED
                                </div>
                                <div className="text-[11px] text-[#687179] mt-3.75">
                                  Booking Reference
                                </div>
                                <div className="text-[22px] font-bold tracking-[1px] text-[#17212b] mt-2.5">
                                  {bookingId}
                                </div>
                                <div className="text-[11px] text-[#687179] mt-[12px]">
                                  Please retain this reference for your records.
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="text-[16px] tracking-[1px] text-[#003f2d] font-bold border-b border-solid border-[#ded7c7] pb-[10px] mt-[35px] mb-5 uppercase">
                        YOUR APPOINTMENT DETAILS
                      </div>

                      <table role="presentation" className="w-full border-collapse">
                        <tbody>
                          <tr>
                            <td className="w-1/4 align-top text-center p-[10px_12px] border-r border-solid border-[#e6dfd2]">
                              <div className="w-[42px] h-[42px] border border-solid border-[#c9992f] rounded-full mx-auto mb-[10px] leading-[42px] text-[#b18420] text-5">
                                ▣
                              </div>
                              <div className="text-[10px] tracking-[1.5px] text-[#6c747a] font-bold uppercase">
                                DATE &amp; TIME
                              </div>
                              <div className="text-[14px] leading-[1.45] text-[#17212b] font-bold mt-[7px]">
                                {bookingDate}
                              </div>
                              <div className="text-[12px] leading-[1.45] text-[#667078] mt-[4px]">
                                {bookingTime}
                              </div>
                            </td>
                            <td className="w-1/4 align-top text-center p-[10px_12px] border-r border-solid border-[#e6dfd2]">
                              <div className="w-[42px] h-[42px] border border-solid border-[#c9992f] rounded-full mx-auto mb-[10px] leading-[42px] text-[#b18420] text-5">
                                ◉
                              </div>
                              <div className="text-[10px] tracking-[1.5px] text-[#6c747a] font-bold uppercase">
                                LOCATION
                              </div>
                              <div className="text-[14px] leading-[1.45] text-[#17212b] font-bold mt-[7px]">
                                {meetingLocation}
                              </div>
                              <div className="text-[12px] leading-[1.45] text-[#667078] mt-[4px]">
                                Google Meet
                              </div>
                              {meetingLink && (
                                <div className="mt-[9px]">
                                  <Link
                                    href={meetingLink}
                                    className="text-[#003f2d] text-[11px] font-bold no-underline"
                                  >
                                    Join Meeting →
                                  </Link>
                                </div>
                              )}
                            </td>
                            <td className="w-1/4 align-top text-center p-[10px_12px] border-r border-solid border-[#e6dfd2]">
                              <div className="w-[42px] h-[42px] border border-solid border-[#c9992f] rounded-full mx-auto mb-[10px] leading-[42px] text-[#b18420] text-5">
                                ●
                              </div>
                              <div className="text-[10px] tracking-[1.5px] text-[#6c747a] font-bold uppercase">
                                ADVISOR
                              </div>
                              <div className="text-[14px] leading-[1.45] text-[#17212b] font-bold mt-[7px]">
                                {consultantName}
                              </div>
                              {consultantRole && (
                                <div className="text-[12px] leading-[1.45] text-[#667078] mt-[4px]">
                                  {consultantRole}
                                </div>
                              )}
                            </td>
                            <td className="w-1/4 align-top text-center p-[10px_12px]">
                              <div className="w-[42px] h-[42px] border border-solid border-[#c9992f] rounded-full mx-auto mb-[10px] leading-[42px] text-[#b18420] text-5">
                                □
                              </div>
                              <div className="text-[10px] tracking-[1.5px] text-[#6c747a] font-bold uppercase">
                                SERVICE
                              </div>
                              <div className="text-[14px] leading-[1.45] text-[#17212b] font-bold mt-[7px]">
                                {serviceName}
                              </div>
                              <div className="text-[12px] leading-[1.45] text-[#667078] mt-[4px]">
                                One-on-One Consultation
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Preparation / Notes Darkbox */}
                      <div className="bg-[#003f2d] rounded-[12px] p-[22px_24px] text-white mt-[30px]">
                        <table role="presentation" className="w-full border-collapse">
                          <tbody>
                            <tr>
                              <td className="w-[48%] align-top pr-5">
                                <div className="text-[14px] tracking-[1px] text-[#e0b53f] font-bold uppercase">
                                  BE PREPARED FOR A PRODUCTIVE SESSION
                                </div>
                                <div className="text-[13px] leading-[1.6] text-[#e8eee9] mt-[8px]">
                                  To maximize the value of your consultation, please have the following ready for discussion.
                                </div>
                                {notes && (
                                  <div className="text-[12px] italic text-[#e0b53f] mt-[12px]">
                                    Note: {notes}
                                  </div>
                                )}
                              </td>
                              <td className="w-[52%] align-top">
                                <div className="text-[13px] leading-[1.9] text-white">
                                  <span className="text-[#e0b53f] font-bold mr-1">✓</span> Current investment portfolio, if available
                                </div>
                                <div className="text-[13px] leading-[1.9] text-white">
                                  <span className="text-[#e0b53f] font-bold mr-1">✓</span> Target location preferences
                                </div>
                                <div className="text-[13px] leading-[1.9] text-white">
                                  <span className="text-[#e0b53f] font-bold mr-1">✓</span> Investment goals and timeline
                                </div>
                                <div className="text-[13px] leading-[1.9] text-white">
                                  <span className="text-[#e0b53f] font-bold mr-1">✓</span> Budget range, if you are comfortable sharing
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Important Reminders */}
                      <div className="bg-[#fbf7e9] border-l-1.25 border-solid border-[#d6ad3d] p-[20px_22px] mt-4.5">
                        <div className="text-[13px] tracking-[1px] text-[#8c6418] font-bold uppercase">
                          IMPORTANT REMINDERS
                        </div>
                        <div className="text-[13px] leading-[1.7] text-[#535b60] mt-[7px]">
                          Please join the meeting 5 minutes before your scheduled time.<br />
                          If you need to reschedule or cancel, please notify our team at least 24 hours in advance.
                        </div>
                        {meetingLink && (
                          <div className="mt-[14px]">
                            <Link
                              href={meetingLink}
                              className="bg-[#003f2d] text-white text-[12px] font-bold tracking-[0.7px] px-6 py-[13px] rounded-1.25 inline-block no-underline"
                            >
                              MANAGE APPOINTMENT
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Trust Banner */}
                    <table role="presentation" className="w-full bg-[#003f2d] text-white p-[24px_32px] border-collapse">
                      <tbody>
                        <tr>
                          <td className="w-1/4 align-top px-[12px] py-0 border-r border-solid border-white/25">
                            <div className="text-[11px] text-[#e0b53f] font-bold mb-[6px] uppercase">
                              TRUSTED EXPERTISE
                            </div>
                            <div className="text-[10px] leading-[1.5] text-[#e8eee9]">
                              Professional guidance across global real estate markets.
                            </div>
                          </td>
                          <td className="w-1/4 align-top px-[12px] py-0 border-r border-solid border-white/25">
                            <div className="text-[11px] text-[#e0b53f] font-bold mb-[6px] uppercase">
                              GLOBAL ACCESS
                            </div>
                            <div className="text-[10px] leading-[1.5] text-[#e8eee9]">
                              Access to opportunities across prime international markets.
                            </div>
                          </td>
                          <td className="w-1/4 align-top px-[12px] py-0 border-r border-solid border-white/25">
                            <div className="text-[11px] text-[#e0b53f] font-bold mb-[6px] uppercase">
                              TAILORED GUIDANCE
                            </div>
                            <div className="text-[10px] leading-[1.5] text-[#e8eee9]">
                              Investment strategies aligned with your objectives.
                            </div>
                          </td>
                          <td className="w-1/4 align-top px-[12px] py-0">
                            <div className="text-[11px] text-[#e0b53f] font-bold mb-[6px] uppercase">
                              CONFIDENTIAL &amp; SECURE
                            </div>
                            <div className="text-[10px] leading-[1.5] text-[#e8eee9]">
                              Your information is handled with discretion.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Footer */}
                    <div className="p-[28px_42px] text-center bg-white">
                      <div className="font-serif tracking-1.25 font-bold text-[#003f2d] text-[19px] uppercase">
                        {companyName}
                      </div>
                      <div className="text-[10px] tracking-[2px] text-[#9a7a32] mt-[6px] uppercase">
                        PREMIUM REAL ESTATE SOLUTIONS
                      </div>
                      <div className="text-[11px] leading-[1.6] text-[#6c747a] mt-[14px]">
                        Need assistance with your booking?<br />
                        <Link
                          href={`mailto:${supportEmail}`}
                          className="text-[#003f2d] font-bold no-underline"
                        >
                          {supportEmail}
                        </Link>
                        &nbsp; | &nbsp;
                        <Link
                          href={companyWebsite}
                          className="text-[#003f2d] font-bold no-underline"
                        >
                          {companyWebsite.replace(/^https?:\/\//, '')}
                        </Link>
                        <br /><br />
                        © {currentYear} {companyName}. All rights reserved.
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingConfirmationEmail;
