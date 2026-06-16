'use client';

import React, { useState } from 'react';
import { Calendar, Sparkles, Bell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function EventsPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.warning('Please enter a valid email address');
      return;
    }
    setIsSubmitting(true);
    // simulate firestore transaction
    setTimeout(() => {
      toast.success('Thank you! We will notify you when events go live.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-[85vh] bg-background-dark text-slate-100 font-sans flex items-center justify-center overflow-hidden py-16 px-4 md:px-8">
      {/* Abstract premium glowing lights in background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-2xl w-full z-10 text-center space-y-8 mt-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
            <Sparkles className="size-3.5 animate-spin" style={{ animationDuration: '4s' }} /> Something Extraordinary is coming
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider text-white leading-tight">
            Wephco <span className="bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent italic">Events</span>
          </h1>
          
          <p className="text-slate-300 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
            Curating elite global gatherings, private real estate exhibitions, and exclusive investor roundtables. Access is on the horizon.
          </p>
        </div>

        {/* Premium Coming Soon Card */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-primary/20 rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Get Notified</h3>
            <p className="text-xs text-slate-400">Be the first to secure private invitations to our upcoming launches.</p>
          </div>

          <form onSubmit={handleNotify} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-background-dark font-extrabold rounded-lg hover:bg-primary/90 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-50 cursor-pointer"
            >
              <Bell className="size-4" />
              <span>{isSubmitting ? 'Subscribing...' : 'Notify Me'}</span>
            </button>
          </form>
        </div>

        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> Back to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
