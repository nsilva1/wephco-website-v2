// Server-only: sends an issue of the magazine to one subscriber, with any
// number of PDFs attached.
//
// This file is deliberately not a 'use server' module. A server action can be
// called by anyone who can reach the site, and this one would let them send
// arbitrary files to arbitrary addresses from the company's domain. Call it
// from server code that has already checked the caller is allowed to.

import React from 'react';
import { sendEmail, SendEmailResult } from '@/actions/email';
import { MagazineEmail, MagazineEmailProps } from '@/emails/MagazineEmail';

export interface MagazinePdf {
  /** Shown in the email body, e.g. "WIMAO Magazine - October 2026" */
  title: string;
  description?: string;
  language?: string;
  /** File name the reader sees. Derived from the title when left out. */
  filename?: string;
  /** Where the PDF is hosted (https). Use this or `content`. */
  url?: string;
  /** The PDF itself, as a Buffer or a base64 string. Use this or `url`. */
  content?: Buffer | string;
}

export interface SendMagazineEmailParams
  extends Omit<MagazineEmailProps, 'documents' | 'subscriberName'> {
  to: string;
  subscriberName: string;
  /** The PDFs to attach. They are listed in the email in this order. */
  pdfs: MagazinePdf[];
  subject?: string;
}

// The email provider rejects messages over 40 MB once attachments are encoded.
const MAX_INLINE_BYTES = 25 * 1024 * 1024;

const slug = (value: string): string =>
  value
    .replace(/\.pdf$/i, '')
    .replace(/[^\w\- ]+/g, '')
    .replace(/[\s\-]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * A tidy, unique file name for an attachment. Two PDFs with the same title
 * (say the English and French editions) are told apart by their language, or
 * by a number when there is none.
 */
const toFilename = (pdf: MagazinePdf, index: number, used: Set<string>): string => {
  const base = slug(pdf.filename || pdf.title || '') || `document-${index + 1}`;
  const language = slug(pdf.language || '');

  const candidates = [base, ...(language ? [`${base}-${language}`] : [])];
  let name = candidates.find((candidate) => !used.has(candidate.toLowerCase()));

  for (let copy = 2; !name; copy++) {
    const numbered = `${candidates[candidates.length - 1]}-${copy}`;
    if (!used.has(numbered.toLowerCase())) name = numbered;
  }

  used.add(name.toLowerCase());
  return `${name}.pdf`;
};

/**
 * Sends the magazine email to one subscriber. Resolves with the provider's
 * result; it does not throw for a failed send.
 */
export const sendMagazineEmail = async ({
  to,
  subscriberName,
  pdfs,
  subject,
  ...templateProps
}: SendMagazineEmailParams): Promise<SendEmailResult> => {
  if (!to) {
    return { success: false, error: 'Recipient email is required.' };
  }

  const usedFilenames = new Set<string>();
  const attachments: { filename: string; contentType: string; path?: string; content?: Buffer | string }[] = [];
  let inlineBytes = 0;

  for (const [index, pdf] of pdfs.entries()) {
    // File names are kept unique so mail apps do not hide or overwrite one
    const filename = toFilename(pdf, index, usedFilenames);

    if (pdf.content) {
      inlineBytes += typeof pdf.content === 'string'
        ? Math.floor(pdf.content.length * 0.75)
        : pdf.content.length;
      attachments.push({ filename, contentType: 'application/pdf', content: pdf.content });
    } else if (pdf.url && /^https:\/\//i.test(pdf.url)) {
      attachments.push({ filename, contentType: 'application/pdf', path: pdf.url });
    } else {
      return {
        success: false,
        error: `"${pdf.title}" needs an https url or file content to be attached.`,
      };
    }
  }

  if (inlineBytes > MAX_INLINE_BYTES) {
    return {
      success: false,
      error: 'The attached PDFs are too large to email. Host them and pass their urls, or send fewer per email.',
    };
  }

  const magazineName = templateProps.magazineName || 'WIMAO Magazine';
  const issueTitle = templateProps.issueTitle || '';
  const documents = pdfs.map((pdf, index) => ({
    title: pdf.title,
    description: pdf.description,
    language: pdf.language,
    filename: attachments[index].filename,
  }));

  const text = [
    `Dear ${subscriberName},`,
    '',
    templateProps.issueSummary || `Your copy of ${magazineName}${issueTitle ? `, ${issueTitle},` : ''} is attached.`,
    '',
    ...(documents.length > 0
      ? ['Attached to this email:', ...documents.map((doc) => `- ${doc.title} (${doc.filename})`), '']
      : []),
    ...(templateProps.readOnlineUrl ? [`Read online: ${templateProps.readOnlineUrl}`, ''] : []),
    `If the attachments are missing, reply to this email or write to ${templateProps.supportEmail || 'support@wephco.com'}.`,
  ].join('\n');

  return sendEmail({
    to,
    subject: subject || `${magazineName}${issueTitle ? `: ${issueTitle}` : ''}`,
    react: React.createElement(MagazineEmail, {
      ...templateProps,
      magazineName,
      subscriberName,
      documents,
    }),
    text,
    attachments,
  });
};
