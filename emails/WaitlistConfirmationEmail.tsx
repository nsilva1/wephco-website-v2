import * as React from 'react';
import {
  Body,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
} from '@react-email/components';

export interface WaitlistConfirmationEmailProps {
  customerName?: string;
  customerEmail?: string;
  projectName?: string;
  projectLocation?: string;
  unitType?: string;
  targetYield?: string;
  estimatedHandover?: string;
  referenceId?: string;
  companyName?: string;
  supportEmail?: string;
  companyWebsite?: string;
}

export const WaitlistConfirmationEmail = ({
  customerName = 'Alexander Sterling',
  // customerEmail = 'alexander@example.com',
  projectName = 'The Canopies at Yas Point',
  projectLocation = 'Yas Island, Abu Dhabi, UAE',
  unitType = '1-2 Bedroom Luxury Suite',
  targetYield = '9.8% p.a.',
  estimatedHandover = 'Q4 2027',
  referenceId = 'WPH-WTL-90821',
  companyName = 'WEPHCO',
  supportEmail = 'support@wephco.com',
  companyWebsite = 'https://wephco.com',
}: WaitlistConfirmationEmailProps) => {
  const currentYear = new Date().getFullYear();
  const previewText = `VIP Access Granted: Your Priority Pre-Launch Pass for ${projectName} (${referenceId})`;

  return (
    <Html lang="en">
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#011a11',
                gold: '#d4af35',
                'gold-light': '#e5c158',
                'gold-dark': '#b38f28',
                slateDark: '#08120e',
              },
              fontFamily: {
                serif: ['Georgia', 'serif'],
              },
            },
          },
        }}
      >
        <Head></Head>
        <Body className="bg-[#050b08] font-sans my-0 mx-0 p-0 text-slate-100">
          <div className="w-full bg-[#050b08] py-[40px] px-0">
            <table
              role="presentation"
              className="max-w-[640px] w-[640px] bg-[#0c1813] mx-auto my-0 p-0 border-collapse rounded-[24px] overflow-hidden border border-solid border-[#d4af35]/30 shadow-2xl"
              align="center"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td>
                    {/* Header Banner */}
                    <div className="bg-[#011a11] p-[40px_35px_30px_35px] text-center border-b border-solid border-[#d4af35]/20 relative">
                      <div className="font-serif text-[42px] font-light leading-[1.15] text-white">
                        Priority Access <br />
                        <span className="text-[#d4af35] font-bold italic">Granted</span>
                      </div>

                      <p className="text-[#94a3b8] text-[14px] leading-[1.6] max-w-[460px] mx-auto mt-[12px] mb-0 font-light">
                        You have successfully secured pre-launch priority positioning for WEPHCO&apos;s upcoming flagship development.
                      </p>
                    </div>

                    {/* VIP Digital Access Pass / Ticket Container */}
                    <div className="p-[32px]">
                      <div className="bg-gradient-to-br from-[#08120e] to-[#040907] border-2 border-solid border-[#d4af35]/40 rounded-[20px] p-[28px] relative shadow-xl">
                        {/* Top Pass Indicator */}
                        <table role="presentation" className="w-full border-collapse mb-[20px]">
                          <tbody>
                            <tr>
                              <td className="align-middle">
                                <span className="text-[#d4af35] text-[10px] font-bold tracking-[2.5px] uppercase block">
                                  OFFICIAL VIP ACCESS PASS
                                </span>
                              </td>
                              <td className="align-middle text-right">
                                <span className="bg-[#042116] border border-solid border-[#00e699]/30 text-[#00e699] text-[10px] font-extrabold px-[10px] py-[4px] rounded-full uppercase tracking-[1px]">
                                  ● Allocation Active
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Project Info Block */}
                        <div className="pb-[20px] mb-[20px]">
                          <div className="text-[24px] font-bold text-white leading-[1.2]">
                            {projectName}
                          </div>
                          <div className="text-[#94a3b8] text-[13px] mt-[4px] flex items-center gap-[6px]">
                            <span className="text-[#d4af35]">📍</span> {projectLocation}
                          </div>
                        </div>

                        {/* Ticket Details Grid */}
                        <table role="presentation" className="w-full border-collapse">
                          <tbody>
                            <tr>
                              <td className="w-1/2 align-top pr-[12px]">
                                <div className="text-[10px] font-bold tracking-[1.5px] text-[#64748b] uppercase">
                                  REGISTRANT
                                </div>
                                <div className="text-[15px] font-bold text-white mt-[4px]">
                                  {customerName}
                                </div>
                              </td>
                              <td className="w-1/2 align-top pl-[12px]">
                                <div className="text-[10px] font-bold tracking-[1.5px] text-[#64748b] uppercase">
                                  VIP PASS ID
                                </div>
                                <div className="text-[15px] font-mono font-bold text-[#d4af35] mt-[4px]">
                                  {referenceId}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="w-1/2 align-top pr-[12px] pt-[16px]">
                                <div className="text-[10px] font-bold tracking-[1.5px] text-[#64748b] uppercase">
                                  SELECTED CATEGORY
                                </div>
                                <div className="text-[13px] font-semibold text-slate-200 mt-[4px]">
                                  {unitType}
                                </div>
                              </td>
                              <td className="w-1/2 align-top pl-[12px] pt-[16px]">
                                <div className="text-[10px] font-bold tracking-[1.5px] text-[#64748b] uppercase">
                                  TARGET YIELD
                                </div>
                                <div className="text-[13px] font-bold text-[#00e699] mt-[4px]">
                                  {targetYield}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Key Project Highlights Cards */}
                      <div className="mt-[28px]">
                        <div className="text-[12px] font-bold tracking-[2px] text-[#d4af35] uppercase mb-[14px]">
                          KEY INVESTMENT METRICS
                        </div>

                        <table role="presentation" className="w-full border-collapse">
                          <tbody>
                            <tr>
                              <td className="w-1/2 align-top pr-[7px] pb-[14px]">
                                <div className="bg-[#07130f] border border-solid border-[#d4af35]/20 p-[16px] rounded-[14px]">
                                  <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-[1px]">
                                    TARGET HANDOVER
                                  </div>
                                  <div className="text-[16px] font-extrabold text-white mt-[4px]">
                                    {estimatedHandover}
                                  </div>
                                  <div className="text-[11px] text-[#94a3b8] mt-[2px]">
                                    On-schedule development
                                  </div>
                                </div>
                              </td>

                              <td className="w-1/2 align-top pl-[7px] pb-[14px]">
                                <div className="bg-[#07130f] border border-solid border-[#d4af35]/20 p-[16px] rounded-[14px]">
                                  <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-[1px]">
                                    BROKERAGE FEE
                                  </div>
                                  <div className="text-[16px] font-extrabold text-[#d4af35] mt-[4px]">
                                    0% Waived
                                  </div>
                                  <div className="text-[11px] text-[#94a3b8] mt-[2px]">
                                    Exclusive for waitlist members
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td className="w-1/2 align-top pr-[7px]">
                                <div className="bg-[#07130f] border border-solid border-[#d4af35]/20 p-[16px] rounded-[14px]">
                                  <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-[1px]">
                                    FLOOR SELECTION
                                  </div>
                                  <div className="text-[16px] font-extrabold text-white mt-[4px]">
                                    Priority Choice
                                  </div>
                                  <div className="text-[11px] text-[#94a3b8] mt-[2px]">
                                    Prime waterfront units
                                  </div>
                                </div>
                              </td>

                              <td className="w-1/2 align-top pl-[7px]">
                                <div className="bg-[#07130f] border border-solid border-[#d4af35]/20 p-[16px] rounded-[14px]">
                                  <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-[1px]">
                                    CAPITAL PROTECTION
                                  </div>
                                  <div className="text-[16px] font-extrabold text-[#00e699] mt-[4px]">
                                    Buyback Terms
                                  </div>
                                  <div className="text-[11px] text-[#94a3b8] mt-[2px]">
                                    Guaranteed contract clause
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* VIP Privileges Section */}
                      <div className="bg-[#061811] border border-solid border-[#d4af35]/30 rounded-[16px] p-[24px] mt-[28px]">
                        <div className="text-[14px] font-bold text-[#d4af35] tracking-[1px] uppercase mb-[12px]">
                          WHAT HAPPENS NEXT?
                        </div>
                        <p className="text-[13px] leading-[1.7] text-[#cbd5e1] my-0 font-light">
                          Our private client advisory team is compiling your pre-launch investor pack. Within <strong>24–48 hours</strong>, you will receive:
                        </p>

                        <div className="mt-[16px] space-y-2.5">
                          <div className="text-[13px] text-white flex items-center gap-[8px]">
                            <span className="text-[#d4af35] font-bold">✓</span> Confidential project brochure &amp; high-res renders
                          </div>
                          <div className="text-[13px] text-white flex items-center gap-[8px]">
                            <span className="text-[#d4af35] font-bold">✓</span> Master floor plans &amp; unit stack diagrams
                          </div>
                          <div className="text-[13px] text-white flex items-center gap-[8px]">
                            <span className="text-[#d4af35] font-bold">✓</span> Direct developer pre-launch price sheet &amp; payment schedule
                          </div>
                        </div>
                      </div>

                      {/* Call to Action Button */}
                      <div className="text-center mt-[32px]">
                        <Link
                          href={`${companyWebsite}/consultations`}
                          className="bg-gradient-to-r from-[#d4af35] via-[#e5c158] to-[#b38f28] text-[#011a11] text-[13px] font-extrabold tracking-[1.5px] uppercase px-[36px] py-[16px] rounded-[12px] inline-block no-underline shadow-lg"
                        >
                          Schedule Private Advisory Call →
                        </Link>
                      </div>

                      {/* Security & Confidentiality Notice */}
                      <div className="text-center text-[11px] text-[#64748b] mt-[24px]">
                        🔒 <em>Strictly Confidential • Priority Pass non-transferable without WEPHCO authorization</em>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#030906] p-[28px_32px] text-center border-t border-solid border-[#d4af35]/20">
                      <div className="font-serif tracking-[4px] font-bold text-[#d4af35] text-[18px] uppercase">
                        {companyName} CAPITAL &amp; REAL ESTATE
                      </div>
                      <div className="text-[10px] tracking-[2px] text-[#64748b] mt-[4px] uppercase">
                        ABUJA &nbsp;•&nbsp; LONDON &nbsp;•&nbsp; DUBAI
                      </div>
                      <div className="text-[11px] leading-[1.6] text-[#475569] mt-[16px]">
                        Need assistance or wish to modify your preferences?<br />
                        <Link
                          href={`mailto:${supportEmail}`}
                          className="text-[#d4af35] font-bold no-underline"
                        >
                          {supportEmail}
                        </Link>
                        &nbsp; | &nbsp;
                        <Link
                          href={companyWebsite}
                          className="text-[#d4af35] font-bold no-underline"
                        >
                          {companyWebsite.replace(/^https?:\/\//, '')}
                        </Link>
                        <br /><br />
                        © {currentYear} {companyName} Group. All rights reserved.
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

export default WaitlistConfirmationEmail;
