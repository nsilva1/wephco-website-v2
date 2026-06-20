import React from 'react';
import Image from 'next/image';

const VisionAndMission = () => {
  return (
    <section className="py-24 px-6 bg-background-dark font-display z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Column 1: Content & Stats */}
        <div className="order-2 md:order-1 flex flex-col gap-6">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
              Our Purpose
            </span>
            <h3 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              Crafting the Future of <span className="font-extrabold italic text-primary">Legacy Living</span>
            </h3>
            <div className="h-1 w-20 bg-primary mt-6"></div>
          </div>
          
          <div className="space-y-6 text-slate-300 font-light leading-relaxed text-sm md:text-base">
            <p>
              At Wephco, our vision transcends mere property transactions. We see ourselves as curators of architectural history, connecting discerning individuals with living spaces that are true works of art.
            </p>
            <p>
              Our mission is to provide an unparalleled bespoke service that honors the craftsmanship of the world's finest architects while ensuring our clients' investments stand the test of time.
            </p>
          </div>

          <div className="mt-8 flex gap-12 border-t border-primary/10 pt-8">
            <div>
              <p className="text-primary text-3xl font-bold mb-1">$35M+</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Total Sales</p>
            </div>
            <div>
              <p className="text-primary text-3xl font-bold mb-1">5+</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Years Excellence</p>
            </div>
          </div>
        </div>

        {/* Column 2: Grayscale Offset Image */}
        <div className="order-1 md:order-2 relative w-full h-[320px] md:h-[500px]">
          <div className="absolute -top-4 -right-4 w-full h-full border border-primary/20 rounded-xl z-0"></div>
          <div className="relative w-full h-full z-10 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
              alt="Sophisticated Interior"
              fill
              style={{ objectFit: 'cover' }}
              className="grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { VisionAndMission };
