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
  Ticket,
} from 'lucide-react';
import { MOCK_EVENTS } from '../data';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import { reserveEventSeat } from '@/actions/events';
import { toast } from 'react-toastify';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seatsToReserve, setSeatsToReserve] = useState('1');
  const [investmentTier, setInvestmentTier] = useState('$200k - $1M');
  const [preferences, setPreferences] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch Event from Firestore (or fallback to MOCK_EVENTS)
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Try fetching from Firestore 'events' collection
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setEvent({
            id: docSnap.id,
            title: data.title || '',
            description: data.description || '',
            longDescription: data.longDescription || data.description || '',
            date: data.date || '',
            time: data.time || '',
            location: data.location || '',
            image: data.image || '',
            scope: data.scope || 'Local',
            format: data.format || 'Physical',
            seatsRemaining: data.seatsRemaining !== undefined && data.seatsRemaining !== null ? Number(data.seatsRemaining) : null,
            isPast: data.isPast || false,
            highlights: data.highlights || [],
            agenda: data.agenda || [],
            hosts: data.hosts || [],
            hasGallery: data.hasGallery || false,
            galleryImages: data.galleryImages || [],
          });
        } else {
          // Fallback to MOCK_EVENTS if not in Firestore
          const mock = MOCK_EVENTS.find((e) => e.id === id);
          setEvent(mock || null);
        }
      } catch (err) {
        console.error('Error fetching event details from Firestore:', err);
        const mock = MOCK_EVENTS.find((e) => e.id === id);
        setEvent(mock || null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

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

  const isSoldOut = event.seatsRemaining !== null && event.seatsRemaining !== undefined && event.seatsRemaining <= 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.warning('Please fill in all required fields');
      return;
    }

    if (isSoldOut) {
      toast.warning('Sorry, this event is fully reserved.');
      return;
    }

    try {
      setSubmitting(true);

      const count = Number(seatsToReserve) || 1;

      // Reserve seat via server action which updates Firestore seatsRemaining and adds RSVP record
      const res = await reserveEventSeat({
        eventId: event.id,
        seatsCount: count,
        attendeeName: name,
        email: email,
        phone: phone,
        investmentTier: investmentTier,
        preferences: preferences,
      });

      if (res.success) {
        // Update local event state to reflect new remaining seats
        if (res.remainingSeats !== undefined) {
          setEvent((prev: any) => ({
            ...prev,
            seatsRemaining: res.remainingSeats,
          }));
        }

        toast.success(
          `Successfully reserved ${count} VIP seat(s) for ${event.title}! Our concierge team will contact you shortly.`
        );

        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setSeatsToReserve('1');
        setInvestmentTier('$200k - $1M');
        setPreferences('');
      } else {
        toast.error(res.error || 'Failed to reserve seat. Please try again.');
      }
    } catch (error) {
      console.error('Error reserving seat: ', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans pt-20 selection:bg-primary selection:text-background-dark">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-100 h-100 bg-primary/3 rounded-full blur-[140px] pointer-events-none z-0" />

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
              {event.isPast ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-950/80 text-red-400 border border-red-900/30">
                  Completed
                </span>
              ) : isSoldOut ? (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-900/80 text-white border border-red-500">
                  Fully Reserved
                </span>
              ) : null}
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

          {!event.isPast && event.seatsRemaining !== undefined && event.seatsRemaining !== null && (
            <div className={`px-5 py-3 rounded-xl border ${isSoldOut ? 'bg-red-950/30 border-red-500/30' : 'bg-amber-950/30 border-amber-500/20'}`}>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isSoldOut ? 'text-red-400' : 'text-amber-500'}`}>
                Availability
              </p>
              <p className="text-lg font-black text-white flex items-center gap-2">
                <Users className={`size-5 ${isSoldOut ? 'text-red-400' : 'text-amber-500'}`} />
                <span>{isSoldOut ? 'Fully Reserved' : `${event.seatsRemaining} VIP Seats Left`}</span>
              </p>
            </div>
          )}
        </div>

        {/* Feature Gallery Banner */}
        {event.image && (
          <div className="relative w-full aspect-video md:h-120 overflow-hidden rounded-2xl border border-primary/10 shadow-2xl">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-4">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Extended Long Description */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-6 h-0.5 bg-primary"></span>
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
                  {event.highlights.map((highlight: string, index: number) => (
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
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-2.75 before:w-0.5 before:bg-primary/20">
                  {event.agenda.map((item: any, index: number) => (
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
                  {event.hosts.map((host: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-primary/5">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primary/20 shrink-0">
                        {host.image ? (
                          <Image
                            src={host.image}
                            alt={host.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                            Host
                          </div>
                        )}
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
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Ticket className="size-5 text-primary" />
                  {event.isPast ? 'Showcase Concluded' : isSoldOut ? 'Event Fully Reserved' : 'Reserve Your Seat'}
                </h3>
                <p className="text-xs text-slate-400">
                  {event.isPast
                    ? 'This showcase has ended. Apply below to request notifications for upcoming shows.'
                    : isSoldOut
                      ? 'All VIP seats for this event are currently reserved.'
                      : 'Select your seat quantity and submit your details to reserve your spot.'}
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
                    disabled={isSoldOut || event.isPast}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    disabled={isSoldOut || event.isPast}
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    disabled={isSoldOut || event.isPast}
                    placeholder="+234..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">
                      Seats to Reserve *
                    </label>
                    <select
                      value={seatsToReserve}
                      disabled={isSoldOut || event.isPast}
                      onChange={(e) => setSeatsToReserve(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-50">
                      <option value="1">1 Seat</option>
                      <option value="2">2 Seats</option>
                      <option value="3">3 Seats</option>
                      <option value="4">4 Seats</option>
                      <option value="5">5 Seats</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">
                      Target Portfolio
                    </label>
                    <select
                      value={investmentTier}
                      disabled={isSoldOut || event.isPast}
                      onChange={(e) => setInvestmentTier(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-50">
                      <option value="$200k - $1M">$200k - $1M</option>
                      <option value="$2M - $5M">$2M - $5M</option>
                      <option value="$6M - $10M">$6M - $10M</option>
                      <option value="$10M+">$10M+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">
                    Special Preferences
                  </label>
                  <textarea
                    disabled={isSoldOut || event.isPast}
                    placeholder="Dietary requests, transport coordinates, airport concierge requirements..."
                    rows={3}
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 resize-none disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || isSoldOut || event.isPast}
                  className="w-full bg-primary text-background-dark font-extrabold uppercase py-3 rounded-lg hover:shadow-lg hover:shadow-primary/10 transition-all text-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5">
                  <Ticket className="size-4 shrink-0" />
                  <span>
                    {submitting
                      ? 'Reserving Seat...'
                      : isSoldOut
                        ? 'Fully Reserved'
                        : event.isPast
                          ? 'Event Concluded'
                          : `Reserve ${seatsToReserve} Seat(s)`}
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
