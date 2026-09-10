'use client';

import React, { Suspense, useState } from 'react';
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
} from 'lucide-react';
import { toast } from 'react-toastify';

function MagazineSuccessContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  // Extract transaction query parameters with fallbacks
  const status = searchParams.get('status') || searchParams.get('tx_status') || 'successful';
  const txRef =
    searchParams.get('tx_ref') ||
    searchParams.get('transaction_id') ||
    searchParams.get('txRef') ||
    `WEP-MAG-${Math.floor(100000 + Math.random() * 900000)}`;
  const customerName = searchParams.get('name') || 'Valued Subscriber';
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const handleCopyRef = () => {
    navigator.clipboard.writeText(txRef);
    setCopied(true);
    toast.success('Transaction reference copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
      {/* ----------------------------------------------------------------- */}
      {/* SUCCESS BANNER HEADER */}
      {/* ----------------------------------------------------------------- */}
      <div className="text-center space-y-6 mb-12">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse scale-150" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-b from-primary/30 via-slate-900 to-background-dark border-2 border-primary flex items-center justify-center shadow-2xl shadow-primary/30">
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-primary animate-bounce-short" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to <span className="text-primary italic">Wephco Wimoa Magazine</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Thank you, <strong className="text-white font-semibold">{customerName}</strong>. Your subscription has been processed successfully.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TRANSACTION RECEIPT CARD */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header & Reference */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-primary/15 pb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Transaction Reference
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
                {txRef}
              </span>
              <button
                onClick={handleCopyRef}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-primary border border-primary/20 transition-all cursor-pointer"
                title="Copy reference number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Payment Status
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Receipt Line Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-950/60 p-5 sm:p-6 rounded-2xl border border-white/5">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Publication
            </span>
            <p className="text-sm font-bold text-white mt-1">Wephco Wimoa Magazine</p>
            <p className="text-xs text-slate-400">Global Luxury &amp; Real Estate</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Date &amp; Time
            </span>
            <p className="text-xs font-semibold text-white mt-1">{formattedDate}</p>
            <p className="text-[11px] text-slate-400">{formattedTime}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Confirmation Email
            </span>
            <p className="text-[11px] text-emerald-400 font-medium">Confirmation Sent ✓</p>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-primary/15">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyRef}
              className="px-4 py-2.5 rounded-xl border border-primary/30 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4 text-primary" /> {copied ? 'Copied!' : 'Copy Reference'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/magazine"
              className="px-5 py-2.5 rounded-xl bg-primary text-background-dark font-extrabold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <span>Back to Magazine Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* NEED ASSISTANCE / SUPPORT FOOTER */}
      {/* ----------------------------------------------------------------- */}
      <div className="mt-10 text-center space-y-3 p-6 rounded-2xl bg-slate-900/40 border border-primary/10">
        <p className="text-xs text-slate-400">
          Have questions about your subscription dispatch or digital reader access?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-primary font-bold">
          <a
            href="mailto:contact@wephco.com"
            className="flex items-center gap-1.5 hover:underline"
          >
            <Mail className="w-3.5 h-3.5" /> contact@wephco.com
          </a>
          <Link href="/contact-us" className="flex items-center gap-1.5 hover:underline">
            <FileText className="w-3.5 h-3.5" /> Contact Support Concierge
          </Link>
          <Link href="/" className="flex items-center gap-1.5 hover:underline">
            <Home className="w-3.5 h-3.5" /> Return to WEPHCO Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MagazinePaymentSuccessPage() {
  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans pt-20 overflow-x-hidden">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <MagazineSuccessContent />
      </Suspense>
    </div>
  );
}
