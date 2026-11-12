// Server-only: what happens after someone pays for a magazine membership.
// The payment is confirmed with Flutterwave, the subscription is marked as
// paid, and the PDFs for the chosen tier are emailed.
//
// Not a 'use server' module: `confirmMagazinePayment` in actions/magazine.ts
// is the one entry point the browser can call.

import { promises as fs } from 'fs';
import path from 'path';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '@/firebase/firebaseConfig';
import { FIRESTORE_COLLECTIONS, WEPHCO_MEMBERSHIP_TIERS } from '@/lib/constants';
import { MagazinePdf, sendMagazineEmail } from '@/lib/magazineEmail';

const COLLECTION_NAME = FIRESTORE_COLLECTIONS.MAGAZINES;

// ---------------------------------------------------------------------------
// Which PDFs each tier receives
// ---------------------------------------------------------------------------

interface MagazineDocument {
  /** Recorded on the subscription once this document has been emailed */
  key: string;
  /** File name inside the public folder */
  file: string;
  title: string;
  description: string;
  /** Small heading at the top of the email */
  issueTitle: string;
  subject: string;
}

const WIMAO: MagazineDocument = {
  key: 'wimao',
  file: 'WIMAO.pdf',
  title: 'WIMAO Magazine',
  description: 'Your digital edition',
  issueTitle: 'Your Digital Edition',
  subject: 'Your copy of WIMAO Magazine',
};

const INVESTMENT_INTELLIGENCE: MagazineDocument = {
  key: 'investment-intelligence',
  file: 'Investment_Intelligence.pdf',
  title: 'Investment Intelligence',
  description: 'Your investment intelligence report',
  issueTitle: 'Investment Intelligence Report',
  subject: 'Your Investment Intelligence report',
};

/** Executive members receive the magazine only; every other paid tier receives both. */
export const getDocumentsForTier = (tierId: string): MagazineDocument[] =>
  tierId === 'executive' ? [WIMAO] : [WIMAO, INVESTMENT_INTELLIGENCE];

// ---------------------------------------------------------------------------
// Payment verification
// ---------------------------------------------------------------------------

type Verification =
  | { ok: true; transactionId: string; amount: number; currency: string }
  | { ok: false; reason: 'unavailable' | 'not_paid'; detail: string };

/**
 * Asks Flutterwave whether the payment for `txRef` really went through, and
 * for at least the expected amount. The browser's word is never taken for it.
 */
const verifyPayment = async ({
  txRef,
  transactionId,
  expectedAmount,
  expectedCurrency,
}: {
  txRef: string;
  transactionId?: string;
  expectedAmount: number;
  expectedCurrency: string;
}): Promise<Verification> => {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    return { ok: false, reason: 'unavailable', detail: 'FLUTTERWAVE_SECRET_KEY is not set' };
  }

  const url =
    transactionId && /^\d+$/.test(transactionId)
      ? `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`
      : `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`;

  let body: any;
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: 'no-store',
    });
    body = await response.json().catch(() => null);

    if (response.status === 401 || response.status === 403) {
      return { ok: false, reason: 'unavailable', detail: 'Flutterwave rejected the secret key' };
    }
    if (response.status >= 500) {
      return { ok: false, reason: 'unavailable', detail: `Flutterwave returned ${response.status}` };
    }
  } catch (error) {
    return { ok: false, reason: 'unavailable', detail: `Could not reach Flutterwave: ${(error as Error).message}` };
  }

  const data = body?.data;
  if (body?.status !== 'success' || !data) {
    return { ok: false, reason: 'not_paid', detail: body?.message || 'No such transaction' };
  }
  if (data.status !== 'successful') {
    return { ok: false, reason: 'not_paid', detail: `Transaction status is "${data.status}"` };
  }
  if (data.tx_ref !== txRef) {
    return { ok: false, reason: 'not_paid', detail: 'Transaction belongs to a different reference' };
  }
  if (String(data.currency).toUpperCase() !== expectedCurrency.toUpperCase()) {
    return { ok: false, reason: 'not_paid', detail: `Paid in ${data.currency}, expected ${expectedCurrency}` };
  }
  if (Number(data.amount) < expectedAmount) {
    return { ok: false, reason: 'not_paid', detail: `Paid ${data.amount}, expected ${expectedAmount}` };
  }

  return { ok: true, transactionId: String(data.id), amount: Number(data.amount), currency: String(data.currency) };
};

// ---------------------------------------------------------------------------
// Sending
// ---------------------------------------------------------------------------

/** True when the link really serves a PDF right now. */
const servesPdf = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-store', signal: AbortSignal.timeout(5000) });
    return response.ok && (response.headers.get('content-type') || '').toLowerCase().includes('pdf');
  } catch {
    return false;
  }
};

/**
 * The ways a PDF can be attached, in the order they should be tried.
 *
 * On the live site the email provider is given a link to the site's own copy
 * and downloads it itself, which avoids uploading a 10 MB file from the server
 * on every purchase. The provider accepts a link without checking it, and the
 * email would then fail later with nobody told, so the link is only used once
 * it has been confirmed to serve the PDF. Reading the file from disk is the
 * fallback, and the only option on a machine the provider cannot reach, such
 * as localhost.
 */
const pdfSources = async (
  file: string,
  siteOrigin: string | null
): Promise<(() => Promise<Pick<MagazinePdf, 'content' | 'url'>>)[]> => {
  const fromDisk = async () => ({ content: await fs.readFile(path.join(process.cwd(), 'public', file)) });

  const isPublicSite =
    !!siteOrigin && /^https:///.test(siteOrigin) && !///(localhost|127.|[::1])/.test(siteOrigin);
  const url = `${siteOrigin}/${file}`;

  return isPublicSite && (await servesPdf(url)) ? [async () => ({ url }), fromDisk] : [fromDisk];
};

export type MagazineFulfilmentResult =
  | {
      outcome: 'sent' | 'already_sent';
      name: string;
      email: string;
      tierName: string;
      documents: string[];
    }
  | {
      /** not_found: no such subscription. not_paid: Flutterwave did not confirm it.
       *  unavailable: the payment could not be checked right now.
       *  in_progress: another request is sending the emails.
       *  email_failed: paid, but one or more emails did not go out. */
      outcome: 'not_found' | 'not_paid' | 'unavailable' | 'in_progress' | 'email_failed';
      name?: string;
      email?: string;
    };

// A claim older than this is treated as abandoned, so a crashed attempt can be retried
const CLAIM_TIMEOUT_MS = 5 * 60 * 1000;

export const fulfilMagazineSubscription = async ({
  txRef,
  transactionId,
  siteOrigin,
}: {
  txRef: string;
  transactionId?: string;
  siteOrigin: string | null;
}): Promise<MagazineFulfilmentResult> => {
  if (!txRef) return { outcome: 'not_found' };

  const snapshot = await db.collection(COLLECTION_NAME).where('txRef', '==', txRef).limit(1).get();
  if (snapshot.empty) return { outcome: 'not_found' };

  const ref = snapshot.docs[0].ref;
  const subscription = snapshot.docs[0].data();
  const name: string = subscription.name || 'Subscriber';
  const email: string = subscription.email || '';

  // The price comes from the tier list, never from what the browser submitted
  const tier = WEPHCO_MEMBERSHIP_TIERS.find((candidate) => candidate.id === subscription.tierId);
  if (!tier || tier.priceAmount <= 0 || !email) return { outcome: 'not_found' };

  const documents = getDocumentsForTier(tier.id);
  const summary = { name, email, tierName: tier.name, documents: documents.map((document) => document.title) };

  if (subscription.emailStatus === 'sent') {
    return { outcome: 'already_sent', ...summary };
  }

  const verification = await verifyPayment({
    txRef,
    transactionId,
    expectedAmount: tier.priceAmount,
    expectedCurrency: tier.currency,
  });

  if (!verification.ok) {
    console.error(`Magazine payment ${txRef} was not confirmed (${verification.reason}): ${verification.detail}`);
    return { outcome: verification.reason, name, email };
  }

  // Claim the send inside a transaction so that two requests arriving together
  // (a refresh, a double render) cannot both email the subscriber.
  const claim = await db.runTransaction(async (transaction) => {
    const current = (await transaction.get(ref)).data() || {};

    if (current.emailStatus === 'sent') return 'already_sent' as const;

    const claimedAt = current.emailClaimedAt?.toDate?.()?.getTime?.() ?? 0;
    if (current.emailStatus === 'sending' && Date.now() - claimedAt < CLAIM_TIMEOUT_MS) {
      return 'in_progress' as const;
    }

    transaction.update(ref, {
      status: 'paid',
      paidAt: current.paidAt || new Date(),
      transactionId: verification.transactionId,
      amountPaid: verification.amount,
      currencyPaid: verification.currency,
      emailStatus: 'sending',
      emailClaimedAt: new Date(),
    });

    return (Array.isArray(current.emailsSent) ? current.emailsSent : []) as string[];
  });

  if (claim === 'already_sent') return { outcome: 'already_sent', ...summary };
  if (claim === 'in_progress') return { outcome: 'in_progress', name, email };

  // One email per document: together the PDFs are too large for most mailboxes.
  // Anything already delivered by an earlier, partly failed attempt is skipped.
  const pending = documents.filter((document) => !claim.includes(document.key));

  // Sent one after the other: uploading two large attachments at once is
  // slow enough for the provider to time the requests out.
  const results: boolean[] = [];

  for (const document of pending) {
    const position = documents.indexOf(document) + 1;
    const others = documents.filter((other) => other !== document).map((other) => other.title);
    let sent = false;

    for (const source of await pdfSources(document.file, siteOrigin)) {
      try {
        const result = await sendMagazineEmail({
          to: email,
          subscriberName: name,
          subject:
            documents.length > 1 ? `${document.subject} (${position} of ${documents.length})` : document.subject,
          magazineName: 'WIMAO Magazine',
          issueTitle: document.issueTitle,
          issueSummary:
            `Thank you for joining ${tier.name}. Your payment has been confirmed and your copy of ${document.title} is attached to this email.` +
            (others.length > 0 ? ` ${others.join(' and ')} is on its way to you in a separate email.` : ''),
          highlights: [],
          pdfs: [
            {
              title: document.title,
              description: document.description,
              filename: document.file,
              ...(await source()),
            },
          ],
        });

        if (result.success) {
          sent = true;
          break;
        }
        console.error(`Magazine email "${document.key}" for ${txRef} was not sent:`, result.error);
      } catch (error) {
        console.error(`Magazine email "${document.key}" for ${txRef} failed:`, error);
      }
    }

    if (sent) {
      await ref.update({ emailsSent: FieldValue.arrayUnion(document.key) });
    }
    results.push(sent);
  }

  const allSent = results.every(Boolean);
  await ref.update(
    allSent ? { emailStatus: 'sent', emailSentAt: new Date() } : { emailStatus: 'failed' }
  );

  return allSent ? { outcome: 'sent', ...summary } : { outcome: 'email_failed', name, email };
};
