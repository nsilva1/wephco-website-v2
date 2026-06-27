'use client';

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import { toast } from 'react-toastify';
import {
  BiTrendingUp,
  BiGlobe,
  BiCreditCard,
  BiMoviePlay,
  BiCheckCircle,
  BiEnvelope,
  BiPhoneCall,
} from 'react-icons/bi';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';

export default function AffiliatesPage() {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name || !experience || !brokerage) {
      toast.warning('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);

      // Save application details to 'agentApplications' collection in Firestore
      await addDoc(collection(db, FIRESTORE_COLLECTIONS.AFFILIATES), {
        name,
        experience: Number(experience),
        currentBrokerage: brokerage,
        phone,
        email,
        message: message || 'I am interested in joining the network.',
        verified: false,
        createdAt: new Date(),
      });

      toast.success(
        'Your application has been submitted successfully! We will review it within 48 hours.'
      );

      // Reset form
      setName('');
      setExperience('');
      setBrokerage('');
      setMessage('');
      setPhone('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting application: ', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToApply = () => {
    const formSection = document.getElementById('apply-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-20">
      {/* Hero Section */}
      <section className="relative h-[360px] md:h-[450px] flex items-center justify-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-100"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(2, 38, 24, 0.45), rgba(10, 15, 13, 0.75)), url('https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}></div>

        <div className="relative z-10 max-w-4xl text-center space-y-6 mt-12 md:mt-0">
          <h1 className="text-5xl md:text-7xl font-black text-slate-100 leading-tight">
            Join the <span className="text-primary italic">Elite</span> Network
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Partner with the region&apos;s most prestigious luxury real estate
            brand and elevate your career to unprecedented heights.
          </p>
          <div className="pt-6">
            <button
              onClick={scrollToApply}
              className="inline-flex items-center justify-center bg-primary text-background-dark font-black py-4 px-10 rounded-lg text-sm uppercase tracking-widest shadow-xl hover:shadow-primary/30 transition-all transform hover:scale-103 cursor-pointer">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-20 bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-3">
              Unrivaled Benefits
            </span>
            <h3 className="text-4xl font-light text-slate-100">
              Why Partner with{' '}
              <span className="font-extrabold text-primary">Wephco</span>?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-[#022618]/15 border border-primary/10 p-8 rounded-xl hover:border-primary/45 transition-all duration-300 group">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <BiTrendingUp className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">
                Market Intelligence
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs font-light">
                Access proprietary property valuation records and market
                performance data that optimize listing conversions.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-[#022618]/15 border border-primary/10 p-8 rounded-xl hover:border-primary/45 transition-all duration-300 group">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <BiGlobe className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">
                Global Network
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs font-light">
                Secure access to high-net-worth property seekers across
                international finance hubs and gated enclaves.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-[#022618]/15 border border-primary/10 p-8 rounded-xl hover:border-primary/45 transition-all duration-300 group">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <BiCreditCard className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">
                Premium Splits
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs font-light">
                Enjoy industry-competitive commission splits alongside premium
                bonuses and milestone advisory incentives.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-[#022618]/15 border border-primary/10 p-8 rounded-xl hover:border-primary/45 transition-all duration-300 group">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <BiMoviePlay className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">
                Marketing Suite
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs font-light">
                Deploy state-of-the-art cinematic listing photography and
                targeted digital outreach campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 lg:px-20 bg-neutral-dark/10 border-t border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl font-light text-slate-100">
              How It <span className="font-extrabold text-primary">Works</span>
            </h3>
            <div className="h-1 w-24 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Timeline Line (Horizontal Desktop Only) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-primary/20"></div>

            {/* Step 1 */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,53,0.3)]">
                <span className="text-2xl font-black text-primary">01</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100">Apply</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Submit your professional brokerage experience and profile record
                through our secure form below.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,53,0.3)]">
                <span className="text-2xl font-black text-primary">02</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100">Onboard</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Collaborate with our executive desk to integrate listing tools,
                resource assets, and legal guidelines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 bg-background-dark border-4 border-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,53,0.3)]">
                <span className="text-2xl font-black text-primary">03</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100">Close</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Leverage the premium Wephco brand identity to secure listing
                assets and close high-value deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section
        className="py-24 px-6 lg:px-20 bg-background-dark border-t border-primary/10"
        id="apply-form">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h3 className="text-4xl font-light text-slate-100 leading-tight">
              Ready to Take the{' '}
              <span className="font-extrabold text-primary">Next Step</span>?
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm font-light">
              Our selection process focuses on integrity, local expertise, and
              alignment with our luxury service standards. We review all
              applications within 48 business hours.
            </p>

            <div className="space-y-4 pt-4 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-3 text-primary">
                <BiCheckCircle className="text-lg" />
                <span className="text-slate-200 text-sm font-medium">
                  Exclusive Territory Access
                </span>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <BiCheckCircle className="text-lg" />
                <span className="text-slate-200 text-sm font-medium">
                  Agent Desk Assistance
                </span>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <BiCheckCircle className="text-lg" />
                <span className="text-slate-200 text-sm font-medium">
                  Professional Media Support
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-dark/30 border border-primary/15 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80">
                      Experience (Years) *
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 5"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 080123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/80">
                    Current Brokerage *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Agency Name"
                    value={brokerage}
                    onChange={(e) => setBrokerage(e.target.value)}
                    className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/80">
                    Personal Message
                  </label>
                  <textarea
                    placeholder="Tell us about your portfolio..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-600 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/95 text-background-dark font-black py-4 rounded-lg transition-all shadow-lg hover:shadow-primary/30 uppercase tracking-widest text-xs cursor-pointer disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Outro Contact Information */}
      <section className="bg-neutral-dark/10 text-slate-100 border-t border-primary/10">
        <div className="py-20 px-6 lg:px-20 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-light">
            Start Your Journey with{' '}
            <span className="font-extrabold text-primary">Wephco</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Be more than just an agent. Become a partner in shaping the future
            of global luxury real estate.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 px-6 py-2 bg-background-dark/50 rounded-full border border-primary/20">
              <BiPhoneCall className="text-primary text-base" />
              <span className="text-xs font-medium">+234 (0) 916 124 6300</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 bg-background-dark/50 rounded-full border border-primary/20">
              <BiEnvelope className="text-primary text-base" />
              <span className="text-xs font-medium">contact@wephco.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
