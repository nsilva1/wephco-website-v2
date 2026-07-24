import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUsSection = () => {
  return (
    <section className="py-24 px-6 bg-background-dark font-display z-10 border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Column 1: Content - 7 cols on large screens */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
              About Wephco
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              Bridging Ambition with <span className="font-extrabold italic text-primary">Generational Legacy</span>
            </h2>
            <div className="h-1 w-20 bg-primary mt-6"></div>
          </div>
          
          <div className="space-y-6 text-slate-300 font-light leading-relaxed text-sm md:text-base">
            <p>
              Founded with a clear vision to connect discerning clients with the world's most prestigious property markets, Wephco has grown to become a trusted global authority in luxury real estate. Headquartered in Nigeria, we provide tailored, exclusive access to rare assets across the UAE, UK, Monaco, USA, Turkey, and Australia.
            </p>
            <p>
              Our reputation is built on discretion, trust, and wealth preservation. With over $35 Million in transactions, we do not just broker properties; we act as advisors of legacy, helping families and investors build intergenerational security through strategic international acquisitions.
            </p>
          </div>

          <div className="mt-4">
            <Link 
              href="/about"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-background-dark font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer text-sm tracking-wider uppercase"
            >
              Discover Our Story
            </Link>
          </div>
        </div>

        {/* Column 2: Premium Visual Showcase - 5 cols on large screens */}
        <div className="lg:col-span-5 relative w-full h-87.5 md:h-112.5">
          <div className="absolute -bottom-4 -left-4 w-full h-full border border-primary/20 rounded-xl z-0"></div>
          <div className="relative w-full h-full z-10 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Estate Living"
              fill
              style={{ objectFit: 'cover' }}
              className="hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export { AboutUsSection };
