'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Receipt,
  FileText,
  ShieldAlert,
  Calendar,
  Camera,
  PieChart,
  Building2,
  FolderLock,
  BellRing,
  MessageSquare,
  TrendingUp,
  UserCheck,
  CalendarDays,
  Globe,
  CreditCard,
  Wrench,
  ClipboardCheck,
  Bell,
  ShieldCheck,
  Lock,
  History,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Smartphone,
  Layers,
  Sliders,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';
import { createContactRequest } from '@/actions/contact';

export default function PropertyManagementPage() {
  const [activeTab, setActiveTab] = useState<'owners' | 'tenants' | 'security'>('owners');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState<'overview' | 'maintenance' | 'yield'>('overview');
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'FR'>('EN');

  // Form State for Demo Request
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    userRole: 'Property Owner',
    portfolioSize: '1-3 Properties',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.email || !demoForm.phone) {
      toast.warning('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await createContactRequest({
        name: demoForm.name,
        email: demoForm.email,
        phoneNumber: demoForm.phone,
        status: false,
        message: `Property Management Demo Request (${demoForm.userRole}, ${demoForm.portfolioSize}): ${demoForm.message}`,
      });
      toast.success('Your demo request has been submitted! Our software team will reach out shortly.');
      setDemoForm({
        name: '',
        email: '',
        phone: '',
        userRole: 'Property Owner',
        portfolioSize: '1-3 Properties',
        message: '',
      });
      setDemoModalOpen(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit demo request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-20 overflow-x-hidden">
      {/* ------------------------------------------------------------------- */}
      {/* HERO SECTION - SOFTWARE PRODUCT PAGE */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-12 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-primary/10">
        {/* Glowing Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
              Intelligent Software for <br />
              <span className="text-primary font-black italic">Luxury Property</span> Portfolios
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              A unified digital ecosystem empowering property owners with real-time financial tracking, automated owner reports, digital lease vaults, and instant maintenance approvals—paired with a seamless tenant portal.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-background-dark font-extrabold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Platform Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#software-features"
                className="w-full sm:w-auto border border-primary/40 hover:border-primary text-slate-100 font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider hover:bg-white/5 transition-all backdrop-blur-xs text-center"
              >
                Explore All Features
              </a>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* INTERACTIVE DASHBOARD SOFTWARE PREVIEW MOCKUP */}
          {/* ------------------------------------------------------------------- */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="bg-slate-950/90 rounded-2xl border border-primary/30 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Window Bar Header */}
              <div className="bg-slate-900/90 px-6 py-4 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs text-slate-400 font-mono hidden sm:inline">
                    portal.wephco.com/owner/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live System Sync
                  </span>
                  <span className="text-[11px] text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                    Biometric Verified 🔒
                  </span>
                </div>
              </div>

              {/* Sub Navigation Bar inside Software Mockup */}
              <div className="bg-slate-900/40 px-6 py-3 border-b border-primary/10 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveDashboardTab('overview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeDashboardTab === 'overview'
                        ? 'bg-primary text-background-dark shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Real-Time Dashboard</span>
                  </button>
                  <button
                    onClick={() => setActiveDashboardTab('maintenance')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeDashboardTab === 'maintenance'
                        ? 'bg-primary text-background-dark shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Maintenance Center</span>
                  </button>
                  <button
                    onClick={() => setActiveDashboardTab('yield')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeDashboardTab === 'yield'
                        ? 'bg-primary text-background-dark shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Yield &amp; Valuation</span>
                  </button>
                </div>
                <div className="text-xs text-primary font-semibold flex items-center gap-2">
                  <span>Portfolio Total: 4 Prime Assets</span>
                </div>
              </div>

              {/* Live Mockup Dashboard Screen Content */}
              <div className="p-6 md:p-8 space-y-6">
                {activeDashboardTab === 'overview' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Top Metric Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-primary/20 space-y-1">
                        <p className="text-[11px] text-slate-400 uppercase font-semibold">Occupancy Rate</p>
                        <p className="text-2xl font-black text-white">98.4%</p>
                        <span className="text-[10px] text-emerald-400 font-bold">+2.1% YoY</span>
                      </div>
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-primary/20 space-y-1">
                        <p className="text-[11px] text-slate-400 uppercase font-semibold">Gross Monthly Rent</p>
                        <p className="text-2xl font-black text-primary">$142,500</p>
                        <span className="text-[10px] text-emerald-400 font-bold">On Schedule</span>
                      </div>
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-primary/20 space-y-1">
                        <p className="text-[11px] text-slate-400 uppercase font-semibold">Arrears Rate</p>
                        <p className="text-2xl font-black text-emerald-400">0.00%</p>
                        <span className="text-[10px] text-slate-400">0 Outstanding</span>
                      </div>
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-primary/20 space-y-1">
                        <p className="text-[11px] text-slate-400 uppercase font-semibold">Net Annual Yield</p>
                        <p className="text-2xl font-black text-white">9.25%</p>
                        <span className="text-[10px] text-primary font-bold">Top Tier Performance</span>
                      </div>
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-primary/20 col-span-2 md:col-span-1 space-y-1">
                        <p className="text-[11px] text-slate-400 uppercase font-semibold">Asset Grade</p>
                        <p className="text-2xl font-black text-primary">A+ Premium</p>
                        <span className="text-[10px] text-slate-400">Audit Completed Q2</span>
                      </div>
                    </div>

                    {/* Middle Section: Recent Income Track & Push Alert */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Left: Rent Collection Track */}
                      <div className="md:col-span-2 bg-slate-900/60 p-5 rounded-xl border border-primary/10 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-primary" />
                            Live Rent Collection Schedule
                          </h4>
                          <span className="text-[11px] text-primary underline cursor-pointer">
                            Download Monthly Owner Report (.PDF)
                          </span>
                        </div>
                        <div className="space-y-3">
                          {[
                            { property: 'Penthouse A, Eko Atlantic', tenant: 'Grade A Tenant • Corporate Lease', amount: '$45,000', status: 'Paid (Direct In-App)', date: 'Aug 24, 2026' },
                            { property: 'Villa 12, Ikoyi Waterfront', tenant: 'Grade A Tenant • Diplomatic', amount: '$62,500', status: 'Paid (Automated)', date: 'Aug 20, 2026' },
                            { property: 'Suite 4B, Banana Island', tenant: 'Grade B+ Tenant • Private Tech', amount: '$35,000', status: 'Paid (Remitted)', date: 'Aug 18, 2026' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                              <div>
                                <p className="font-bold text-white">{item.property}</p>
                                <p className="text-[11px] text-slate-400">{item.tenant}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-primary">{item.amount}</p>
                                <span className="text-[10px] text-emerald-400 font-semibold">{item.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Maintenance Approval Center Push Notification */}
                      <div className="bg-slate-900/60 p-5 rounded-xl border border-primary/10 space-y-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                              <BellRing className="w-4 h-4 animate-bounce" />
                              Push Approval Alert
                            </span>
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                              Threshold Exceeded
                            </span>
                          </div>
                          <p className="text-xs font-bold text-white">HVAC Compressor Replacement</p>
                          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                            Pre-agreed spend threshold: $1,000. Request amount: $1,450 (Villa 12). Photos attached.
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-800 flex gap-2">
                          <button className="flex-1 bg-primary text-background-dark text-xs font-bold py-2 rounded-lg hover:bg-primary/90 transition-all">
                            Approve ($1,450)
                          </button>
                          <button className="px-3 bg-slate-800 text-slate-300 text-xs font-semibold py-2 rounded-lg hover:bg-slate-700 transition-all">
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDashboardTab === 'maintenance' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-900/60 p-5 rounded-xl border border-primary/10 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          Preventive Maintenance Calendar
                        </h4>
                        <div className="space-y-3 text-xs">
                          <div className="p-3 bg-slate-950 rounded-lg border-l-4 border-emerald-500 flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">Quarterly Elevator Safety Audit</p>
                              <p className="text-[11px] text-slate-400">Scheduled: Sept 10, 2026 • Eko Atlantic</p>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-1 rounded">
                              Confirmed
                            </span>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-lg border-l-4 border-amber-500 flex justify-between items-center">
                            <div>
                              <p className="font-bold text-white">Solar Inverter Service & Battery Health</p>
                              <p className="text-[11px] text-slate-400">Scheduled: Sept 18, 2026 • Ikoyi Waterfront</p>
                            </div>
                            <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-2 py-1 rounded">
                              Upcoming
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-5 rounded-xl border border-primary/10 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-primary" />
                          Service Charge Budget vs. Actual
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-slate-300">Annual Maintenance Pool ($40,000)</span>
                              <span className="text-primary">$28,400 Used (71%)</span>
                            </div>
                            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                              <div className="bg-primary h-full rounded-full w-[71%]" />
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Transparent, always current service charge ledger accessible to all owners in one tap.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDashboardTab === 'yield' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-slate-900/60 p-5 rounded-xl border border-primary/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          Portfolio Yield & Valuation Growth Recommendation
                        </h4>
                        <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30">
                          +14.2% Estimated Asset Capital Gain
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        WEPHCO automated AI analytics recommends upgrading the penthouse solar backup system to capture an additional 1.8% annual net yield on upcoming lease renewals.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* KEY INFRASTRUCTURE HIGHLIGHTS BAR */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-12 bg-slate-950 border-b border-primary/10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-primary">100%</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">On-Time Rent Collection</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-white">100%</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Transparent Audit Trail</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-primary">24/7</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Real-Time Owner Portal</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-white">EN / FR</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Bi-Lingual Infrastructure</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* SEGMENTED FEATURE SHOWCASE (FOR OWNERS, TENANTS, SECURITY) */}
      {/* ------------------------------------------------------------------- */}
      <section id="software-features" className="py-24 px-6 md:px-12 lg:px-20 bg-background-dark">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Engineered For Excellence
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              A Complete Platform for <br />
              <span className="font-black text-primary">Owners, Tenants &amp; Managers</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Select your persona below to explore the dedicated software capabilities built into WEPHCO OS.
            </p>
          </div>

          {/* Persona Tab Switcher */}
          <div className="flex justify-center">
            <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-primary/20 inline-flex flex-col sm:flex-row gap-2 max-w-full">
              <button
                onClick={() => setActiveTab('owners')}
                className={`px-6 py-3.5 rounded-xl text-xs md:text-sm font-extrabold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  activeTab === 'owners'
                    ? 'bg-primary text-background-dark shadow-xl shadow-primary/20 scale-102'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>For Property Owners (16 Features)</span>
              </button>

              <button
                onClick={() => setActiveTab('tenants')}
                className={`px-6 py-3.5 rounded-xl text-xs md:text-sm font-extrabold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  activeTab === 'tenants'
                    ? 'bg-primary text-background-dark shadow-xl shadow-primary/20 scale-102'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>For Tenants (6 Features)</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-3.5 rounded-xl text-xs md:text-sm font-extrabold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-primary text-background-dark shadow-xl shadow-primary/20 scale-102'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Security &amp; Infrastructure</span>
              </button>
            </div>
          </div>

          {/* TAB 1: FOR PROPERTY OWNERS */}
          {activeTab === 'owners' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Real-Time Dashboard</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Occupancy rate, gross &amp; net income, arrears, net yield, and property condition grade—all synthesized into a single consolidated view.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Monthly Owner Report</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Auto-generated financial summaries, archived securely, and instantly downloadable in PDF format anytime for tax or accounting purposes.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Rent &amp; Income Tracking</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Live status of every rent collection against the scheduled lease terms with instant status indicators and remittance logs.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Digital Lease Register</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Tenant contact details, rent amounts, security deposits, lease renewal dates, and service charge terms—one tap away.
                    </p>
                  </div>
                </div>

                {/* Feature 5 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Maintenance Approval Center</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Push notification sent directly to your phone for any spend above your pre-agreed threshold. Approve or decline directly in-app.
                    </p>
                  </div>
                </div>

                {/* Feature 6 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Preventive Maintenance Calendar</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      See every upcoming inspection, HVAC service, generator check, or elevator safety audit before it happens.
                    </p>
                  </div>
                </div>

                {/* Feature 7 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Asset Condition Reports</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Quarterly comprehensive property condition reports with high-resolution photo/video audit history stored permanently.
                    </p>
                  </div>
                </div>

                {/* Feature 8 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PieChart className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Service Charge Budget vs. Actual</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Transparent, line-by-line accounting comparing service charge budgets against real-time operational expenses.
                    </p>
                  </div>
                </div>

                {/* Feature 9 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Multi-Property Portfolio View</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Aggregate portfolio totals plus per-property breakdown views for owners managing multi-asset real estate holdings.
                    </p>
                  </div>
                </div>

                {/* Feature 10 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FolderLock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Encrypted Document Vault</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Lease agreements, insurance policies, title deeds, audit reports, and tax statements stored securely in one encrypted vault.
                    </p>
                  </div>
                </div>

                {/* Feature 11 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BellRing className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Smart Push Notifications</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Instant alerts for rent received, arrears flagged, maintenance scheduled or completed, and upcoming lease renewals.
                    </p>
                  </div>
                </div>

                {/* Feature 12 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Direct Messaging &amp; Concierge</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Direct in-app messaging line with your dedicated Relationship Manager (Elite Tier) or 24/7 technical support team.
                    </p>
                  </div>
                </div>

                {/* Feature 13 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Yield &amp; Valuation Analytics</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Property value trends over time, net yield metrics, and proactive data-backed yield growth recommendations.
                    </p>
                  </div>
                </div>

                {/* Feature 14 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Tenant Screening Visibility</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Complete visibility into tenant background checks, including the A–D tenant grade and screening summary for placed occupants.
                    </p>
                  </div>
                </div>

                {/* Feature 15 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CalendarDays className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Serviced &amp; Short-Let Calendar</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Occupancy calendar, booking revenue sync across platforms, and breakdown analytics for serviced apartment packages.
                    </p>
                  </div>
                </div>

                {/* Feature 16 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-1">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sliders className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">In-App Service Upgrades</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Upgrade packages, request specialized facility management, or commission asset repositioning directly within the app interface.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FOR TENANTS */}
          {activeTab === 'tenants' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tenant Feature 1 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">In-App Rent Payment</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Pay rent securely via card, bank transfer, or direct debit. Instantly access digital invoices and complete payment receipt archives.
                    </p>
                  </div>
                </div>

                {/* Tenant Feature 2 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Maintenance Submission</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Report maintenance issues in seconds with photos or video clips. Track real-time progress from assignment to final resolution.
                    </p>
                  </div>
                </div>

                {/* Tenant Feature 3 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Lease Document Access</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      View lease terms, renewal dates, house rules, and service charge breakdowns anytime directly from your smartphone.
                    </p>
                  </div>
                </div>

                {/* Tenant Feature 4 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bell className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Automated Payment Reminders</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Friendly automated notifications sent ahead of payment due dates so you never incur late fees or miss a schedule.
                    </p>
                  </div>
                </div>

                {/* Tenant Feature 5 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Digital Move-In/Move-Out Checklist</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Interactive move-in inspection checklist and photo condition report access for total transparency on deposit protection.
                    </p>
                  </div>
                </div>

                {/* Tenant Feature 6 */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Direct Manager Messaging</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Communicate directly with your designated WEPHCO property manager for quick answers and smooth residence management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & ACCESS */}
          {activeTab === 'security' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-900/60 p-8 rounded-2xl border border-primary/20 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Role-Based Access Control (RBAC)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Strict segregation of user permissions. Property owners, tenants, facility technicians, and WEPHCO staff each access only the data relevant to their specific role.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-8 rounded-2xl border border-primary/20 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Encrypted Document Vault</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Bank-grade AES-256 encryption applied to all lease agreements, banking statements, identity verification records, and financial ledger data.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-8 rounded-2xl border border-primary/20 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                    <History className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Immutable Audit Trail</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Full, unalterable timestamped event log for every maintenance approval, fund disbursement, lease update, and tenant screening decision.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* MANAGEMENT PACKAGE TIERS */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Management Packages
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Tailored Tiers for <span className="font-black text-primary">Every Portfolio</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Choose the management structure that fits your asset holding model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Tier */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-primary/20 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Standard Package</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Single Asset Care</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Designed for owners with individual residential or commercial luxury holdings.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Real-time owner dashboard &amp; monthly report</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Automated rent &amp; income tracking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Maintenance approval center push alerts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>In-app tenant portal &amp; rent payment</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="mt-8 w-full border border-primary/40 text-primary hover:bg-primary hover:text-background-dark font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Inquire Standard
              </button>
            </div>

            {/* Elite Tier (Highlighted) */}
            <div className="bg-linear-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border-2 border-primary shadow-2xl shadow-primary/10 flex flex-col justify-between relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background-dark font-extrabold px-4 py-1 rounded-full text-[10px] uppercase tracking-widest">
                Most Popular
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Elite Portfolio</span>
                  <h3 className="text-2xl font-black text-white mt-1">Multi-Asset Wealth</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Comprehensive asset management with dedicated relationship manager and yield optimization.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>All Standard features included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Multi-property aggregate &amp; per-asset breakdown</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Dedicated Relationship Manager direct messaging</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Yield &amp; valuation growth recommendations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Quarterly photo/video asset audit history</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="mt-8 w-full bg-primary hover:bg-primary/95 text-background-dark font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-primary/20 transition-all cursor-pointer"
              >
                Request Elite Access
              </button>
            </div>

            {/* Serviced Short-Let Tier */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-primary/20 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Serviced Package</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Short-Let &amp; Hospitality</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Optimized for short-stay luxury residences, serviced apartments, and executive lettings.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Live occupancy calendar &amp; booking revenue sync</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Multi-platform revenue breakdown analytics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Preventive housekeeping &amp; maintenance schedule</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>24/7 guest concierge &amp; check-in integration</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="mt-8 w-full border border-primary/40 text-primary hover:bg-primary hover:text-background-dark font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Inquire Serviced
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* FINAL CTA SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 text-center relative overflow-hidden bg-background-dark border-t border-primary/10">
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
            Transform How You Manage Your <br />
            <span className="font-extrabold text-primary">Luxury Real Estate Assets</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Schedule a personalized walkthrough of the WEPHCO Property Management OS with our technology advisors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="bg-primary text-background-dark px-10 py-4.5 rounded-xl font-extrabold text-sm uppercase tracking-wider hover:bg-primary/95 transition-all hover:scale-105 shadow-2xl shadow-primary/30 cursor-pointer"
            >
              Schedule Live Demo
            </button>
            <Link
              href="/consultations"
              className="border border-primary/40 text-white px-10 py-4.5 rounded-xl font-extrabold text-sm uppercase tracking-wider hover:bg-white/5 transition-all"
            >
              Book Private Advisory
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* DEMO REQUEST MODAL */}
      {/* ------------------------------------------------------------------- */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-primary/30 rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-2"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Platform Walkthrough</span>
              <h3 className="text-2xl font-bold text-white">Request WEPHCO OS Demo</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your details below to schedule an interactive software demonstration.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  placeholder="e.g. Chief Alexander Sterling"
                  className="w-full bg-slate-950 border border-primary/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-950 border border-primary/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    placeholder="+234 ..."
                    className="w-full bg-slate-950 border border-primary/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                    I Am A...
                  </label>
                  <select
                    value={demoForm.userRole}
                    onChange={(e) => setDemoForm({ ...demoForm, userRole: e.target.value })}
                    className="w-full bg-slate-950 border border-primary/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Property Owner">Property Owner</option>
                    <option value="Asset Manager / Family Office">Asset Manager / Family Office</option>
                    <option value="Prospective Tenant">Prospective Tenant</option>
                    <option value="Institutional Investor">Institutional Investor</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                    Portfolio Size
                  </label>
                  <select
                    value={demoForm.portfolioSize}
                    onChange={(e) => setDemoForm({ ...demoForm, portfolioSize: e.target.value })}
                    className="w-full bg-slate-950 border border-primary/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary"
                  >
                    <option value="1-3 Properties">1-3 Properties</option>
                    <option value="4-10 Properties">4-10 Properties</option>
                    <option value="10+ Luxury Holdings">10+ Luxury Holdings</option>
                    <option value="Serviced Portfolio">Serviced Portfolio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold text-slate-300 tracking-wider block mb-1">
                  Specific Requirements / Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={demoForm.message}
                  onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                  placeholder="Tell us about your properties or specific features you need..."
                  className="w-full bg-slate-950 border border-primary/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-background-dark font-extrabold py-3.5 rounded-lg text-xs uppercase tracking-wider hover:bg-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
              >
                {loading ? <Loader /> : 'Submit Demo Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
