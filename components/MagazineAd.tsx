import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import magazineAd from '@/images/wephco_magazine.jpeg'

const MagazineAd = () => {
  return (
    <section className="py-20 px-6 bg-background-dark font-display relative overflow-hidden border-t border-primary/5">
      {/* Decorative blurred glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 glass-effect rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Copy */}
        <div className="flex-1 flex flex-col gap-6 text-left">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
              Exclusive Publication
            </span>
            <h3 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Wephco <span className="font-extrabold italic text-primary">WIMOA Magazine</span>
            </h3>
            <div className="h-1 w-16 bg-primary mt-4"></div>
          </div>

          <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
            Immerse yourself in the world of premier architectural artistry, global luxury lifestyles, and generational wealth preservation strategies. Our curated publication is tailored for the ultra-high-net-worth individual. Available in both digital editions and premium physical print.
          </p>

          <div>
            <Link
              href="/magazine"
              className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-background-dark font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer text-sm tracking-wider uppercase"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Right: Magazine Cover Preview */}
        <div className="w-full lg:w-100 shrink-0 relative aspect-3/4 rounded-xl overflow-hidden shadow-2xl group border border-primary/20">
          <Image
            src={magazineAd}
            alt="Wephco Magazine Cover"
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-all duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export { MagazineAd };
