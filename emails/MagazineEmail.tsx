import * as React from 'react';
import {
  Body,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
} from '@react-email/components';

/** One PDF attached to the email, as it is listed in the message body. */
export interface MagazineEmailDocument {
  /** e.g. "WIMAO Magazine - October 2026" */
  title: string;
  /** Optional one-line note, e.g. "Full edition, 84 pages" */
  description?: string;
  /** Optional edition language shown as a tag, e.g. "English" */
  language?: string;
  /** File name of the attachment, shown under the title */
  filename?: string;
}

/**
 * Sent to subscribers when an issue of the magazine goes out. The PDFs
 * themselves travel as attachments (see `sendMagazineEmail`); `documents`
 * lists them in the body so readers know what to look for.
 */
export interface MagazineEmailProps {
  subscriberName?: string;
  magazineName?: string;
  /** e.g. "October 2026 Edition" */
  issueTitle?: string;
  /** Short introduction to the issue */
  issueSummary?: string;
  /** "Inside this issue" bullet points */
  highlights?: string[];
  /** Publicly reachable image of the cover. Left out when not given. */
  coverImageUrl?: string;
  documents?: MagazineEmailDocument[];
  /** Optional link to read the issue online */
  readOnlineUrl?: string;
  companyName?: string;
  supportEmail?: string;
  companyWebsite?: string;
}

const labelClass =
  'text-[10px] font-bold tracking-[1.5px] text-[#64748b] uppercase';

export const MagazineEmail = ({
  subscriberName = 'Alexander Sterling',
  magazineName = 'WIMAO Magazine',
  issueTitle = 'October 2026 Edition',
  issueSummary = 'Your latest issue has arrived, covering global luxury real estate, design masterpieces, wealth preservation and institutional partnerships across Africa.',
  highlights = [
    'Inside the most anticipated waterfront developments of the year',
    'Wealth preservation: where capital is moving next',
    'Design masterpieces from Lagos to Dubai',
  ],
  coverImageUrl,
  documents = [
    {
      title: 'WIMAO Magazine - October 2026',
      description: 'Full edition',
      language: 'English',
      filename: 'WIMAO-October-2026-English.pdf',
    },
    {
      title: 'WIMAO Magazine - Octobre 2026',
      description: 'Édition complète',
      language: 'French',
      filename: 'WIMAO-October-2026-French.pdf',
    },
  ],
  readOnlineUrl,
  companyName = 'WEPHCO',
  supportEmail = 'support@wephco.com',
  companyWebsite = 'https://wephco.com',
}: MagazineEmailProps) => {
  const currentYear = new Date().getFullYear();
  const documentCount = documents.length;
  const previewText = `Your copy of ${magazineName} is here: ${issueTitle}`;

  return (
    <Html lang="en">
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Head></Head>
        <Body className="bg-[#050b08] font-sans my-0 mx-0 p-0 text-slate-100">
          <div className="w-full bg-[#050b08] py-[40px] px-0">
            <table
              role="presentation"
              className="max-w-[600px] w-full bg-[#0c1813] mx-auto my-0 p-0 border-collapse rounded-[20px] overflow-hidden border border-solid border-[#4a4220]"
              align="center"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td>
                    {/* Masthead */}
                    <div className="bg-[#011a11] p-[36px_32px_30px_32px] text-center border-b border-solid border-[#3a3519]">
                      <span className="text-[#d4af35] text-[10px] font-bold tracking-[3px] uppercase block">
                        {issueTitle}
                      </span>
                      <div className="font-serif text-[40px] font-light leading-[1.15] text-white mt-[12px]">
                        {magazineName}
                      </div>
                      <div className="text-[#94a3b8] text-[11px] tracking-[2px] uppercase mt-[10px]">
                        Luxury Real Estate &nbsp;•&nbsp; Design &nbsp;•&nbsp;
                        Wealth
                      </div>
                    </div>

                    {/* Cover */}
                    {coverImageUrl && (
                      <div className="bg-[#08120e] text-center p-[28px_32px_0_32px]">
                        <Img
                          src={coverImageUrl}
                          alt={`${magazineName} cover, ${issueTitle}`}
                          width="300"
                          className="mx-auto rounded-[10px] border border-solid border-[#5a4f22] max-w-full h-auto"
                        />
                      </div>
                    )}

                    <div className="p-[28px_32px_32px_32px]">
                      {/* Greeting */}
                      <p className="text-[15px] leading-[1.6] text-white mt-0 mb-[10px]">
                        Dear {subscriberName},
                      </p>
                      <p className="text-[14px] leading-[1.7] text-[#cbd5e1] my-0 font-light">
                        {issueSummary}
                      </p>

                      {/* Highlights */}
                      {highlights.length > 0 && (
                        <div className="bg-[#061811] border border-solid border-[#3a3519] rounded-[16px] p-[22px] mt-[24px]">
                          <div className="text-[12px] font-bold tracking-[2px] text-[#d4af35] uppercase mb-[12px]">
                            Inside this issue
                          </div>
                          <table
                            role="presentation"
                            className="w-full border-collapse"
                            cellPadding="0"
                            cellSpacing="0"
                          >
                            <tbody>
                              {highlights.map((highlight, index) => (
                                <tr key={index}>
                                  <td className="align-top w-[22px] text-[#d4af35] text-[13px] font-bold pb-[8px]">
                                    ✓
                                  </td>
                                  <td className="align-top text-[13px] leading-[1.6] text-white pb-[8px]">
                                    {highlight}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Attached documents */}
                      {documentCount > 0 && (
                        <>
                          <div className="text-[12px] font-bold tracking-[2px] text-[#d4af35] uppercase mt-[28px] mb-[6px]">
                            {documentCount === 1
                              ? 'Your attached copy'
                              : `Your ${documentCount} attached documents`}
                          </div>
                          <p className="text-[12px] leading-[1.6] text-[#94a3b8] mt-0 mb-[14px]">
                            {documentCount === 1
                              ? 'The PDF is attached to this email.'
                              : 'Each PDF below is attached to this email.'}
                          </p>

                          {documents.map((document, index) => (
                            <div
                              key={index}
                              className="bg-[#08120e] border border-solid border-[#5a4f22] rounded-[14px] p-[16px_18px] mb-[10px]"
                            >
                              <table
                                role="presentation"
                                className="w-full border-collapse"
                                cellPadding="0"
                                cellSpacing="0"
                              >
                                <tbody>
                                  <tr>
                                    <td className="align-middle w-[52px]">
                                      <div className="bg-[#d4af35] text-[#011a11] text-[10px] font-extrabold tracking-[1px] text-center rounded-[6px] w-[40px] p-[10px_0]">
                                        PDF
                                      </div>
                                    </td>
                                    <td className="align-middle">
                                      <div className="text-[14px] font-bold text-white leading-[1.35]">
                                        {document.title}
                                      </div>
                                      {document.description && (
                                        <div className="text-[12px] text-[#94a3b8] mt-[2px]">
                                          {document.description}
                                        </div>
                                      )}
                                      {document.filename && (
                                        <div className="text-[11px] text-[#64748b] mt-[3px] font-mono break-all">
                                          {document.filename}
                                        </div>
                                      )}
                                    </td>
                                    {document.language && (
                                      <td className="align-middle text-right w-[84px]">
                                        <span className="border border-solid border-[#5a4f22] text-[#d4af35] text-[10px] font-bold tracking-[1px] uppercase rounded-full p-[4px_10px]">
                                          {document.language}
                                        </span>
                                      </td>
                                    )}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </>
                      )}

                      {/* Read online */}
                      {readOnlineUrl && (
                        <div className="text-center mt-[26px]">
                          <Link
                            href={readOnlineUrl}
                            className="bg-[#d4af35] text-[#011a11] text-[12px] font-extrabold tracking-[1.5px] uppercase px-[30px] py-[14px] rounded-[10px] inline-block no-underline"
                          >
                            Read online
                          </Link>
                        </div>
                      )}

                      {/* Help */}
                      <div className="border-t border-solid border-[#1f2b25] mt-[28px] pt-[18px]">
                        <div className={labelClass}>Can&apos;t see the attachments?</div>
                        <p className="text-[12px] leading-[1.7] text-[#94a3b8] mt-[6px] mb-0">
                          Some mail apps hide attachments at the bottom of the
                          message or block large files. If yours are missing,
                          reply to this email or write to{' '}
                          <Link
                            href={`mailto:${supportEmail}`}
                            className="text-[#d4af35] font-bold no-underline"
                          >
                            {supportEmail}
                          </Link>{' '}
                          and we will send them again.
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#030906] p-[26px_32px] text-center border-t border-solid border-[#3a3519]">
                      <div className="font-serif tracking-[4px] font-bold text-[#d4af35] text-[16px] uppercase">
                        {companyName}
                      </div>
                      <div className="text-[10px] tracking-[2px] text-[#64748b] mt-[4px] uppercase">
                        Abuja &nbsp;•&nbsp; London &nbsp;•&nbsp; Dubai
                      </div>
                      <div className="text-[11px] leading-[1.6] text-[#64748b] mt-[14px]">
                        You are receiving this because you subscribed to{' '}
                        {magazineName}.
                        <br />
                        <Link
                          href={companyWebsite}
                          className="text-[#d4af35] font-bold no-underline"
                        >
                          {companyWebsite.replace(/^https?:\/\//, '')}
                        </Link>
                        <br />
                        <br />© {currentYear} {companyName} Group. All rights
                        reserved.
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

export default MagazineEmail;
