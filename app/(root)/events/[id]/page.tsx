'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Award,
  Shield,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { MOCK_EVENTS } from '../data';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import { toast } from 'react-toastify';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const event = MOCK_EVENTS.find((e) => e.id === id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [investmentTier, setInvestmentTier] = useState('$200k - $1M');
  const [preferences, setPreferences] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col items-center justify-center gap-4 pt-24">
        <h2 className="text-3xl font-bold">Event Not Found</h2>
        <Link
          href="/events"
          className="px-6 py-2.5 bg-primary text-background-dark font-bold rounded-lg transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.warning('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);

      // Save RSVP to Firestore 'eventRSVPs' collection
      await addDoc(collection(db, 'eventRSVPs'), {
        eventId: event.id,
        eventTitle: event.title,
        attendeeName: name,
        email: email,
        phone: phone,
        investmentTier: investmentTier,
        preferences: preferences || 'No special preferences requested.',
        verified: false,
        createdAt: new Date(),
      });

      toast.success(
        'Your VIP invitation request has been submitted successfully! Our concierge team will contact you shortly.'
      );

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setInvestmentTier('$200k - $1M');
      setPreferences('');
    } catch (error) {
      console.error('Error submitting RSVP: ', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans pt-20 selection:bg-primary selection:text-background-dark">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[140px] pointer-events-none z-0" />

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-wider group">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />{' '}
            Back to Events
          </Link>
        </div>

        {/* Title Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-primary/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary text-background-dark shadow-sm">
                {event.scope}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900 border border-primary/20 text-primary">
                {event.format}
              </span>
              {event.isPast && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/80 text-red-400 border border-red-900/30">
                  Completed
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {!event.isPast && event.seatsRemaining !== undefined && (
            <div className="bg-amber-950/30 border border-amber-500/20 px-5 py-3 rounded-xl">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">
                Availability
              </p>
              <p className="text-lg font-black text-white flex items-center gap-2">
                <Users className="size-5 text-amber-500" />
                <span>{event.seatsRemaining} VIP Seats Left</span>
              </p>
            </div>
          )}
        </div>

        {/* Feature Gallery Banner */}
        <div className="relative w-full aspect-video md:h-[480px] overflow-hidden rounded-2xl border border-primary/10 shadow-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-4">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Extended Long Description */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-6 h-[2px] bg-primary"></span>
                The Experience
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light whitespace-pre-line">
                {event.longDescription || event.description}
              </p>
            </section>

            {/* Highlights Grid */}
            {event.highlights && event.highlights.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-primary">
                  Exhibition Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-4 rounded-xl bg-slate-900/50 border border-primary/5">
                      <CheckCircle2 className="text-primary size-5 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Event Timeline / Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  Event Agenda
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-[11px] before:w-[2px] before:bg-primary/20">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="relative pl-10">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <div className="w-2 h-2 rounded-full bg-slate-950"></div>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-bold text-sm md:text-base text-white">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          {item.time}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-400 mt-1.5 font-light leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Host Speakers profiles */}
            {event.hosts && event.hosts.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  Hosted By
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.hosts.map((host, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-primary/5">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary/20 shrink-0">
                        <Image
                          src={host.image}
                          alt={host.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-white">
                          {host.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {host.role}
                        </p>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider">
                          Wephco Advisory
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar Form */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-slate-900/60 backdrop-blur-md border border-primary/20 p-8 rounded-2xl shadow-2xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  {event.isPast ? 'Showcase Concluded' : 'Request Invitation'}
                </h3>
                <p className="text-xs text-slate-400">
                  {event.isPast
                    ? 'This showcase has ended. Apply below to request notifications for upcoming shows.'
                    : 'Submit your profile to apply for private invitation access.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+234..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Target Portfolio Range
                  </label>
                  <select
                    value={investmentTier}
                    onChange={(e) => setInvestmentTier(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option value="$200k - $1M">
                      Price Range: $200k - $1M
                    </option>
                    <option value="$2M - $5M">Price Range: $2M - $5M</option>
                    <option value="$6M - $10M">Price Range: $6M - $10M</option>
                    <option value="$10M+">Price Range: $10M+</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Special Preferences
                  </label>
                  <textarea
                    placeholder="Dietary requests, transport coordinates, airport concierge requirements..."
                    rows={3}
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-background-dark font-extrabold uppercase py-3 rounded-lg hover:shadow-lg hover:shadow-primary/10 transition-all text-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5">
                  <Award className="size-4 shrink-0" />
                  <span>
                    {submitting ? 'Submitting VIP RSVP...' : 'Submit Request'}
                  </span>
                </button>
              </form>

              {/* Safety/Security assurance */}
              <div className="pt-4 border-t border-primary/5 text-center">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                  <Shield className="size-3.5 text-primary shrink-0" /> Secured
                  Encryption Protocols
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
