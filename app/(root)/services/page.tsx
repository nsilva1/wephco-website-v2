'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { wephcoServices } from '@/lib/constants';
import { 
  BiStar, 
  BiGlobe, 
  BiSolidQuoteLeft,
  BiCheckDouble,
  BiTrendingUp,
  BiUserVoice
} from 'react-icons/bi';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col font-display pt-20">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-background-dark/30 via-background-dark/70 to-background-dark z-10"></div>
        <div className="absolute inset-0 scale-105">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCggR4STnpUKYvKcmOgBv7THHB1NiiT36GQW7sPLPZdgS5ZAiO8rvcmHVkRr_e9ocDgcQjklSv4F5oHkjWUiegd4cRULtvabEATKG_5Kjxj4f1bPARau0zMbNFsmrU17jQqG8nGHyisrf1q935Fp49we0l8wBDh4yYooUPX4fcGZvX6dFBS5lmhPAFGbU8VwAAXhOr4B-uS50qANQbw0QRTFoECeWeSGTUkVuKmRV-s4tAjwjdWb-uIdccu4mVcNv-SWJeggRukgijh"
            alt="Luxury Villa Sunset"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="opacity-75"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-12 md:mt-0">
          <h1 className="text-white text-5xl md:text-7xl font-light leading-tight mb-6 tracking-tight">
            Bespoke <span className="text-primary font-black italic">Real Estate</span> Services
          </h1>
          <p className="text-slate-300 text-base md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of luxury property management and private advisory tailored for the world&apos;s most discerning individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/consultations"
              className="bg-primary hover:bg-primary/95 text-background-dark px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl shadow-primary/20 text-center"
            >
              Request a Private Consultation
            </Link>
            <Link 
              href="/properties"
              className="border border-primary/40 hover:border-primary text-slate-100 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-all backdrop-blur-xs text-center"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Intro section using wephcoServices.intro */}
      <section className="py-12 px-6 md:px-20 bg-background-dark">
        <div className="max-w-4xl mx-auto text-center bg-neutral-dark/20 p-8 md:p-12 rounded-3xl border border-primary/10 backdrop-blur-md">
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed">
            {wephcoServices.intro}
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-6 md:px-20 bg-background-dark">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* 1. International Services */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-primary/10 pb-6">
              <div>
                <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">Global Coverage</span>
                <h3 className="text-slate-100 text-3xl font-light">
                  International <span className="font-extrabold text-primary">Services</span>
                </h3>
              </div>
              <p className="text-slate-400 text-xs italic">Connecting wealth with high-value prime global assets.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wephcoServices.international.map((service, idx) => (
                <div key={idx} className="bg-neutral-dark/20 p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 flex gap-5 items-start">
                  <div className="bg-primary/15 text-primary p-3.5 rounded-xl shrink-0">
                    <BiGlobe className="text-2xl" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-slate-100 text-lg font-bold">{service.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Local Services */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-primary/10 pb-6">
              <div>
                <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">Domestic Execution</span>
                <h3 className="text-slate-100 text-3xl font-light">
                  Local <span className="font-extrabold text-primary">Services</span>
                </h3>
              </div>
              <p className="text-slate-400 text-xs italic">Unmatched security, management, and positioning within Nigeria.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wephcoServices.local.map((service, idx) => (
                <div key={idx} className="bg-neutral-dark/20 p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-primary/15 text-primary p-3 rounded-lg w-fit">
                      <BiCheckDouble className="text-xl" />
                    </div>
                    <h4 className="text-slate-100 text-base font-bold">{service.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Consultation Services */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-primary/10 pb-6">
              <div>
                <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">Bespoke Guidance</span>
                <h3 className="text-slate-100 text-3xl font-light">
                  Consultation &amp; <span className="font-extrabold text-primary">Advisory</span>
                </h3>
              </div>
              <p className="text-slate-400 text-xs italic">Private structuring and strategic acquisition planning.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wephcoServices.consultation.map((service, idx) => (
                <div key={idx} className="bg-neutral-dark/20 p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-primary/15 text-primary p-3 rounded-lg w-fit">
                      <BiTrendingUp className="text-xl" />
                    </div>
                    <h4 className="text-slate-100 text-base font-bold">{service.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Luxe Advantage Section */}
      <section className="py-24 px-6 md:px-20 bg-neutral-dark/10 border-t border-primary/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-slate-100 text-4xl md:text-5xl font-light mb-8 leading-tight">
              The Wephco <span className="text-primary font-extrabold">Advantage</span>
            </h2>
            <p className="text-slate-400 text-base mb-12 leading-relaxed font-light">
              Redefining excellence in luxury real estate with a client-first framework. Our approach combines traditional values with modern global insights.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-primary/20 p-4 rounded-xl text-primary shrink-0">
                  <BiStar className="text-3xl" />
                </div>
                <div>
                  <h4 className="text-slate-100 text-lg font-bold mb-2">White-Glove Service</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Every detail is carefully managed from first view to legal close. We provide a completely seamless, stress-free brokerage cycle.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-primary/20 p-4 rounded-xl text-primary shrink-0">
                  <BiUserVoice className="text-3xl" />
                </div>
                <div>
                  <h4 className="text-slate-100 text-lg font-bold mb-2">Private Wealth Care</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Complete confidentiality, off-market transaction access, and structural security representing your family holdings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-center">
            <div className="w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden relative z-10 border border-primary/20 shadow-2xl">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8RBsFfm0ZMilxQ_z1S4xE3x0JVqynPAOH9_OYqualxAWi3ecsTuegrcbQ1bN2kSiw7axmDVVJjwHHUWEhcjIGNq788GU0IzFVC9rto7eRQCujQutAHaCIU4YyDAp0ZjPYptPG1pRBjVXhEJsltmYUULYp_KCsrDsmZL-8F6mRA92GehgJOhSk3eFXZDapk_Aawz-fd-51P6jG2cZ9d4JfKId-bk17eTweg2_yVxl3WxNjzXBt2zE-F8UbE793mGE0Ca7aZf4PlNwT"
                alt="Client Relationship"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-background-dark/90 backdrop-blur-md border border-primary/20 p-8 rounded-2xl z-20 max-w-[200px] shadow-xl">
              <p className="text-primary text-4xl font-black mb-1">5+</p>
              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                Years of Expertise in Luxury Markets
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-20 bg-background-dark border-t border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Testimonials</h2>
            <h3 className="text-slate-100 text-4xl md:text-5xl font-light mb-6">
              Voices of <span className="font-extrabold text-primary">Distinction</span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto italic text-sm leading-relaxed">
              Hear from global leaders and legacy builders who have entrusted their portfolios to our guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-neutral-dark/20 p-8 rounded-2xl border border-primary/10 flex flex-col h-full hover:border-primary/30 transition-all duration-300">
              <BiSolidQuoteLeft className="text-primary text-4xl mb-6 shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed mb-8 italic grow">
                &quot;The discretion and deep market insight provided are unparalleled. They secured an off-market property that perfectly matched my lifestyle objectives.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full overflow-hidden border border-primary/30 relative">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2zsUa1k2hpNYY-0ZmLrEad_lZ-sn8pZiwnQ025-hmLDaKhGOVjJuy8QyZJOzkPAGjN4Y_RfQBYth-Ss2K5KeOYh3_Qkq3IXoNp4Jfy1nE-YeMeAerqlB4LP3x0QMlDTjaJFbICc0BEazBBdOFud7f5jOtxeP5tXI-591BGEa050UGIeVXA1YuP9Zw8R1MkGqHnLkEvNtLoTDn53xz7vEnsBSsdS1YIn6C2Y94gN9mVRvetgeOZLv3Amj1kpl5O2Zqd92nYLWqxebf"
                    alt="Alexander Sterling"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h5 className="text-slate-100 font-bold text-sm">Alexander Sterling</h5>
                  <p className="text-primary text-[10px] uppercase tracking-wider font-semibold">CEO, Sterling Global</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-neutral-dark/20 p-8 rounded-2xl border border-primary/10 flex flex-col h-full hover:border-primary/30 transition-all duration-300 md:translate-y-4">
              <BiSolidQuoteLeft className="text-primary text-4xl mb-6 shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed mb-8 italic grow">
                &quot;The client-care isn&apos;t just a promise; it&apos;s their standard. Every detail of our international asset relocation was managed with absolute precision.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full overflow-hidden border border-primary/30 relative">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8RBsFfm0ZMilxQ_z1S4xE3x0JVqynPAOH9_OYqualxAWi3ecsTuegrcbQ1bN2kSiw7axmDVVJjwHHUWEhcjIGNq788GU0IzFVC9rto7eRQCujQutAHaCIU4YyDAp0ZjPYptPG1pRBjVXhEJsltmYUULYp_KCsrDsmZL-8F6mRA92GehgJOhSk3eFXZDapk_Aawz-fd-51P6jG2cZ9d4JfKId-bk17eTweg2_yVxl3WxNjzXBt2zE-F8UbE793mGE0Ca7aZf4PlNwT"
                    alt="Isabella Vane"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h5 className="text-slate-100 font-bold text-sm">Isabella Vane</h5>
                  <p className="text-primary text-[10px] uppercase tracking-wider font-semibold">Acclaimed Architect</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-neutral-dark/20 p-8 rounded-2xl border border-primary/10 flex flex-col h-full hover:border-primary/30 transition-all duration-300">
              <BiSolidQuoteLeft className="text-primary text-4xl mb-6 shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed mb-8 italic grow">
                &quot;A masterclass in wealth advisory. Their ability to acquire off-market placements in highly competitive climates is why they remain our only option.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full overflow-hidden border border-primary/30 relative">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtf1LOYDspq3KHMEbD65oMjq2yDYeriVPy6ZcKSzgiCaIxsJSntRCTPZTb8j3HLDZ9n-_v1PCua9j9D2syKQB2aqGfyAmHivbfaN9BMIQvfGg97_7ci3mHdUwmy6Pq5_RUuwzkAkGl9nPEKPS4cgKu1yrZ6E50NTTexnvQBfRwe4NtgZ75hh_hDfPrzpkhJcfVvEnGYV0Ee1cbpfpu0y0h-bzkIh_v7QoXBg7o2sr0gvNI_iLZZNZ-QWQUTSm1k8d-9e5RQN5rJIHq"
                    alt="Marcus Thorne"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h5 className="text-slate-100 font-bold text-sm">Marcus Thorne</h5>
                  <p className="text-primary text-[10px] uppercase tracking-wider font-semibold">Venture Philanthropist</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Outro & CTA Section using wephcoServices.outro */}
      <section className="py-24 px-6 md:px-20 text-center relative overflow-hidden bg-background-dark border-t border-primary/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-slate-100 text-4xl md:text-5xl font-light mb-6 leading-tight">
            Elevate Your Real Estate <span className="font-extrabold text-primary">Journey</span>
          </h2>
          <p className="text-slate-300 text-base mb-10 max-w-xl mx-auto leading-relaxed font-light">
            {wephcoServices.outro}
          </p>
          <Link 
            href="/consultations"
            className="inline-block bg-primary text-background-dark px-10 py-4.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-primary/95 transition-all hover:scale-105 shadow-2xl shadow-primary/30"
          >
            Request a Private Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}
