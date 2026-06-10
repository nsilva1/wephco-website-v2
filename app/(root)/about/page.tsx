'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BiShieldQuarter, 
  BiCheckDouble, 
  BiStar, 
  BiTargetLock, 
  BiTrendingUp, 
  BiLandscape 
} from 'react-icons/bi';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-20">
      
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background-dark/95 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center scale-103 brightness-[0.7]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9XUxl8rW70qgs1CxkB4XT3TOYwJMK7mJJYSdBZxzqqoczpRBFCgiiPfBCvm-UEsZiNLerP_uk-D33GVBJaysIDSAZDHHg62E58Y3Js6MITBuMNp8HtuYDv_NhjwgvIUgOifMYuxrvUnsaQHFO56MYYcQpwxB7jftgeCuc74eQHGb3FB4xw-Uc3TCAi8ujdvk0Q39fHfzmKwgVdQKFL4pH8YZwdLm_zoFk3WxwR_H-5lHPa4JddRMWbDeECAn8HerEiTFuKgBYfjTI"
            alt="Modern architectural luxury mansion exterior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="relative z-20 max-w-4xl px-6 text-center space-y-6">
          <span className="inline-block text-primary font-bold tracking-widest uppercase text-xs px-5 py-2 rounded-full border border-primary/30 bg-primary/10">
            About Wephco
          </span>
          <h1 className="text-4xl md:text-7xl font-light text-white leading-tight">
            Redefining <span className="text-primary font-extrabold italic">Luxury</span> Living
          </h1>
          <p className="text-base md:text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the pinnacle of architectural excellence and sophisticated lifestyle with Wephco, where your vision of home becomes a masterpiece.
          </p>
        </div>
      </section>

      {/* Our Story / Values */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-3">Our Heritage</span>
              <h3 className="text-3xl md:text-4xl font-light mb-6">
                A Legacy of <span className="font-extrabold text-primary">Curated Excellence</span>
              </h3>
              <p className="text-slate-400 leading-loose font-light text-sm">
                Founded on the principles of trust, excellence, and innovation, Wephco has been at the forefront of the luxury real estate market. We don&apos;t just sell properties; we curate lifestyles for the world&apos;s most discerning clients. Our journey began with a single vision: to transform the acquisition of high-end real estate into an art form.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {/* Trust */}
              <div className="p-6 rounded-xl border border-primary/10 bg-[#022618]/10">
                <BiShieldQuarter className="text-primary mb-3 text-2xl" />
                <h4 className="font-bold text-sm text-slate-100 mb-1">Trust</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed">Unyielding integrity in every deal.</p>
              </div>
              
              {/* Excellence */}
              <div className="p-6 rounded-xl border border-primary/10 bg-[#022618]/10">
                <BiCheckDouble className="text-primary mb-3 text-2xl" />
                <h4 className="font-bold text-sm text-slate-100 mb-1">Excellence</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed">Setting the global standard.</p>
              </div>
              
              {/* Innovation */}
              <div className="p-6 rounded-xl border border-primary/10 bg-[#022618]/10">
                <BiTargetLock className="text-primary mb-3 text-2xl" />
                <h4 className="font-bold text-sm text-slate-100 mb-1">Innovation</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed">Pioneering modern real estate.</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center w-full">
            <div className="w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative border border-primary/20">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeXue5B843DVVBPkpBCjiwRTvW7kwnPciaNPjFlNNUEqLoSBT9pUXNUwI1uumJcTy3b7_ncqPcj9LhArU-AKSPJceB8cYPE9x_wqWTwwA5SqlPq6goJFXkpw6nydKTVQ9roSk1BDQtDKy1ADRqW1_QAvSX82HKhZWwW2ZGDWJNH3A_oaAA5r5im07BU_KovZOmB0bMZSyTf4QrvcUGqimZwKOwMSj7Ez73cFkFOjfmnKdGcss-Pty5761WTL9xIz3nq_Ij9ON_QFzv"
                alt="Luxury penthouse interior"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block w-48 h-48 border-4 border-primary rounded-2xl -z-10 opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/10 py-16 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
          <div>
            <div className="text-4xl font-black text-primary mb-2">15+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-black text-primary mb-2">$2B+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total Sales</div>
          </div>
          <div>
            <div className="text-4xl font-black text-primary mb-2">500+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Luxury Listings</div>
          </div>
          <div>
            <div className="text-4xl font-black text-primary mb-2">24</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Global Awards</div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-3">The Visionaries</span>
          <h3 className="text-4xl font-light text-slate-100">
            The Leadership <span className="font-extrabold text-primary">Team</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Team Member 1 */}
          <div className="group text-center lg:text-left">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 relative border border-primary/10">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL-3Q_gZYV89Rf4vl4cd9jEzycNcyebI_rgAVFQt5CU-pkOv764KNYxLAW61e2Bni9P3rktvBKywMJ6WgXO8VUgnHg-mRyyn8mlYRzaLeMlWtQVI9AIhN9PqNepnzWzILLuL4tThmBlAD4mhBzLaNvUyIBdfCpY1YcNji0VFyR_TKnPwb-FPHLJntadQFnD2Dy6yoI_Kd-VfF-vsD1lQkBPH3xBYyAJHS4NjpXUR_Ci0x1ni2YLiolx_ERGZn-cuwOK6V2AadcW1Cc"
                alt="Julian Sterling"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="text-lg font-bold">Julian Sterling</h4>
            <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1">Chief Executive Officer</p>
          </div>

          {/* Team Member 2 */}
          <div className="group text-center lg:text-left">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 relative border border-primary/10">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMLFoaTDQEs5kv9GDoZv0jzmPvFDiUP-uqyZnGatGyTC3fD2KnZQxURf_0YzZphgw9jaua7wJhvqCjTelfjJY7DEbHiXKgFK7WJeEJBVSz1R8pQU9V59BL1RlH0fy0IzahNOOUAjRhmXY4MrBjX1ZFxvnB0S4yj4-nfvS3EK6cp9yS-Qjf2P9x1j3mQUWYqK5FTQqtMLPyh-3OaUk6IFjx5HgC-mgvhjlaYr9AjuXK1k-KG9oxBwOmxYb41Z1I75lRMdjGekinVG0i"
                alt="Sophia Williams"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="text-lg font-bold">Sophia Williams</h4>
            <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1">Head of Interior Design</p>
          </div>

          {/* Team Member 3 */}
          <div className="group text-center lg:text-left">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 relative border border-primary/10">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDg48-Pas20qy0DAYrFNXhQKLZB9WMlrVeA-skXBa9bfPw09zOiwQEukSi19rcyynoPw8pcnzRZrISUWy8PcaXGgTADcw4zLls19BKA5YbdPJn1I5bAspf51IDcDZwb4XMRmpqK2_ldNAKFPxM6U7DWmpZW8mmX9wnGzxAYyBSp33tS-g_hR-qLB8XLQ7ku8J4y54VTNWqg8I6ZLCngknio0KUgkW6TIFIj9IZPif8HBWuRp_FwYNukq8XrnRpE_7x5a9WRUYflQ3v"
                alt="Marcus Chen"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="text-lg font-bold">Marcus Chen</h4>
            <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1">Director of Acquisitions</p>
          </div>

          {/* Team Member 4 */}
          <div className="group text-center lg:text-left">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 relative border border-primary/10">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI0B1aR5fH4nsyK719r6Islpf1P-ADkrTl8tB9EeLbTbPY8OscHS4YDLiLKPPOcxfAm90AqzDPkaCUefNpYDydt33vHXE7k6OUAPt9TMs1pDna3ViHx5gIJGzUeiCBuKVLlnDlbs2ND-LpL226iFBeHzYA5Rr5eu-XwcK3_8Szh9jyJHnc40E5ketxPAqo5HVv9cMAzvtkSXKn03yTNK3mv4FBjgb1raLz76iHg_vA8iq7UKO9Ph3UinhchwMxvjA5Tjhoe6vm8YfE"
                alt="Elena Rodriguez"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="text-lg font-bold">Elena Rodriguez</h4>
            <p className="text-primary font-bold text-xs uppercase tracking-wider mt-1">Global Sales Director</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-primary/10">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative p-12 text-center bg-neutral-dark/10 border border-primary/25">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-light">Begin Your Journey <span className="font-extrabold text-primary">Home</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed font-light">
              Ready to find your next architectural masterpiece? Our elite agents are standing by to guide you through a bespoke real estate experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="bg-primary text-background-dark px-10 py-4 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary/95 transition-all cursor-pointer"
              >
                Work With Us
              </Link>
              <Link
                href="/properties"
                className="border border-primary text-primary px-10 py-4 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-background-dark transition-all cursor-pointer"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
