'use client';

import React, { useState } from 'react';
import { User, Mail, MapPin, BookOpen, ArrowRight, IdCard, Globe, Phone, Building2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { createMagazineSubscription } from '@/actions/magazine';
import { WEPHCO_MEMBERSHIP_TIERS, IMembershipTier } from '@/lib/constants';

const ONLINE_PAYMENT_LINK = 'https://sandbox.flutterwave.com/pay/cowfzvobwq1v';
const PHYSICAL_PAYMENT_LINK = 'https://sandbox.flutterwave.com/pay/yvxd7gzfe3bu';

// Exclude free tier ('insight') from magazine membership checkout
const PAID_MEMBERSHIP_TIERS = WEPHCO_MEMBERSHIP_TIERS.filter((tier) => tier.id !== 'insight');

export default function MagazineSubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<IMembershipTier>(PAID_MEMBERSHIP_TIERS[0]);
  const [subType, setSubType] = useState<'Online' | 'Physical'>('Online');
  const [language, setLanguage] = useState<'English' | 'French'>('English');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    deliveryAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.warning('Please fill in all required fields');
      return;
    }

    if (subType === 'Physical' && !formData.deliveryAddress) {
      toast.warning('Please enter a delivery address for physical print subscription');
      return;
    }

    setLoading(true);

    try {
      await createMagazineSubscription({
        tierId: selectedTier.id,
        tierName: selectedTier.name,
        type: `${selectedTier.name} (${subType})`,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        deliveryAddress: formData.deliveryAddress,
        fee: selectedTier.priceAmount,
        language,
      });

      toast.success(`Registered for ${selectedTier.name} [${subType}] (${language} Edition)! Redirecting to payment...`);

      const paymentLink = subType === 'Physical' || selectedTier.category === 'institutional'
        ? PHYSICAL_PAYMENT_LINK
        : ONLINE_PAYMENT_LINK;
      
      // Delay slightly for toast visibility, then redirect
      setTimeout(() => {
        window.location.href = paymentLink;
      }, 1500);

    } catch (error) {
      toast.error((error as Error).message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans">
      {/* Hero Header */}
      <section className="relative">
        <div
          className="w-full h-90 md:h-112.5 bg-cover bg-center flex items-center justify-center p-6 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(32, 29, 18, 0.4), rgba(32, 29, 18, 0.8)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
          }}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="size-3.5" /> WEPHCO Magazine & Membership
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Wephco Wimoa Magazine
            </h1>
            <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Subscribe to the premier publication covering global luxury real estate, design masterpieces, wealth preservation, and institutional partnerships across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left: Membership Tiers Selection */}
            <div className="flex-1 flex flex-col gap-8">
              {/* Choose Membership Tier */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <BookOpen className="size-5 text-primary" /> Select Membership Package
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">3 Paid Tiers</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {PAID_MEMBERSHIP_TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`cursor-pointer border rounded-2xl p-6 transition-all duration-300 relative ${
                          isSelected
                            ? 'bg-linear-to-br from-primary/15 via-slate-900 to-slate-900 border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/40'
                            : 'border-primary/20 bg-slate-800/40 text-slate-300 hover:border-primary/50 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-3 mb-3">
                          <div>
                            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider border ${
                              tier.category === 'institutional'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : 'bg-primary/20 text-primary border-primary/30'
                            }`}>
                              {tier.category === 'institutional' ? 'Institutional Partnership' : 'Membership Tier'}
                            </span>
                            <h4 className="font-extrabold text-lg md:text-xl text-white mt-1.5">
                              {tier.name}
                            </h4>
                          </div>

                          <div className="text-right">
                            <span className="text-2xl font-black text-primary">{tier.price}</span>
                            <span className="text-xs text-slate-400 block font-light">{tier.period}</span>
                          </div>
                        </div>

                        {/* Positioning Statement */}
                        <p className="text-xs italic text-slate-300 mb-4 bg-slate-950/40 p-3 rounded-lg border border-white/5 leading-relaxed">
                          "{tier.positioning}"
                        </p>

                        {/* Target Audience */}
                        <p className="text-xs text-slate-400 mb-4">
                          <strong className="text-slate-200 font-semibold">Designed for:</strong> {tier.targetAudience}
                        </p>

                        {/* Highlights List */}
                        <div className="space-y-1.5 border-t border-primary/10 pt-3.5">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Package Offers:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {tier.offers.slice(0, 6).map((offer, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="leading-tight">{offer}</span>
                              </div>
                            ))}
                          </div>
                          {tier.offers.length > 6 && (
                            <p className="text-[11px] text-primary font-semibold mt-2">
                              + {tier.offers.length - 6} additional exclusive benefits
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Subscriber Information Form */}
            <div className="w-full lg:w-110 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-primary/15 pt-8 lg:pt-0 lg:pl-8">
              <div>
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <IdCard className="size-5 text-primary" /> Subscriber Information
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete your edition preferences and registration details below.
                </p>
              </div>

              {/* Selected Tier Summary Badge */}
              <div className="bg-slate-800/80 border border-primary/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Selected Package</span>
                  <span className="font-extrabold text-white text-sm">{selectedTier.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-primary text-lg">{selectedTier.price}</span>
                  <span className="text-[10px] text-slate-400 block">{selectedTier.period}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. TOP OF FORM: Language Selection & Format Feature */}
                <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-primary/20">
                  {/* Edition Language Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Globe className="size-3.5 text-primary" /> Edition Language *
                      </span>
                      <span className="text-[10px] text-primary font-bold">{language}</span>
                    </label>

                    <div className="relative p-1 bg-slate-900/80 border border-primary/20 rounded-lg flex items-center">
                      <button
                        type="button"
                        onClick={() => setLanguage('English')}
                        className={`flex-1 py-2 px-3 rounded font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                          language === 'English'
                            ? 'bg-primary text-background-dark shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>🇬🇧 English</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLanguage('French')}
                        className={`flex-1 py-2 px-3 rounded font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                          language === 'French'
                            ? 'bg-primary text-background-dark shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>🇫🇷 French</span>
                      </button>
                    </div>
                  </div>

                  {/* Subscription Format (Online / Physical Print) */}
                  <div className="space-y-2 pt-2 border-t border-primary/10">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-primary" /> Subscription Format *
                      </span>
                      <span className="text-[10px] text-primary font-bold">{subType}</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSubType('Online')}
                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          subType === 'Online'
                            ? 'bg-primary/20 border-primary text-white shadow-md'
                            : 'bg-slate-900/60 border-primary/20 text-slate-400 hover:border-primary/40'
                        }`}
                      >
                        <div className="font-bold text-xs flex items-center justify-between">
                          <span>Digital / Online</span>
                          {subType === 'Online' && <CheckCircle2 className="size-3.5 text-primary" />}
                        </div>
                        <p className="text-[10px] opacity-75 mt-1 leading-tight">Instant Digital Access</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSubType('Physical')}
                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          subType === 'Physical'
                            ? 'bg-primary/20 border-primary text-white shadow-md'
                            : 'bg-slate-900/60 border-primary/20 text-slate-400 hover:border-primary/40'
                        }`}
                      >
                        <div className="font-bold text-xs flex items-center justify-between">
                          <span>Physical Print</span>
                          {subType === 'Physical' && <CheckCircle2 className="size-3.5 text-primary" />}
                        </div>
                        <p className="text-[10px] opacity-75 mt-1 leading-tight">Delivered Hard Copy</p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. SUBSCRIBER CONTACT DETAILS */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="size-3.5 text-primary" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-500 text-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="size-3.5 text-primary" /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-500 text-sm"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="size-3.5 text-primary" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-500 text-sm"
                      placeholder="Enter contact phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="size-3.5 text-primary" /> Organization / Company Name {selectedTier.category === 'institutional' && '*'}
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required={selectedTier.category === 'institutional'}
                      className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-500 text-sm"
                      placeholder="Enter corporate / company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-primary" /> Delivery Address {subType === 'Physical' && '*'}
                    </label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required={subType === 'Physical'}
                      rows={2}
                      className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-500 text-sm resize-none"
                      placeholder={subType === 'Physical' ? "Enter full physical address for print copy delivery *" : "Physical address for reports & print issues (optional)"}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-background-dark font-extrabold rounded-xl hover:bg-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider disabled:opacity-50 shadow-lg shadow-primary/20"
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <span>Proceed to Subscribe ({selectedTier.price})</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] pt-1">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
