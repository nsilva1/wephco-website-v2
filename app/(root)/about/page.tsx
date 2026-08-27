'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Eye,
  HeartHandshake,
  Award,
  Lightbulb,
  Building2,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  UserCheck,
  Briefcase,
  Layers,
} from 'lucide-react';

// Leadership & Team Data from Company Profile (Page 8) with Extracted PDF Images
const teamMembers = [
  {
    name: 'Harvey Nwachukwu',
    role: 'CEO and Group Chairman',
    image: '/images/pdf-about/team_harvey_nwachukwu.png',
    bio: 'Visionary real estate leader driving Wephco’s global expansion, wealth creation frameworks, and institutional trust.',
  },
  {
    name: 'Peter Ekwe',
    role: 'Human Resource Manager & Regional Trainer',
    image: '/images/pdf-about/team_peter_ekwe.png',
    bio: 'Oversees organizational growth, talent development, and regional advisory training across Wephco operations.',
  },
  {
    name: 'Corina Aaron',
    role: 'Corporate Trainer',
    image: '/images/pdf-about/team_corina_aaron.png',
    bio: 'Directs corporate excellence standards, international advisory alignment, and client service strategy.',
  },
  {
    name: 'Keleb Nwubani',
    role: 'Brand Ambassador',
    image: '/images/pdf-about/team_keleb_nwubani.png',
    bio: 'Acclaimed professional athlete and advocate representing Wephco’s brand values of discipline and wealth building.',
  },
  {
    name: 'Abdullateef Kadiri',
    role: 'Business Developer',
    image: '/images/pdf-about/team_abdullateef_kadiri.png',
    bio: 'Spearheads strategic partnerships, developer alliances, and new market acquisition pathways.',
  },
  {
    name: 'Duru Chinwendu Blessing',
    role: 'Sales Executive',
    image: '/images/pdf-about/team_duru_blessing.png',
    bio: 'Drives high-value residential and commercial property matching for private and corporate investors.',
  },
  {
    name: 'Chibuzor Okenyi',
    role: 'Digital Marketer',
    image: '/images/pdf-about/team_chibuzor_okenyi.png',
    bio: 'Manages digital media positioning, property campaign distribution, and global investor reach.',
  },
  {
    name: 'Mercy Rowland Igwe',
    role: 'Customer Relationship Manager',
    image: '/images/pdf-about/team_mercy_igwe.png',
    bio: 'Ensures white-glove client experience, concierge onboarding, and long-term portfolio relationship care.',
  },
  {
    name: 'Isah Ismail',
    role: 'Regional Marketer, Kano',
    image: '/images/pdf-about/team_isah_ismail.png',
    bio: 'Leads northern regional market expansion, diaspora client engagement, and local developer networks.',
  },
  {
    name: 'Elijah Thomas Gabriel',
    role: 'Visual Director',
    image: '/images/pdf-about/team_elijah_gabriel.png',
    bio: 'Curates high-definition visual storytelling, architectural presentation, and brand media standards.',
  },
  {
    name: 'Great Nwachukwu',
    role: 'Accounting and Finance',
    image: '/images/pdf-about/team_great_nwachukwu.png',
    bio: 'Oversees corporate financial compliance, transaction verification, and escrow audit frameworks.',
  },
];

// Featured Projects Portfolio from Company Profile (Pages 17-20) with Extracted PDF Images
const featuredProjects = [
  {
    title: 'The Canopies at Yas Point',
    location: 'Abu Dhabi, UAE',
    type: 'Luxury Residential & Resort Community',
    image: '/images/pdf-about/project_canopies_yas_point.png',
    description: 'Bespoke waterfront development offering world-class luxury residences, lush canopy views, and high-yield asset appreciation.',
  },
  {
    title: 'Ogami Bloom Island',
    location: 'Abu Dhabi, UAE',
    type: 'Exclusive Island Villas',
    image: '/images/pdf-about/project_ogami_bloom_island.png',
    description: 'Private architectural island sanctuary with private pools, Mediterranean aesthetics, and waterfront tranquility.',
  },
  {
    title: 'Bermondsey',
    location: 'London, United Kingdom',
    type: 'Prime Urban High-Rise',
    image: '/images/pdf-about/project_bermondsey_london.png',
    description: 'Contemporary London residential tower positioned in a vibrant, high-demand capital growth zone.',
  },
  {
    title: 'Woolwich',
    location: 'London, United Kingdom',
    type: 'Capital Growth Apartments',
    image: '/images/pdf-about/project_woolwich_london.png',
    description: 'Modern urban luxury development offering strong rental demand, Crossrail connectivity, and long-term capital preservation.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-20 overflow-x-hidden">
      {/* ------------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-background-dark/80 to-background-dark z-10" />
        <div className="absolute inset-0 bg-cover bg-center scale-105">
          <Image
            src="/images/pdf-about/page_highres_1.png"
            alt="WEPHCO Global Architecture Cover"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="relative z-20 max-w-5xl px-6 text-center space-y-6 pt-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
            Connecting Global Capital to <br />
            <span className="text-primary font-black italic">Sustainable Real Estate</span>
          </h1>

          <p className="text-slate-200 text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Since our establishment in 2022, WEPHCO has built an unwavering reputation for trust, transparency, and innovation, connecting investors with prime developments across Africa, the Middle East, Europe, and emerging global markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#who-we-are"
              className="bg-primary hover:bg-primary/95 text-background-dark px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl shadow-primary/20 text-center"
            >
              Discover Our Story
            </a>
            <Link
              href="/consultations"
              className="border border-primary/40 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-all backdrop-blur-xs text-center"
            >
              Book Advisory Session
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* KEY STATS STRIP */}
      {/* ------------------------------------------------------------------- */}
      <section className="bg-slate-950 py-12 border-b border-primary/10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-display">
          <div className="space-y-1">
            <p className="text-3xl md:text-5xl font-black text-primary">2022</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Established Year</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-5xl font-black text-white">4+ Regions</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Africa, Middle East, UK &amp; Europe</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-5xl font-black text-primary">100%</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Verified Due Diligence</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-5xl font-black text-white">3 Cycles</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Proprietary Investment Frameworks</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* WHO WE ARE & MESSAGE FROM THE CEO */}
      {/* ------------------------------------------------------------------- */}
      <section id="who-we-are" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-24">
        {/* Who We Are */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                Beyond Selling Property: <br />
                <span className="font-black text-primary">Creating Lasting Value</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-300 font-light text-base leading-relaxed">
              <p>
                WEPHCO is a brokerage and investment advisory firm committed to helping individuals, businesses, and institutional investors build sustainable wealth through carefully selected local and international real estate opportunities.
              </p>
              <p>
                Since our establishment in 2022, we have built a reputation for trust, professionalism, and transparency by connecting investors with premium developments across Africa, the Middle East, Europe, and other emerging global markets. We provide end-to-end investment solutions from property sourcing and legal verification to acquisition, portfolio management, and strategic advisory.
              </p>
              <p className="border-l-2 border-primary pl-4 text-white font-medium italic">
                &ldquo;Our mission goes beyond selling properties. We create investment pathways that enable our clients to preserve wealth, generate passive income, and achieve long-term financial security through real estate.&rdquo;
              </p>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-2xl relative border border-primary/30">
              <Image
                src="/images/pdf-about/who_we_are_team.png"
                alt="WEPHCO Team Award Ceremony"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-slate-900/95 backdrop-blur-md border border-primary/30 p-5 rounded-2xl max-w-xs shadow-xl hidden sm:block">
              <p className="text-primary text-xl font-black mb-1">100% Verified</p>
              <p className="text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                Integrity, Transparency &amp; Due Diligence
              </p>
            </div>
          </div>
        </div>

        {/* Message from the CEO */}
        <div className="bg-linear-to-br from-slate-900 to-slate-950 p-8 md:p-14 rounded-3xl border border-primary/30 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-3 gap-10 items-center relative z-10">
            {/* CEO Photo extracted from PDF Page 4 */}
            <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pdf-about/ceo_harvey_nwachukwu.png"
                alt="Harvey Nwachukwu - CEO and Group Chairman"
                fill
                // objectFit='cover'
                // className='scale-x-110'
              />
            </div>

            {/* CEO Message Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center border-b border-primary/20 pb-4">
                <div>
                  <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">
                    Message From The CEO&apos;s Desk
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-white">
                    Harvey <span className="font-extrabold text-primary">Nwachukwu</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">CEO and Group Chairman, WEPHCO</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed font-light">
                <p>
                  Every generation is presented with defining opportunities, moments that reshape industries, create wealth, and transform economies. We believe Africa is living through one of those defining moments.
                </p>
                <p>
                  At WEPHCO, we see beyond buildings and transactions. We see communities taking shape, cities expanding, businesses growing, and investors creating legacies that will endure for generations. Real estate has always been one of the world&apos;s most resilient wealth-building assets, and our purpose is to make these opportunities accessible through trusted guidance, strategic partnerships, and uncompromising professionalism.
                </p>
                <p>
                  Our journey has been built on one simple philosophy: <strong>people invest with confidence when they invest with trust.</strong> That philosophy influences every relationship we build, every opportunity we evaluate, and every recommendation we make.
                </p>
              </div>

              <div className="pt-4 border-t border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <blockquote className="text-base font-bold text-white italic">
                  &ldquo;At Wephco, every investment begins with trust and ends with lasting value.&rdquo;
                </blockquote>
                <Link
                  href="/consultations"
                  className="bg-primary text-background-dark text-xs font-extrabold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-primary/90 transition-all shrink-0"
                >
                  Connect With CEO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* OUR PURPOSE MATRIX (VISION, MISSION, CORE PURPOSE, PROMISE) */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 border-y border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Company Framework
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Our Strategic <span className="font-black text-primary">Purpose</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              The foundational pillars guiding every investment recommendation and institutional decision at WEPHCO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                01
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Vision</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                To become Africa&apos;s leading gateway to global real estate investment by empowering individuals and businesses with trusted investment opportunities that create sustainable wealth.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                02
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Mission</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                To bridge the gap between investors and premium real estate opportunities through transparency, innovation, and professional advisory services.
              </p>
            </div>

            {/* Core Purpose */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                03
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Core Purpose</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Helping people build generational wealth through strategic, verified property investments across domestic and international markets.
              </p>
            </div>

            {/* Promise */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                04
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Promise</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Every investment recommendation is guided by integrity, due diligence, and our unwavering commitment to our clients&apos; long-term financial success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* OUR CORE VALUES */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-background-dark">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Guiding Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Our Core <span className="font-black text-primary">Values</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              &ldquo;Trust is earned through consistency, transparency, and results. At Wephco, these values guide every investment journey.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Integrity</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Uncompromising honesty and ethical foundation in every deal, contract verification, and advisory recommendation.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Partnership</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Building collaborative, long-term relationships with clients, developers, legal partners, and global investors.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Transparency</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Clear, open, and verifiable processes at every stage—from property title verification to financial reporting.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Client-Centricity</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Putting the client&apos;s financial goals, peace of mind, and generational security at the heart of everything we do.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Excellence</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Setting global standards in luxury property brokerage, portfolio structuring, and white-glove client care.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-slate-900/40 p-8 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Innovation</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Harnessing digital proptech, mobile apps, and modern investment models to simplify global property ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* WHAT WE DO & WHY CLIENTS TRUST US */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: What We Do */}
            <div className="space-y-8">
              <div>
                <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                  Integrated Capabilities
                </span>
                <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                  What We <span className="font-black text-primary">Do</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-primary/20 space-y-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Real Estate Brokerage</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Connecting investors with verified residential, commercial, and luxury properties locally &amp; globally.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-primary/20 space-y-2">
                  <UserCheck className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Professional Consultation</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Personalized advisory sessions evaluating market dynamics, risk management, and financial goals.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-primary/20 space-y-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Investment Advisory</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Strategic guidance grounded in market research, trends, and wealth creation strategies.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-primary/20 space-y-2">
                  <Layers className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Portfolio Planning</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Assisting clients in building diversified property portfolios balancing growth and rental yields.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-primary/20 space-y-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Property Verification</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Rigorous due diligence confirming ownership, title authenticity, and legal compliance.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-primary/20 space-y-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Property Management</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Ensuring residential &amp; commercial assets are maintained, protected, and yield-optimized.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Why Clients Trust Us Image Card from PDF Page 9 */}
            <div className="space-y-6">
              <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <Image
                  src="/images/pdf-about/why_investors_consultation.png"
                  alt="WEPHCO Executive Client Consultation"
                  fill
                  objectFit='cover'
                  className='scale-x-125'
                />
              </div>
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-primary/30 space-y-2">
                <blockquote className="text-sm md:text-base font-bold text-white italic">
                  &ldquo;We don&apos;t simply help you buy property, we help you build lasting wealth through strategic real estate investments.&rdquo;
                </blockquote>
                <p className="text-xs text-primary font-bold uppercase tracking-wider">
                  — WEPHCO Investment Advisory Philosophy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* AFRICA'S NEXT INVESTMENT FRONTIER & GLOBAL MARKET ACCESS */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-background-dark border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase block">
                The Growth Story
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                Africa&apos;s Next <br />
                <span className="font-black text-primary">Investment Frontier</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                For decades, global investors have looked to mature markets for stability. Today, the world&apos;s attention is shifting toward Africa, a continent experiencing rapid urban expansion, youthful demographics, and unprecedented economic transformation.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  { title: 'Rapid Urbanization', desc: 'Millions moving into cities every year, fueling housing & commercial demand.' },
                  { title: 'Young & Expanding Population', desc: 'Building the world’s youngest workforce and consumer ecosystem.' },
                  { title: 'Infrastructure Driving Growth', desc: 'Smart cities, rail, airports, and tech hubs boosting surrounding property values.' },
                  { title: 'Increasing Foreign Investment', desc: 'Global institutional partners expanding footprint across real estate sectors.' },
                  { title: 'The Diaspora Opportunity', desc: 'Africans abroad investing home to build income-generating, long-term assets.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-primary/10">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Globe & High Speed Train PDF Image (Page 11) */}
            <div className="space-y-8">
              <div className="relative w-full aspect-4/5 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <Image
                  src="/images/pdf-about/africa_frontier_globe.png"
                  alt="Africa Investment Frontier - Global Capital Meets Opportunity"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* PROPRIETARY INVESTMENT ECOSYSTEM */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Proprietary Programs
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Our Investment <span className="font-black text-primary">Ecosystem</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Three structured investment programs designed for transparency, milestone control, and sustainable wealth creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 space-y-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-primary bg-primary/15 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Program 01
                </span>
                <h3 className="text-xl font-bold text-white">Homecoming Investor Package</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Designed for Africans in the diaspora. Transforms remote home construction into a structured, transparent, professionally managed experience from foundation to handover.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Milestone-based fund release</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Dedicated Relationship Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Digital progress monitoring &amp; verification</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Program 2 */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 space-y-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-primary bg-primary/15 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Program 02
                </span>
                <h3 className="text-xl font-bold text-white">Global Investment Cycle</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  A structured international investment framework connecting clients with high-growth global real estate opportunities in Abu Dhabi, London, and beyond.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Premium international properties</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Flexible investment structures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Residency support &amp; portfolio growth</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Program 3 */}
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-primary/20 space-y-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-primary bg-primary/15 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Program 03
                </span>
                <h3 className="text-xl font-bold text-white">Investment Access Cycle</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Gives qualified investors early access to vetted off-market listings before public release, backed by independent market research and full legal audit.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Early-bird off-market access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Independent market research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Full legal title verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* PROPTECH & WIMOA MAGAZINE INNOVATION WITH EXTRACTED PDF IMAGES */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-background-dark border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* The Wephco Brokerage App */}
            <div className="bg-slate-900/60 p-8 md:p-10 rounded-3xl border border-primary/20 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                    PropTech Innovation
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">The WEPHCO Brokerage App</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Our digital investment platform designed to simplify how investors discover, evaluate, and manage real estate opportunities worldwide. Browse verified listings, access virtual property tours, and track your investment journey with ease.
                </p>
              </div>

              <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden border border-primary/30 shadow-xl mt-4">
                <Image
                  src="/images/pdf-about/wephco_app_mockup.png"
                  alt="WEPHCO Brokerage Mobile App Showcase"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* WIMOA Magazine */}
            <div className="bg-slate-900/60 p-8 md:p-10 rounded-3xl border border-primary/20 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                    Media &amp; Market Intelligence
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">WIMOA Magazine</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Published by WEPHCO, WIMOA Magazine delivers valuable insights into the ever-evolving world of real estate, investment strategies, African growth frontiers, and wealth creation.
                </p>
              </div>

              <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden border border-primary/30 shadow-xl mt-4">
                <Image
                  src="/images/pdf-about/wimoa_magazine_showcase.png"
                  alt="WIMOA Magazine Cover featuring Keleb Nwubani"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* MEET THE LEADERSHIP TEAM WITH PDF EXTRACTED PORTRAITS */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Leadership &amp; Advisory
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Meet The <span className="font-black text-primary">Team</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Behind every successful investment is a team of dedicated professionals committed to delivering expertise, transparency, and exceptional client service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 rounded-3xl h-125 overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                {/* Team Member Photo Extracted from PDF Page 8 */}
                <div className="relative h-96 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    objectFit='cover'
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">{member.role}</p>
                  <p className="text-xs text-slate-300 font-light leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURED PROJECTS PORTFOLIO WITH PDF EXTRACTED IMAGES */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-background-dark border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">
              Proven Track Record
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Projects We Have <span className="font-black text-primary">Worked On</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Featured international developments across prime global investment destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 rounded-3xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Project Render Extracted from PDF Pages 17-20 */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-background-dark/90 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30 text-[11px] font-bold text-primary">
                    {project.location}
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-3">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    {project.type}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* CALL FOR PARTNERS & HEAD OFFICE CONTACT */}
      {/* ------------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 border-t border-primary/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Call for Partners */}
            <div className="space-y-6">
              <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase block">
                Strategic Collaboration
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                Call For <span className="font-black text-primary">Partners</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                At WEPHCO, we are building a connected investment ecosystem that brings together investors, real estate developers, Realtors, affiliate marketers, banks, law firms, and PropTech innovators.
              </p>
              
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-primary/30 shadow-xl my-4">
                <Image
                  src="/images/pdf-about/call_for_partners_handshake.png"
                  alt="WEPHCO Partnership Ecosystem Handshake"
                  fill
                  style={{ objectFit: 'cover' }}
                  className='scale-105'
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Real Estate Developers
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Property Realtors &amp; Agencies
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Banks &amp; Mortgage Lenders
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Law Firms &amp; Escrow Services
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> Affiliate Marketers
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> PropTech Companies
                </span>
              </div>
              
              <div className="pt-4">
                <Link
                  href="/affiliates"
                  className="bg-primary text-background-dark font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider hover:bg-primary/95 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Head Office Location Info */}
            <div className="bg-slate-900/80 p-8 md:p-10 rounded-3xl border border-primary/30 space-y-6">
              <h3 className="text-xl font-bold text-white">WEPHCO Head Office</h3>
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Address</p>
                    <p className="text-slate-400 mt-0.5">
                      Suite 1030, Los Angeles Mall, Ahmadu Bello Way, Kado, Abuja, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Telephone Inquiries</p>
                    <a href="tel:+2349161246300" className="text-primary hover:underline block mt-0.5">
                      +234 916 124 6300
                    </a>
                    <a href="tel:+2347013789744" className="text-primary hover:underline block">
                      +234 701 378 9744
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Secure Email</p>
                    <a href="mailto:contact@wephco.com" className="text-primary hover:underline block mt-0.5">
                      contact@wephco.com
                    </a>
                  </div>
                </div>
              </div>
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
            Begin Your Journey to <br />
            <span className="font-extrabold text-primary">Generational Wealth</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Whether acquiring your first luxury property or expanding an international portfolio, our advisory team is ready to guide you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consultations"
              className="bg-primary text-background-dark px-10 py-4.5 rounded-xl font-extrabold text-sm uppercase tracking-wider hover:bg-primary/95 transition-all hover:scale-105 shadow-2xl shadow-primary/30"
            >
              Book Advisory Session
            </Link>
            <Link
              href="/properties"
              className="border border-primary/40 text-white px-10 py-4.5 rounded-xl font-extrabold text-sm uppercase tracking-wider hover:bg-white/5 transition-all"
            >
              View Property Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
