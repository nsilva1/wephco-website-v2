'use client';

import React, { useState } from 'react';
import { User, Mail, MapPin, BookOpen, ArrowRight, IdCard } from 'lucide-react';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { createMagazineSubscription } from '@/actions/magazine';

const ONLINE_PAYMENT_LINK = 'https://sandbox.flutterwave.com/pay/cowfzvobwq1v';
const PHYSICAL_PAYMENT_LINK = 'https://sandbox.flutterwave.com/pay/yvxd7gzfe3bu';

export default function MagazineSubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [subType, setSubType] = useState<'Physical' | 'Online'>('Online');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      toast.warning('Please enter a delivery address for physical subscription');
      return;
    }

    setLoading(true);

    try {
      const fee = subType === 'Physical' ? 5000 : 1000;
      await createMagazineSubscription({
        type: subType,
        name: formData.name,
        email: formData.email,
        deliveryAddress: subType === 'Physical' ? formData.deliveryAddress : '',
        fee,
      });

      toast.success('Subscription registered successfully! Redirecting to payment...');

      const paymentLink = subType === 'Physical' ? PHYSICAL_PAYMENT_LINK : ONLINE_PAYMENT_LINK;
      
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
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Wephco Luxe Magazine
            </h1>
            <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Subscribe to the premier publication covering global luxury real estate, design masterpieces, and wealth preservation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left: Option Selection */}
            <div className="flex-1 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <BookOpen className="size-5 text-primary" /> Choose Subscription Type
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Online Subscription Option */}
                <div
                  onClick={() => setSubType('Online')}
                  className={`cursor-pointer border rounded-xl p-5 flex flex-col justify-between transition-all hover:scale-[1.01] ${
                    subType === 'Online'
                      ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/10'
                      : 'border-primary/20 bg-slate-800/40 text-slate-300 hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-lg">Digital Edition</span>
                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                      subType === 'Online' ? 'bg-background-dark/20 text-background-dark' : 'bg-primary/20 text-primary'
                    }`}>Online</span>
                  </div>
                  <p className="text-xs mb-4 opacity-85 leading-relaxed">
                    Instant access to digital issues, premium interactive reports, and early investor circle releases.
                  </p>
                  <p className="font-extrabold text-xl">₦1,000</p>
                </div>

                {/* Physical Subscription Option */}
                <div
                  onClick={() => setSubType('Physical')}
                  className={`cursor-pointer border rounded-xl p-5 flex flex-col justify-between transition-all hover:scale-[1.01] ${
                    subType === 'Physical'
                      ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/10'
                      : 'border-primary/20 bg-slate-800/40 text-slate-300 hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-lg">Premium Print Edition</span>
                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                      subType === 'Physical' ? 'bg-background-dark/20 text-background-dark' : 'bg-primary/20 text-primary'
                    }`}>Physical</span>
                  </div>
                  <p className="text-xs mb-4 opacity-85 leading-relaxed">
                    Luxe high-grammage physical copies delivered to your address, plus complete digital edition access.
                  </p>
                  <p className="font-extrabold text-xl">₦5,000</p>
                </div>
              </div>
            </div>

            {/* Right: Subscription Form */}
            <div className="flex-1 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-primary/15 pt-8 md:pt-0 md:pl-8">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <IdCard className="size-5 text-primary" /> Subscriber Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
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

                {subType === 'Physical' && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-primary" /> Delivery Address *
                    </label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-500 text-sm resize-none"
                      placeholder="Enter full address for magazine delivery"
                      required
                    />
                  </div>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
