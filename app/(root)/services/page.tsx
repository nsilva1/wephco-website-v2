import React from 'react';
import { Hero } from './(components)/Hero';
import { wephcoServices } from '@/lib/constants';

const ServiceSection = ({ title, services }: { title: string, services: { title: string, description: string }[] }) => (
  <div className="my-16">
    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center uppercase text-wephco">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div key={index} className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-white/40 flex flex-col gap-4">
          <div className="w-12 h-1 bg-wephco rounded-full mb-2"></div>
          <h3 className="text-xl font-semibold text-black">{service.title}</h3>
          <p className="font-light text-black/80 leading-relaxed flex-grow">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ServicesPage = () => {
  return (
    <div>
      <Hero />
      <div className="bg-[#eee3d1] px-6 py-16 md:p-20 font-outfit">
        <div className="max-w-7xl mx-auto">
          {/* Intro Section */}
          <div className="text-center max-w-4xl mx-auto mb-20 bg-white/40 p-10 rounded-3xl backdrop-blur-sm border border-white/50 shadow-sm">
            <h2 className="text-wephco uppercase text-sm font-semibold mb-4 tracking-widest">Welcome to Wephco</h2>
            <p className="text-lg md:text-2xl font-light text-black leading-relaxed">
              {wephcoServices.intro}
            </p>
          </div>

          {/* International Services */}
          <ServiceSection title="International Services" services={wephcoServices.international} />

          {/* Local Services */}
          <ServiceSection title="Local Services" services={wephcoServices.local} />

          {/* Consultation Services */}
          <ServiceSection title="Consultation Services" services={wephcoServices.consultation} />

          {/* Outro Section */}
          <div className="text-center max-w-4xl mx-auto mt-20 p-10 md:p-14 bg-wephco text-wephco-foreground rounded-3xl shadow-xl">
            <h2 className="uppercase text-sm font-semibold mb-6 tracking-widest text-wephco-foreground/80">Our Commitment</h2>
            <p className="text-lg md:text-2xl font-light leading-relaxed">
              {wephcoServices.outro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

