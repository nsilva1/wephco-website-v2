'use client';

import React, { useState, SubmitEvent } from 'react';
import {
  Calendar,
  Clock,
  User,
  Users,
  Building2,
  Key,
  Shield,
  Star,
  Wallet,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { createConsultation } from '@/actions/consultation';
import { consultationServices } from '@/lib/constants';
import { sendBookingConfirmationEmail } from '@/actions/email';
import { formatMeetingDate } from '@/lib/helperFunctions';

// Match services to icons dynamically
const getServiceIcon = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized.includes('brokerage')) return Building2;
  if (normalized.includes('management')) return Key;
  if (normalized.includes('consulting')) return Users;
  return Wallet;
};

const privateConsultationPaymentLink = 'https://sandbox.flutterwave.com/pay/jhawafmnzuoc';

const ConsultationsPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Initial state with no service selected initially
  const [formData, setFormData] = useState({
    service: '',
    meetingDate: '',
    meetingTime: '11:00 AM',
    meetingLocation: 'virtual',
    preferredModeOfContact: 'email',
    phoneNumber: '',
    email: '',
    organizationName: '',
    name: '',
    priceRange: '$200k - $1M',
    details: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (label: string) => {
    setFormData((prev) => ({ ...prev, service: label }));
  };

  const submitForm = async (e: SubmitEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.meetingDate
    ) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Structure details nicely to save all details into the DB schema
      const fullDetails = `Price Range: ${formData.priceRange}\nPreferred Time: ${formData.meetingTime}\nOrganization: ${formData.organizationName || 'None'}\n\nMessage: ${formData.details}`;

      const consultation = await createConsultation({
        service: formData.service,
        meetingDate: new Date(formData.meetingDate),
        meetingLocation: formData.meetingLocation,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        organizationName: formData.organizationName,
        name: formData.name,
        preferredModeOfContact: formData.preferredModeOfContact,
        details: fullDetails,
        status: false,
      });

      toast.success(
        'Your private consultation request has been scheduled successfully!'
      );

      if (formData.service === 'Private Consulting') {
        window.location.href = privateConsultationPaymentLink;
      }

      // send email to the user confirming the consultation booking
      await sendBookingConfirmationEmail({
        toEmail: formData.email,
        props: {
          customerName: formData.name,
          bookingId: consultation.id,
          serviceName: formData.service,
          bookingDate: formatMeetingDate(formData.meetingDate),
          bookingTime: formData.meetingTime,
          meetingLocation: formData.meetingLocation === 'virtual' ? 'Virtual (Google Meet)' : 'Physical',
          meetingLink: formData.meetingLocation === 'virtual' ? 'https://meet.google.com/vfg-kjnq-jqa?hs=186' : 'Los Angeles Mall, Kado, Abuja',
        },
      });

      // Reset form
      setFormData({
        service: '',
        meetingDate: '',
        meetingTime: '11:00 AM',
        meetingLocation: 'virtual',
        preferredModeOfContact: 'email',
        phoneNumber: '',
        email: '',
        organizationName: '',
        name: '',
        priceRange: '$2M - $5M',
        details: '',
      });
      setActiveStep(1);
    } catch (error) {
      toast.error(
        (error as Error).message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Find currently selected service details for Step 1
  const selectedServiceObj = consultationServices.find((s) => s.label === formData.service);
  const SelectedIcon = selectedServiceObj ? getServiceIcon(selectedServiceObj.label) : Wallet;

  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-display pt-20 overflow-x-hidden">
      {/* ------------------------------------------------------------------- */}
      {/* HERO HEADER */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-12 pb-24 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-background-dark/80 to-background-dark z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `linear-gradient(rgba(1, 26, 17, 0.4), rgba(1, 26, 17, 0.85)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3__jIO7Q6O8B4hGtEX2zv6aFO73APne6N5KPQiuAllL8trjOLsz4OmTMfTLsmgMkzgSFmnmmRrPfx-xuP1vZNL3sEW9Ar3g1RzOEuiLC5yD7uFOLEC5Cv3K60Ub8HXvwmX9GJZ3n8HQ2qlYkDsQ3aUElmYPKTJbE_4J0O5E1adCvVRjgbLhQBqa0IX7Lk7N5bikYezOw6enyf8flmujdmNLktGrms-ldkrGE_KmDlmUFoWYLl9Aqm7L4Yja7BmfmgtaGBL5xlcb7B')`,
          }}
        />

        <div className="relative z-20 max-w-4xl text-center space-y-6 pt-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
            Schedule Private <br />
            <span className="text-primary font-black italic">Consultation</span>
          </h1>

          <p className="text-slate-200 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Experience tailormade real estate advisory configured to your unique lifestyle, legacy, and investment goals. Our elite advisory partners are ready to guide you.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> 100% Confidential
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" /> Off-Market Access
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Dedicated Advisor
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* MAIN FORM SECTION (FULL WIDTH) */}
      {/* ------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 -mt-16 relative z-30">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-primary/30 rounded-3xl shadow-2xl overflow-hidden">
          {/* Stepper Progress Header */}
          <div className="bg-slate-900/90 px-6 py-6 border-b border-primary/20">
            {/* Top Progress Line */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-primary h-full transition-all duration-500 rounded-full"
                style={{ width: `${(activeStep / 3) * 100}%` }}
              />
            </div>

            {/* Step Navigation Indicators */}
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => step < activeStep && setActiveStep(step)}
                  className={`flex items-center gap-3 transition-all cursor-pointer ${
                    step >= activeStep ? 'cursor-default' : ''
                  }`}
                  disabled={step >= activeStep}
                >
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold border transition-all ${
                      activeStep === step
                        ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/30 scale-105'
                        : activeStep > step
                        ? 'bg-primary/20 text-primary border-primary/40'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    {activeStep > step ? '✓' : step}
                  </span>
                  <div className="text-left hidden sm:block">
                    <p
                      className={`text-xs uppercase font-extrabold tracking-wider ${
                        activeStep === step ? 'text-primary' : 'text-slate-400'
                      }`}
                    >
                      Step {step}
                    </p>
                    <p className="text-xs font-semibold text-slate-200">
                      {step === 1 && 'Service Type'}
                      {step === 2 && 'Date & Time'}
                      {step === 3 && 'Personal Details'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content - Full Width Space */}
          <div className="p-6 md:p-12">
            <form onSubmit={submitForm}>
              {/* ----------------------------------------------------------- */}
              {/* STEP 1: SELECT SERVICE */}
              {/* ----------------------------------------------------------- */}
              {activeStep === 1 && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Select Service Type</h3>
                      <p className="text-xs text-slate-400">Choose the advisory scope tailored to your requirements.</p>
                    </div>
                  </div>

                  {/* Consultation Services Grid (Icon, Label, Checkmark ONLY) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {consultationServices.map((service) => {
                      const Icon = getServiceIcon(service.label);
                      const isSelected = formData.service === service.label;
                      return (
                        <div
                          key={service.label}
                          onClick={() => handleServiceSelect(service.label)}
                          className={`cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between items-start gap-4 ${
                            isSelected
                              ? 'bg-primary/15 border-2 border-primary shadow-xl shadow-primary/20 text-white scale-[1.02]'
                              : 'border-primary/20 bg-slate-900/60 text-slate-300 hover:border-primary/50 hover:bg-slate-900/90'
                          }`}
                        >
                          <div className="w-full flex justify-between items-center">
                            <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-background-dark' : 'bg-primary/15 text-primary'}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            {isSelected && (
                              <span className="w-7 h-7 rounded-full bg-primary text-background-dark flex items-center justify-center text-sm font-black shadow-md">
                                ✓
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="text-base font-extrabold text-white leading-tight">
                              {service.label}
                            </p>
                            {service.label === 'Private Consulting' && (
                              <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1 pt-1">
                                <Lock className="w-3 h-3 text-primary" /> Paid Advisory
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Features Section for Currently Selected Card */}
                  {selectedServiceObj ? (
                    <div className="p-6 rounded-2xl bg-slate-900/80 border-2 border-primary/40 shadow-xl space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-primary/20 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary text-background-dark">
                            <SelectedIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                              {selectedServiceObj.label} Scope &amp; Deliverables
                            </h4>
                            <p className="text-[11px] text-slate-400">Features included with this selected advisory package</p>
                          </div>
                        </div>
                        {selectedServiceObj.label === 'Private Consulting' && (
                          <span className="text-[11px] font-bold text-primary bg-primary/15 border border-primary/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                            <Lock className="w-3 h-3" /> Paid Premium Service
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                        {selectedServiceObj.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-xs text-slate-200 font-semibold">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
                        <Sparkles className="w-5 h-5 text-primary/70" />
                      </div>
                      <p className="text-sm font-semibold text-slate-300">
                        No service selected yet
                      </p>
                      <p className="text-xs text-slate-500">
                        Select one of the consultation cards above to view its features and proceed.
                      </p>
                    </div>
                  )}

                  {/* Proceed Button (Disabled when no service selected) */}
                  <div className="flex justify-end pt-6 border-t border-primary/15">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      disabled={!formData.service}
                      className={`px-8 py-3.5 font-extrabold rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-wider ${
                        !formData.service
                          ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
                          : 'bg-primary text-background-dark hover:bg-primary/95 shadow-lg shadow-primary/20 cursor-pointer'
                      }`}
                    >
                      <span>Continue to Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------- */}
              {/* STEP 2: DATE & TIME */}
              {/* ----------------------------------------------------------- */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Preferred Date &amp; Time</h3>
                      <p className="text-xs text-slate-400">Select your preferred date, time slot, and meeting format.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> Select Preferred Date *
                      </label>
                      <input
                        name="meetingDate"
                        value={formData.meetingDate}
                        onChange={handleChange}
                        type="date"
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> Select Time Slot (GMT+1) *
                      </label>
                      <select
                        name="meetingTime"
                        value={formData.meetingTime}
                        onChange={handleChange}
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                      >
                        <option value="09:00 AM">09:00 AM (Morning)</option>
                        <option value="11:00 AM">11:00 AM (Late Morning)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon)</option>
                        <option value="04:00 PM">04:00 PM (Late Afternoon)</option>
                      </select>
                    </div>

                    {/* Meeting Channel */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" /> Meeting Format *
                      </label>
                      <select
                        name="meetingLocation"
                        value={formData.meetingLocation}
                        onChange={handleChange}
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                      >
                        <option value="virtual">Virtual Video Conference (Google Meet)</option>
                        <option value="physical">Physical Meeting (Abuja Executive Suite)</option>
                      </select>
                    </div>

                    {/* Contact Preference */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" /> Preferred Contact Mode *
                      </label>
                      <select
                        name="preferredModeOfContact"
                        value={formData.preferredModeOfContact}
                        onChange={handleChange}
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                      >
                        <option value="email">Direct Email Confirmation</option>
                        <option value="phone">Telephone Call</option>
                        <option value="whatsapp">WhatsApp Direct Chat</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-primary/15">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3.5 border border-slate-700 text-slate-300 font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer text-xs uppercase tracking-wider"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.meetingDate) {
                          toast.warning('Please select a preferred meeting date');
                          return;
                        }
                        setActiveStep(3);
                      }}
                      className="px-8 py-3.5 bg-primary text-background-dark font-extrabold rounded-xl hover:bg-primary/95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------- */}
              {/* STEP 3: PERSONAL DETAILS */}
              {/* ----------------------------------------------------------- */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Personal &amp; Investment Details</h3>
                      <p className="text-xs text-slate-400">Provide your contact details and investment criteria.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Chief Alexander Sterling"
                        type="text"
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@domain.com"
                        type="email"
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+234 ..."
                        type="tel"
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Investment Price Range
                      </label>
                      <select
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                      >
                        <option value="$200k - $1M">Price Range: $200k - $1M</option>
                        <option value="$2M - $5M">Price Range: $2M - $5M</option>
                        <option value="$5M - $10M">Price Range: $6M - $10M</option>
                        <option value="$10M+">Price Range: $10M+</option>
                        <option value="Not Applicable">Not Applicable</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Organization / Family Office (Optional)
                      </label>
                      <input
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder="e.g. Sterling Global Holdings"
                        type="text"
                        className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Advisory Scope &amp; Specific Property Objectives (Optional)
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Detail your acquisition goals, preferred locations (e.g. Abu Dhabi, London, Abuja), or asset criteria..."
                      rows={4}
                      className="w-full bg-slate-900/90 border border-primary/30 rounded-xl p-3.5 text-slate-100 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="flex justify-between pt-6 border-t border-primary/15">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3.5 border border-slate-700 text-slate-300 font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer text-xs uppercase tracking-wider"
                      disabled={loading}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-10 py-4 bg-linear-to-r from-primary via-[#e5c158] to-[#b38f28] text-background-dark font-black rounded-xl hover:bg-primary/95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 cursor-pointer text-xs uppercase tracking-wider transform hover:scale-[1.02]"
                    >
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <span>
                            {formData.service === 'Private Consulting'
                              ? 'Reserve Private Consultation'
                              : 'Confirm Advisory Booking'}
                          </span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationsPage;
