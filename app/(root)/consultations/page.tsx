'use client';

import React, { useState, FormEvent } from 'react';
import { 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Briefcase, 
  Users, 
  Landmark, 
  GraduationCap, 
  Building2, 
  Key, 
  Paintbrush, 
  ShoppingBag, 
  FileText, 
  Shield, 
  Star, 
  Wallet,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { createConsultation } from '@/actions/consultation';
import { consultationServices } from '@/lib/constants';

// Match services to icons dynamically
const getServiceIcon = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized.includes('strategic') || normalized.includes('business')) return Briefcase;
  if (normalized.includes('partnership') || normalized.includes('sponsorship')) return Users;
  if (normalized.includes('investment') || normalized.includes('mortgage') || normalized.includes('financial')) return Landmark;
  if (normalized.includes('training') || normalized.includes('capacity')) return GraduationCap;
  if (normalized.includes('brokerage') || normalized.includes('property')) return Building2;
  if (normalized.includes('leasing') || normalized.includes('management')) return Key;
  if (normalized.includes('interior') || normalized.includes('design') || normalized.includes('renovation')) return Paintbrush;
  if (normalized.includes('acquisition')) return ShoppingBag;
  if (normalized.includes('coaching') || normalized.includes('deal')) return FileText;
  if (normalized.includes('private') || normalized.includes('advisory')) return Shield;
  if (normalized.includes('circle') || normalized.includes('investor')) return Star;
  return Wallet;
};

const ConsultationsPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  
  const [formData, setFormData] = useState({
    service: consultationServices[0]?.label || '',
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

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.meetingDate) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Structure details nicely to save all details into the DB schema
      const fullDetails = `Price Range: ${formData.priceRange}\nPreferred Time: ${formData.meetingTime}\nOrganization: ${formData.organizationName || 'None'}\n\nMessage: ${formData.details}`;
      
      await createConsultation({
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

      toast.success('Your private consultation request has been scheduled successfully!');
      
      // Reset form
      setFormData({
        service: consultationServices[0]?.label || '',
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
      toast.error((error as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans">
      {/* Hero Header */}
      <section className="relative">
        <div 
          className="w-full h-[360px] md:h-[450px] bg-cover bg-center flex items-center justify-center p-6 text-center" 
          style={{
            backgroundImage: `linear-gradient(rgba(32, 29, 18, 0.8), rgba(32, 29, 18, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3__jIO7Q6O8B4hGtEX2zv6aFO73APne6N5KPQiuAllL8trjOLsz4OmTMfTLsmgMkzgSFmnmmRrPfx-xuP1vZNL3sEW9Ar3g1RzOEuiLC5yD7uFOLEC5Cv3K60Ub8HXvwmX9GJZ3n8HQ2qlYkDsQ3aUElmYPKTJbE_4J0O5E1adCvVRjgbLhQBqa0IX7Lk7N5bikYezOw6enyf8flmujdmNLktGrms-ldkrGE_KmDlmUFoWYLl9Aqm7L4Yja7BmfmgtaGBL5xlcb7B')`
          }}
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Schedule Consultation
            </h1>
            <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Experience tailormade real estate advisory configured to your unique lifestyle and investment goals. Our elite advisory partners are ready to guide you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 -mt-20 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Form Steps Container */}
            <div className="lg:col-span-2 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-primary/10">
              
              {/* Step Navigation Indicators */}
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-primary/10">
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => step < activeStep && setActiveStep(step)}
                    className="flex items-center gap-2 group transition-all"
                    disabled={step >= activeStep}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                      activeStep === step 
                        ? 'bg-primary text-background-dark border-primary shadow-md shadow-primary/20' 
                        : activeStep > step
                        ? 'bg-primary/20 text-primary border-primary/30'
                        : 'bg-transparent text-slate-500 border-slate-700'
                    }`}>
                      {activeStep > step ? '✓' : step}
                    </span>
                    <span className={`text-xs md:text-sm font-semibold hidden sm:inline ${
                      activeStep === step ? 'text-primary' : 'text-slate-400'
                    }`}>
                      {step === 1 && 'Service Type'}
                      {step === 2 && 'Date & Time'}
                      {step === 3 && 'Personal Details'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <form onSubmit={submitForm}>
                
                {/* STEP 1: SELECT SERVICE */}
                {activeStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                      <h3 className="text-xl font-bold text-primary">Select Service Type</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                      {consultationServices.map((service) => {
                        const Icon = getServiceIcon(service.label);
                        const isSelected = formData.service === service.label;
                        return (
                          <div
                            key={service.label}
                            onClick={() => handleServiceSelect(service.label)}
                            className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.01] ${
                              isSelected 
                                ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/10' 
                                : 'border-primary/20 bg-slate-800/40 text-slate-300 hover:border-primary/50'
                            }`}
                          >
                            <div className={`p-2.5 rounded-lg ${
                              isSelected ? 'bg-background-dark/15 text-background-dark' : 'bg-primary/10 text-primary'
                            }`}>
                              <Icon className="size-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold leading-tight">{service.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="px-6 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
                      >
                        Next Step <span>→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: DATE & TIME */}
                {activeStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                      <h3 className="text-xl font-bold text-primary">Preferred Date & Time</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <Calendar className="size-4 text-primary" /> Select Date
                        </label>
                        <input
                          name="meetingDate"
                          value={formData.meetingDate}
                          onChange={handleChange}
                          type="date"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <Clock className="size-4 text-primary" /> Select Time (GMT)
                        </label>
                        <select
                          name="meetingTime"
                          value={formData.meetingTime}
                          onChange={handleChange}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <MapPin className="size-4 text-primary" /> Meeting Channel
                        </label>
                        <select
                          name="meetingLocation"
                          value={formData.meetingLocation}
                          onChange={handleChange}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="virtual">Virtual (Zoom, Google Meet, Teams)</option>
                          <option value="physical">Physical</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <User className="size-4 text-primary" /> Contact Preference
                        </label>
                        <select
                          name="preferredModeOfContact"
                          value={formData.preferredModeOfContact}
                          onChange={handleChange}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone Call</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="px-6 py-3 border border-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-all"
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
                        className="px-6 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
                      >
                        Next Step <span>→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PERSONAL DETAILS */}
                {activeStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                      <h3 className="text-xl font-bold text-primary">Personal Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          type="text"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          type="email"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          type="tel"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <select
                          name="priceRange"
                          value={formData.priceRange}
                          onChange={handleChange}
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="$200k - $1M">Price Range: $200k - $1M</option>
                          <option value="$2M - $5M">Price Range: $2M - $5M</option>
                          <option value="$5M - $10M">Price Range: $6M - $10M</option>
                          <option value="$10M+">Price Range: $10M+</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <input
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleChange}
                          placeholder="Organization Name (Optional)"
                          type="text"
                          className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Additional details or specific properties of interest..."
                        rows={4}
                        className="w-full bg-slate-800/60 border border-primary/20 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      ></textarea>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="px-6 py-3 border border-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-all"
                        disabled={loading}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/15"
                      >
                        {loading ? <Loader /> : (
                          <>
                            <span>Confirm Booking</span>
                            <CheckCircle2 className="size-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Sidebar Info Area */}
            <div className="p-6 md:p-10 bg-slate-900/40 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">What to Expect</h4>
                  <ul className="space-y-5">
                    <li className="flex gap-3.5">
                      <div className="text-primary mt-0.5"><Star className="size-4" /></div>
                      <div>
                        <p className="font-bold text-sm text-slate-200">Market Insights</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">A deep dive into current inventory and off-market opportunities.</p>
                      </div>
                    </li>
                    <li className="flex gap-3.5">
                      <div className="text-primary mt-0.5"><Shield className="size-4" /></div>
                      <div>
                        <p className="font-bold text-sm text-slate-200">Discretion</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Full confidentiality regarding your identity and investment goals.</p>
                      </div>
                    </li>
                    <li className="flex gap-3.5">
                      <div className="text-primary mt-0.5"><FileText className="size-4" /></div>
                      <div>
                        <p className="font-bold text-sm text-slate-200">Custom Roadmap</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">Personalized strategy for your acquisition or divestment needs.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                  <h4 className="text-xs font-bold mb-2 flex items-center gap-2 text-slate-200">
                    <Phone className="size-3.5 text-primary" /> Immediate Assistance?
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-3">Our concierge is available for urgent inquiries.</p>
                  <a className="text-primary font-bold text-base hover:underline" href="tel:+2349161246300">+234 (0) 916-124-6300</a>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/10">
                <div className="flex items-center gap-3">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Wephco Global Elite Team</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultationsPage;
