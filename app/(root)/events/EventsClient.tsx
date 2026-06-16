'use client';

import React, { useState } from 'react';
import { Sparkles, Shield, Compass } from 'lucide-react';
import { EventCard, EventItem } from './_components/EventCard';
import { PrivateRSVPModal } from './_components/PrivateRSVPModal';

interface EventsClientProps {
  events: EventItem[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'virtual' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenRsvp = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const filteredEvents = events.filter((evt) => {
    if (activeTab === 'upcoming') return !evt.isPast && evt.format === 'Physical';
    if (activeTab === 'virtual') return !evt.isPast && evt.format === 'Virtual';
    if (activeTab === 'past') return evt.isPast;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans pt-20">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest animate-pulse">
          <Sparkles className="size-3.5" /> Curating Elite Experiences
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-100 tracking-tight leading-none">
          Wephco <span className="bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent italic">Events</span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Access private launch exhibitions, secure offshore real estate seminars, and virtual immersive walkthroughs configured for high-society portfolio builders.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center pt-8">
          <div className="inline-flex p-1 bg-slate-900/80 border border-primary/15 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-background-dark shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Upcoming Shows
            </button>
            <button
              onClick={() => setActiveTab('virtual')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'virtual'
                  ? 'bg-primary text-background-dark shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Virtual Roadshows
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'past'
                  ? 'bg-primary text-background-dark shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Past Exhibitions
            </button>
          </div>
        </div>
      </section>

      {/* Events Display Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onApply={handleOpenRsvp} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 border border-primary/5 rounded-2xl max-w-xl mx-auto">
            <Compass className="size-12 text-primary/40 mx-auto mb-4 animate-spin" style={{ animationDuration: '8s' }} />
            <h3 className="text-lg font-bold text-slate-200">No Events Scheduled</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
              We are currently curating new exclusive showcases.
            </p>
          </div>
        )}
      </section>

      {/* Elite Guarantee Panel */}
      <section className="relative z-10 bg-slate-950 border-t border-primary/10 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Shield className="size-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Private VIP Concierge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every Wephco event is organized under absolute security protocols. High-profile attendees can arrange airport transfers, discrete transport, and personalized accommodation with our dedicated concierge desk.
            </p>
          </div>
          <div className="p-6 bg-slate-900/40 border border-primary/10 rounded-2xl flex flex-col gap-4 text-center md:text-left">
            <h4 className="text-sm font-bold text-primary tracking-widest uppercase">Immediate Desk Support</h4>
            <p className="text-[11px] text-slate-400">Our real estate concierge is available to handle priority invitation decisions.</p>
            <a 
              href="tel:+2349161246300"
              className="text-white hover:text-primary text-xl font-black transition-colors"
            >
              +234 (0) 916-124-6300
            </a>
          </div>
        </div>
      </section>

      {/* VIP RSVP Intake Form Modal */}
      <PrivateRSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        event={selectedEvent} 
      />

    </div>
  );
}
