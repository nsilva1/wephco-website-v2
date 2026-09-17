'use client';

import React, { useState, useEffect } from 'react';
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
import {
  joinWaitlist,
  getProjectWaitlistConfig,
} from '@/actions/waitlist';
import { Loader } from '@/components/Loader';
import {
  IProjectWaitlistConfig,
  DEFAULT_PROJECT_WAITLIST_CONFIG,
  ProjectWaitlistProps
} from '@/interfaces/waitlist';



const renderHighlightIcon = (iconName: string) => {
  switch (iconName) {
    case 'Award':
      return <Award className="w-4 h-4" />;
    case 'Building2':
      return <Building2 className="w-4 h-4" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-4 h-4" />;
    case 'TrendingUp':
      return <TrendingUp className="w-4 h-4" />;
    case 'Sparkles':
      return <Sparkles className="w-4 h-4" />;
    case 'MapPin':
      return <MapPin className="w-4 h-4" />;
    case 'Calendar':
      return <Calendar className="w-4 h-4" />;
    case 'Clock':
      return <Clock className="w-4 h-4" />;
    case 'CheckCircle2':
      return <CheckCircle2 className="w-4 h-4" />;
    case 'Lock':
      return <Lock className="w-4 h-4" />;
    default:
      return <Award className="w-4 h-4" />;
  }
};

export const ProjectWaitlist: React.FC<ProjectWaitlistProps> = ({
  initialConfig,
}) => {
  const [config, setConfig] = useState<IProjectWaitlistConfig>(
    initialConfig || DEFAULT_PROJECT_WAITLIST_CONFIG
  );
  const [loadingConfig, setLoadingConfig] = useState(!initialConfig);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    unitType: config.unitCategories?.[0] || '1-2 Bedroom Luxury Suite',
  });

  useEffect(() => {
    let isMounted = true;
    const loadConfig = async () => {
      try {
        const fetchedConfig = await getProjectWaitlistConfig();
        if (isMounted && fetchedConfig) {
          setConfig(fetchedConfig);
          if (fetchedConfig.unitCategories?.length) {
            setFormData((prev) => ({
              ...prev,
              unitType: fetchedConfig.unitCategories[0],
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load project waitlist config:', err);
      } finally {
        if (isMounted) setLoadingConfig(false);
      }
    };

    if (!initialConfig) {
      loadConfig();
    }
    return () => {
      isMounted = false;
    };
  }, [initialConfig]);

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
        projectName: config.projectName || 'The Canopies at Yas Point',
      });

      if (result.success) {
        toast.success(
          'Congratulations! You have joined the VIP Pre-Launch Waitlist.'
        );
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

  const highlightsList =
    config.highlights && config.highlights.length > 0
      ? config.highlights
      : DEFAULT_PROJECT_WAITLIST_CONFIG.highlights;

  const unitCategories =
    config.unitCategories && config.unitCategories.length > 0
      ? config.unitCategories
      : DEFAULT_PROJECT_WAITLIST_CONFIG.unitCategories;

  return (
    <section className="relative bg-background-dark py-20 px-6 max-w-7xl mx-auto font-display border-t border-b border-primary/15 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
          {config.title}{' '}
          <span className="font-black italic text-primary">
            {config.titleHighlight}
          </span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
          {config.subtitle}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 7 Columns: Project Image & Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl group">
            <Image
              src={
                config.image || '/images/pdf-about/project_canopies_yas_point.png'
              }
              alt={config.imageAlt || config.projectName || 'Project Showcase'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

            {/* Floating Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {config.phaseBadge && (
                <span className="bg-primary/90 text-background-dark font-extrabold text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider shadow">
                  {config.phaseBadge}
                </span>
              )}
              {config.locationBadge && (
                <span className="bg-slate-900/80 backdrop-blur-md text-white font-semibold text-xs px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />{' '}
                  {config.locationBadge}
                </span>
              )}
            </div>

            {/* Bottom Specs Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md border border-primary/30 p-4 rounded-2xl grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Target Yield
                </p>
                <p className="text-sm sm:text-base font-black text-primary flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 hidden sm:inline" />{' '}
                  {config.targetYield || '9.8% p.a.'}
                </p>
              </div>
              <div className="border-x border-primary/20">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Handover
                </p>
                <p className="text-sm sm:text-base font-black text-white flex items-center justify-center gap-1">
                  <Calendar className="w-3.5 h-3.5 hidden sm:inline text-primary" />{' '}
                  {config.handover || 'Q4 2027'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Allocation
                </p>
                <p className="text-sm sm:text-base font-black text-emerald-400 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 hidden sm:inline" />{' '}
                  {config.allocation || '84% Reserved'}
                </p>
              </div>
            </div>
          </div>

          {/* Project Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {highlightsList.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-primary/20 p-4 rounded-2xl space-y-1"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-2">
                  {renderHighlightIcon(item.icon)}
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-light">
                  {item.description}
                </p>
              </div>
            ))}
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
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    config.isFormOpen !== false
                      ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30'
                      : 'text-amber-400 bg-amber-950/60 border border-amber-500/30'
                  }`}
                >
                  {config.isFormOpen !== false ? 'Open Now' : 'Limited Seats'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {config.formTitle || 'Join the VIP Waitlist'}
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {config.formSubtitle ||
                  'Receive confidential brochure, detailed floor plans, and pre-launch pricing directly to your inbox.'}
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-white">
                  VIP Priority Registered!
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Thank you,{' '}
                  <strong className="text-white">{formData.name}</strong>. Your
                  waitlist slot for{' '}
                  <strong>{config.projectName}</strong> has been secured. Our team
                  will contact you shortly with early access materials.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phoneNumber: '',
                      unitType: unitCategories[0] || '',
                    });
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
                    {unitCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
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
