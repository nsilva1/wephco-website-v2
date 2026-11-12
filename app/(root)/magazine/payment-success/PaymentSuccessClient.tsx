'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  ArrowRight,
  ShieldCheck,
  Mail,
  Home,
  FileText,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { confirmMagazinePayment } from '@/actions/magazine';

type Confirmation = Awaited<ReturnType<typeof confirmMagazinePayment>>;

// What to tell the subscriber when the payment could not be confirmed or the
// emails could not be sent. `retry` offers a "check again" button.
const PROBLEMS: Record<
  Exclude<Confirmation['outcome'], 'sent' | 'already_sent'>,
  { title: string; message: string; retry: boolean }
> = {
  not_found: {
    title: 'We could not find this subscription',
    message:
      'This payment reference does not match a subscription. If you have been charged, please contact us with the reference below and we will sort it out.',
    retry: false,
  },
  not_paid: {
    title: 'Payment not confirmed',
    message:
      'We have not received confirmation of this payment, so your subscription has not been activated. If you completed the payment, wait a moment and check again. If you were charged, contact us with the reference below.',
    retry: true,
  },
  unavailable: {
    title: 'We could not confirm your payment yet',
    message:
      'We were unable to check this payment just now. If you paid, your money is safe. Please check again in a moment, or contact us with the reference below and we will send your copy.',
    retry: true,
  },
  in_progress: {
    title: 'Your copy is being sent',
    message:
      'Your payment is confirmed and your email is on its way. This can take a minute because of the size of the attachments.',
    retry: true,
  },
  email_failed: {
    title: 'Payment received, but the email did not go out',
    message:
      'Your payment is confirmed and your subscription is active, but we could not send your copy just now. Please try again, or contact us with the reference below.',
    retry: true,
  },
};

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [checking, setChecking] = useState(true);
  const startedRef = useRef(false);

  const txRef = searchParams.get('tx_ref') || searchParams.get('txRef') || '';
  const transactionId = searchParams.get('transaction_id') || '';
  const cancelled = (searchParams.get('status') || '').toLowerCase() === 'cancelled';

  const confirm = async () => {
    if (!txRef || cancelled) {
      setConfirmation({ outcome: txRef ? 'not_paid' : 'not_found' });
      setChecking(false);
      return;
    }

    setChecking(true);
    try {
      setConfirmation(await confirmMagazinePayment({ txRef, transactionId }));
    } catch (error) {
      console.error('Could not confirm magazine payment:', error);
      setConfirmation({ outcome: 'unavailable' });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    // The ref stops a second run (React runs effects twice in development)
    if (startedRef.current) return;
    startedRef.current = true;
    confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(txRef);
    setCopied(true);
    toast.success('Transaction reference copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const supportFooter = (
    <div className="mt-10 text-center space-y-3 p-6 rounded-2xl bg-slate-900/40 border border-primary/10">
      <p className="text-xs text-slate-400">
        Have questions about your subscription or your copy?
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-primary font-bold">
        <a
          href="mailto:contact@wephco.com"
          className="flex items-center gap-1.5 hover:underline">
          <Mail className="w-3.5 h-3.5" /> contact@wephco.com
        </a>
        <Link
          href="/contact-us"
          className="flex items-center gap-1.5 hover:underline">
          <FileText className="w-3.5 h-3.5" /> Contact Support Concierge
        </Link>
        <Link href="/" className="flex items-center gap-1.5 hover:underline">
          <Home className="w-3.5 h-3.5" /> Return to WEPHCO Home
        </Link>
      </div>
    </div>
  );

  const referenceBlock = txRef && (
    <div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
        Transaction Reference
      </span>
      <div className="flex items-center gap-2.5 mt-1">
        <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wide break-all">
          {txRef}
        </span>
        <button
          onClick={handleCopyRef}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-primary border border-primary/20 transition-all cursor-pointer shrink-0"
          title="Copy reference number">
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------
  // Checking
  // ---------------------------------------------------------------------
  if (checking || !confirmation) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center space-y-6">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Confirming your payment
        </h1>
        <p className="text-slate-300 text-sm font-light leading-relaxed">
          Please keep this page open. Once your payment is confirmed we will
          email your copy, which can take up to a minute.
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // Not confirmed, or the email could not be sent
  // ---------------------------------------------------------------------
  if (confirmation.outcome !== 'sent' && confirmation.outcome !== 'already_sent') {
    const problem = PROBLEMS[confirmation.outcome];
    const isWaiting = confirmation.outcome === 'in_progress';

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/50 mx-auto">
            {isWaiting ? (
              <Mail className="w-9 h-9 text-amber-400" />
            ) : (
              <AlertTriangle className="w-9 h-9 text-amber-400" />
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {problem.title}
            </h1>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              {problem.message}
            </p>
          </div>

          {txRef && (
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 text-left">
              {referenceBlock}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {problem.retry && (
              <button
                onClick={confirm}
                className="px-5 py-2.5 rounded-xl bg-primary text-background-dark font-extrabold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer">
                <RefreshCw className="w-4 h-4" /> Check again
              </button>
            )}
            <Link
              href="/magazine"
              className="px-5 py-2.5 rounded-xl border border-primary/30 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all">
              Back to Magazine
            </Link>
          </div>
        </div>

        {supportFooter}
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // Confirmed and sent
  // ---------------------------------------------------------------------
  const documentCount = confirmation.documents.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
      <div className="text-center space-y-6 mb-12">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse scale-150" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-b from-primary/30 via-slate-900 to-background-dark border-2 border-primary flex items-center justify-center shadow-2xl shadow-primary/30">
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to{' '}
            <span className="text-primary italic">WIMAO Magazine</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Thank you,{' '}
            <strong className="text-white font-semibold">
              {confirmation.name}
            </strong>
            . Your payment is confirmed and your {confirmation.tierName}{' '}
            membership is active.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-primary/15 pb-6">
          {referenceBlock}

          <div className="sm:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Payment Status
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
            </span>
          </div>
        </div>

        {/* What was emailed */}
        <div className="bg-slate-950/60 p-5 sm:p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">
                {documentCount > 1
                  ? `We have sent ${documentCount} emails to `
                  : 'We have emailed your copy to '}
                <span className="text-primary break-all">
                  {confirmation.email}
                </span>
              </p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {documentCount > 1
                  ? 'Each email carries one PDF as an attachment. They are large files, so allow a few minutes and check your spam folder if they have not arrived.'
                  : 'The PDF is attached to the email. It is a large file, so allow a few minutes and check your spam folder if it has not arrived.'}
              </p>
            </div>
          </div>

          <ul className="space-y-2 border-t border-white/5 pt-4">
            {confirmation.documents.map((document) => (
              <li
                key={document}
                className="flex items-center gap-2.5 text-sm text-slate-200">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <span>{document}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Sent ✓
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-primary/15">
          <button
            onClick={handleCopyRef}
            className="px-4 py-2.5 rounded-xl border border-primary/30 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer">
            <Copy className="w-4 h-4 text-primary" />{' '}
            {copied ? 'Copied!' : 'Copy Reference'}
          </button>

          <Link
            href="/magazine"
            className="px-5 py-2.5 rounded-xl bg-primary text-background-dark font-extrabold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
            <span>Back to Magazine Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {supportFooter}
    </div>
  );
}
