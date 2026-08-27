'use client';

import React, { useState } from 'react';
import { X, Send, Award, Ticket } from 'lucide-react';
import { toast } from 'react-toastify';
import { EventItem } from './EventCard';
import { reserveEventSeat } from '@/actions/events';

interface PrivateRSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
}

export function PrivateRSVPModal({
  isOpen,
  onClose,
  event,
}: PrivateRSVPModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seatsToReserve, setSeatsToReserve] = useState('1');
  const [investmentTier, setInvestmentTier] = useState('$200k - $1M');
  const [preferences, setPreferences] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const isSoldOut = event.seatsRemaining !== undefined && event.seatsRemaining !== null && event.seatsRemaining <= 0;

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
      setIsSubmitting(true);
      const count = Number(seatsToReserve) || 1;

      const res = await reserveEventSeat({
        eventId: event.id!,
        seatsCount: count,
        attendeeName: name,
        email: email,
        phone: phone,
        investmentTier: investmentTier,
        preferences: preferences,
      });

      if (res.success) {
        toast.success(
          `Successfully reserved ${count} VIP seat(s) for ${event.title}! Our concierge team will reach out to you shortly.`
        );

        // Reset state and close
        setName('');
        setEmail('');
        setPhone('');
        setSeatsToReserve('1');
        setInvestmentTier('$200k - $1M');
        setPreferences('');
        onClose();
      } else {
        toast.error(res.error || 'Failed to reserve seat. Please try again.');
      }
    } catch (error) {
      console.error('Error reserving seat:', error);
      toast.error('Failed to submit reservation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay with blur */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header decoration */}
        <div className="h-1.5 w-full bg-linear-to-r from-primary to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer">
          <X className="size-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-primary uppercase">
              <Award className="size-3 text-primary animate-pulse" /> VIP Seat Reservation
            </span>
            <h2 className="text-xl font-bold text-white line-clamp-1">
              {event.title}
            </h2>
            <p className="text-xs text-slate-400">
              {isSoldOut
                ? 'All VIP seats for this event have been reserved.'
                : 'Reserve your seats below. Reservation confirmations are sent within 24 hours.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">
                Full Name *
              </label>
              <input
                type="text"
                required
                disabled={isSoldOut}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sir Richard Brand"
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  disabled={isSoldOut}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  disabled={isSoldOut}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 801 234 5678"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Seats to reserve */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">
                  Seats to Reserve *
                </label>
                <select
                  value={seatsToReserve}
                  disabled={isSoldOut}
                  onChange={(e) => setSeatsToReserve(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50">
                  <option value="1">1 Seat</option>
                  <option value="2">2 Seats</option>
                  <option value="3">3 Seats</option>
                  <option value="4">4 Seats</option>
                  <option value="5">5 Seats</option>
                </select>
              </div>

              {/* Investment Range */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">
                  Target Portfolio
                </label>
                <select
                  value={investmentTier}
                  disabled={isSoldOut}
                  onChange={(e) => setInvestmentTier(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all disabled:opacity-50">
                  <option value="$200k - $1M">$200k - $1M</option>
                  <option value="$2M - $5M">$2M - $5M</option>
                  <option value="$6M - $10M">$6M - $10M</option>
                  <option value="$10M+">$10M+</option>
                </select>
              </div>
            </div>

            {/* Special Preferences */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">
                Special Preferences (Optional)
              </label>
              <textarea
                value={preferences}
                disabled={isSoldOut}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Dietary requests, security clearances, airport transfer requirements, etc..."
                rows={3}
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none disabled:opacity-50"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col-reverse md:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-1/3 py-2.5 border border-white/10 text-slate-300 font-bold rounded-lg text-xs tracking-wider uppercase hover:bg-white/5 transition-colors cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isSoldOut}
                className="w-full md:w-2/3 py-2.5 bg-primary text-background-dark font-extrabold rounded-lg text-xs tracking-wider uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer">
                {isSubmitting ? (
                  <span>Reserving...</span>
                ) : isSoldOut ? (
                  <span>Fully Reserved</span>
                ) : (
                  <>
                    <Ticket className="size-3.5" />
                    <span>Reserve {seatsToReserve} Seat(s)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
