'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  Calendar,
  TrendingUp,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { joinWaitlist } from '@/actions/waitlist';
import { Loader } from '@/components/Loader';

export const ProjectWaitlist = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    unitType: '1-2 Bedroom Luxury Suite',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      toast.warning('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const result = await joinWaitlist({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        unitType: formData.unitType,
        projectName: 'The Canopies at Yas Point',
      });

      if (result.success) {
        toast.success('Congratulations! You have joined the VIP Pre-Launch Waitlist.');
        setSubmitted(true);
      } else {
        toast.error(result.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-background-dark py-20 px-6 max-w-7xl mx-auto font-display border-t border-b border-primary/15 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          The Canopies at <span className="font-black italic text-primary">Yas Point</span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
          Be among the privileged few to secure priority allocation in Abu Dhabi’s most anticipated waterfront luxury development before public release.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 7 Columns: Project Image & Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl group">
            <Image
              src="/images/pdf-about/project_canopies_yas_point.png"
              alt="The Canopies at Yas Point Development Showcase"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

            {/* Floating Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className="bg-primary/90 text-background-dark font-extrabold text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider shadow">
                Pre-Launch Phase 1
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md text-white font-semibold text-xs px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Yas Island, Abu Dhabi
              </span>
            </div>

            {/* Bottom Specs Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md border border-primary/30 p-4 rounded-2xl grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Yield</p>
                <p className="text-sm sm:text-base font-black text-primary flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 hidden sm:inline" /> 9.8% p.a.
                </p>
              </div>
              <div className="border-x border-primary/20">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Handover</p>
                <p className="text-sm sm:text-base font-black text-white flex items-center justify-center gap-1">
                  <Calendar className="w-3.5 h-3.5 hidden sm:inline text-primary" /> Q4 2027
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Allocation</p>
                <p className="text-sm sm:text-base font-black text-emerald-400 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 hidden sm:inline" /> 84% Reserved
                </p>
              </div>
            </div>
          </div>

          {/* Project Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900/60 border border-primary/20 p-4 rounded-2xl space-y-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-2">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">VIP Floor Choice</h4>
              <p className="text-[11px] text-slate-400 font-light">First selection rights on prime waterfront floors.</p>
            </div>

            <div className="bg-slate-900/60 border border-primary/20 p-4 rounded-2xl space-y-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-2">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Brokerage Fee</h4>
              <p className="text-[11px] text-slate-400 font-light">Exclusively waived for waitlist subscribers.</p>
            </div>

            <div className="bg-slate-900/60 border border-primary/20 p-4 rounded-2xl space-y-1">
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Guaranteed Buyback</h4>
              <p className="text-[11px] text-slate-400 font-light">Institutional capital protection terms included.</p>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Waitlist Signup Form Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-950/90 backdrop-blur-xl border-2 border-primary/40 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-primary uppercase tracking-widest">
                  Priority Access Form
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Open Now
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-tight">
                Join the VIP Waitlist
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Receive confidential brochure, detailed floor plans, and pre-launch pricing directly to your inbox.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-white">VIP Priority Registered!</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your waitlist slot for <strong>The Canopies at Yas Point</strong> has been secured. Our team will contact you shortly with early access materials.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phoneNumber: '', unitType: '1-2 Bedroom Luxury Suite' });
                  }}
                  className="text-xs text-primary font-bold hover:underline block mx-auto pt-2"
                >
                  Submit Another Entry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Chief Alexander Sterling"
                    type="text"
                    required
                    className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    type="email"
                    required
                    className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                    Phone Number *
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+234 ..."
                    type="tel"
                    required
                    className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                    Preferred Unit Category
                  </label>
                  <select
                    name="unitType"
                    value={formData.unitType}
                    onChange={handleChange}
                    className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                  >
                    <option value="1-2 Bedroom Luxury Suite">1-2 Bedroom Luxury Suite</option>
                    <option value="3-4 Bedroom Penthouse Suite">3-4 Bedroom Penthouse Suite</option>
                    <option value="Waterfront Townhouse">Waterfront Townhouse</option>
                    <option value="Whole Floor Commercial / Office">Whole Floor Commercial / Office</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-linear-to-r from-primary via-[#e5c158] to-[#b38f28] text-background-dark font-black rounded-xl hover:bg-primary/95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 cursor-pointer text-xs uppercase tracking-wider transform hover:scale-[1.01] mt-2"
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <span>Reserve VIP Waitlist Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="w-3 h-3 text-primary" /> Strictly confidential • No public spam
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
