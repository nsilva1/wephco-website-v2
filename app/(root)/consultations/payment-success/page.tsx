'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Video,
  User,
  ShieldCheck,
  Copy,
  Printer,
  Download,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  Home,
  FileCheck,
  Star,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'react-toastify';

function ConsultationSuccessContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Query parameters with fallbacks
  const status = searchParams.get('status') || searchParams.get('tx_status') || 'successful';
  const bookingId =
    searchParams.get('tx_ref') ||
    searchParams.get('booking_id') ||
    searchParams.get('transaction_id') ||
    `WEP-CNS-${Math.floor(100000 + Math.random() * 900000)}`;
  const serviceName = searchParams.get('service') || 'Private Consulting';
  const clientName = searchParams.get('name') || 'Valued Client';
  const email = searchParams.get('email') || 'client@wephco.com';
  const amount = searchParams.get('amount') || '500';
  const currency = searchParams.get('currency') || 'USD';
  const meetingLocation = searchParams.get('location') || 'virtual';
  const meetingDateStr = searchParams.get('date') || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
  const meetingTime = searchParams.get('time') || '11:00 AM (GMT+1)';

  const formattedDate = new Date(meetingDateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const googleMeetUrl = 'https://meet.google.com/vfg-kjnq-jqa?hs=186';
  const officeAddress = 'Los Angeles Mall, Kado, Abuja, Nigeria';

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    toast.success('Booking reference copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyMeetingLink = () => {
    const linkToCopy = meetingLocation === 'virtual' ? googleMeetUrl : officeAddress;
    navigator.clipboard.writeText(linkToCopy);
    setCopiedLink(true);
    toast.success(
      meetingLocation === 'virtual'
        ? 'Meeting link copied!'
        : 'Office address copied!'
    );
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Generate .ics calendar invite file download
  const handleDownloadCalendarInvite = () => {
    const title = `WEPHCO Private Consultation (${serviceName})`;
    const description = `Private Real Estate Advisory session with WEPHCO Senior Advisory Partner.\\nBooking Reference: ${bookingId}`;
    const location = meetingLocation === 'virtual' ? googleMeetUrl : officeAddress;

    const startDate = new Date(meetingDateStr);
    startDate.setHours(11, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(12, 0, 0);

    const formatDateForIcs = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const csContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WEPHCO Real Estate//Consultation Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${formatDateForIcs(startDate)}`,
      `DTEND:${formatDateForIcs(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([csContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `WEPHCO_Consultation_${bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Calendar event (.ics) downloaded!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
      {/* ----------------------------------------------------------------- */}
      {/* SUCCESS HEADER */}
      {/* ----------------------------------------------------------------- */}
      <div className="text-center space-y-6 mb-12">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse scale-150" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-b from-primary/30 via-slate-900 to-background-dark border-2 border-primary flex items-center justify-center shadow-2xl shadow-primary/30">
            <Star className="w-12 h-12 sm:w-14 sm:h-14 text-primary animate-bounce-short" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Consultation <span className="text-primary italic">Confirmed</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Welcome, <strong className="text-white font-semibold">{clientName}</strong>. Your private advisory session for <strong className="text-primary font-bold">{serviceName}</strong> has been successfully booked and confirmed.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* MAIN BOOKING & PAYMENT SUMMARY CARD */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Reference & Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-primary/15 pb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Transaction Reference
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
                {bookingId}
              </span>
              <button
                onClick={handleCopyBookingId}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-primary border border-primary/20 transition-all cursor-pointer"
                title="Copy booking ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Payment Verification
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Meeting Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/70 p-6 rounded-2xl border border-primary/20">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-primary">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-extrabold uppercase tracking-wider">Scheduled Date &amp; Time</span>
            </div>
            <div>
              <p className="text-base font-bold text-white">{formattedDate}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> {meetingTime}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-primary">
              {meetingLocation === 'virtual' ? (
                <Video className="w-5 h-5" />
              ) : (
                <MapPin className="w-5 h-5" />
              )}
              <span className="text-xs font-extrabold uppercase tracking-wider">Meeting Format / Venue</span>
            </div>
            <div>
              <p className="text-base font-bold text-white">
                {meetingLocation === 'virtual' ? 'Virtual Video Conference (Google Meet)' : 'Abuja Executive Suite'}
              </p>
              {meetingLocation === 'virtual' ? (
                <div className="flex items-center gap-2 mt-1.5">
                  <p className="text-xs text-primary font-medium hover:underline flex items-center gap-1 truncate">
                    <span>Meeting link will be sent to your email address</span>
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-1">{officeAddress}</p>
              )}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* PREPARATION & AGENDA CHECKLIST */}
        {/* ----------------------------------------------------------------- */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" /> Session Preparation Checklist
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-primary/10 space-y-1.5">
              <div className="text-xs font-extrabold text-primary flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">1</span>
                <span>Define Scope</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Outline acquisition target geographies (e.g. Abu Dhabi, London, Abuja) or portfolio goals.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-primary/10 space-y-1.5">
              <div className="text-xs font-extrabold text-primary flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</span>
                <span>Calendar Sync</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download the .ics calendar file below or add the Google Meet link to your schedule.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-primary/10 space-y-1.5">
              <div className="text-xs font-extrabold text-primary flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">3</span>
                <span>Prompt Arrival</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Join the video suite or arrive at the executive office 5 minutes before scheduled start time.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-primary/15">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadCalendarInvite}
              className="px-4 py-2.5 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Add to Calendar (.ics)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/consultations"
              className="px-5 py-2.5 rounded-xl bg-primary text-background-dark font-extrabold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <span>Back to Consultations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* DIRECT VIP SUPPORT FOOTER */}
      {/* ----------------------------------------------------------------- */}
      <div className="mt-10 text-center space-y-3 p-6 rounded-2xl bg-slate-900/40 border border-primary/10">
        <p className="text-xs text-slate-400">
          Need to reschedule or speak directly with your assigned advisory team?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-primary font-bold">
          <a
            href="mailto:contact@wephco.com"
            className="flex items-center gap-1.5 hover:underline"
          >
            <Mail className="w-3.5 h-3.5" /> contact@wephco.com
          </a>
          <a
            href="tel:+2349161246300"
            className="flex items-center gap-1.5 hover:underline"
          >
            <Phone className="w-3.5 h-3.5" /> Executive Advisory Desk
          </a>
          <Link href="/" className="flex items-center gap-1.5 hover:underline">
            <Home className="w-3.5 h-3.5" /> Return to WEPHCO Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConsultationPaymentSuccessPage() {
  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans pt-20 overflow-x-hidden">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ConsultationSuccessContent />
      </Suspense>
    </div>
  );
}
