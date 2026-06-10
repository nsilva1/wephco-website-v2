import React from 'react'
import { partners } from '@/lib/constants'
import Image from 'next/image'

const Partners = () => {
  
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="py-16 border-t border-primary/10 overflow-hidden bg-background-dark font-display z-10">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
          Collaborations
        </span>
        <h3 className="text-2xl font-light text-slate-100 uppercase tracking-widest">
          Our Trusted <span className="font-extrabold text-primary">Partners</span>
        </h3>
      </div>
      
      <div className="marquee-container relative w-full overflow-hidden whitespace-nowrap py-4">
        <div className="flex w-max animate-scroll">
          <div className="flex items-center gap-16 md:gap-24 px-8">
            {duplicatedPartners.map((partner, index) => (
              <div key={index} className="flex items-center gap-3 shrink-0">
                <div className="w-24 relative flex items-center justify-center">
                  <Image 
                    src={partner.image} 
                    alt={partner.title} 
                    width={96} 
                    height={36} 
                    className="filter invert object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Partners }