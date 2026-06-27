'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { MOCK_EVENTS } from '../../data';

export default function EventGalleryPage() {
  const params = useParams();
  const id = params.id as string;
  const event = MOCK_EVENTS.find((e) => e.id === id);

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null || !event?.galleryImages) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col items-center justify-center gap-4 pt-24">
        <h2 className="text-3xl font-bold">Event Not Found</h2>
        <Link
          href="/events"
          className="px-6 py-2.5 bg-primary text-background-dark font-bold rounded-lg transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }

  const images = event.galleryImages || [];

  if (!event.hasGallery || images.length === 0) {
    return (
      <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col items-center justify-center gap-4 pt-24 px-6 text-center">
        <ImageIcon className="size-16 text-primary/40 animate-pulse mb-2" />
        <h2 className="text-2xl font-bold">No Gallery Available</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          A photo gallery has not been published for the event &quot;
          {event.title}&quot;.
        </p>
        <Link
          href={`/events/${id}`}
          className="px-6 py-2.5 bg-primary text-background-dark font-bold rounded-lg transition-colors mt-2 text-xs uppercase tracking-wider">
          Back to Event Details
        </Link>
      </div>
    );
  }

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans pt-20 selection:bg-primary selection:text-background-dark">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[140px] pointer-events-none z-0" />

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10 space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/events/${id}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-wider group">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />{' '}
            Back to Event Details
          </Link>
        </div>

        {/* Gallery Title Header */}
        <div className="pb-6 border-b border-primary/10 space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Event Archive
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Gallery
          </h1>
          <p className="text-sm text-slate-400 font-light max-w-xl">
            Photo archive highlighting client engagements, property
            walkthroughs, and key moments from &quot;{event.title}&quot;.
          </p>
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setActivePhotoIndex(index)}
              className="break-inside-avoid relative overflow-hidden rounded-xl border border-primary/10 group cursor-pointer shadow-lg hover:border-primary/40 transition-all duration-300 bg-slate-900/40">
              <img
                src={src}
                alt={`${event.title} Gallery Photo ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Overlay hover indicator */}
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </main>

      {/* Centered Lightbox Modal Slider */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Dark Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md cursor-pointer transition-opacity"
            onClick={() => setActivePhotoIndex(null)}
          />

          {/* Lightbox Shell */}
          <div className="relative max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center z-10 space-y-4">
            {/* Upper controls info bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between text-slate-400 text-xs px-2 z-20 bg-linear-to-b from-slate-950/50 to-transparent py-4">
              <span>
                Photo {activePhotoIndex + 1} of {images.length}
              </span>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10">
                <X className="size-6" />
              </button>
            </div>

            {/* Centered image view */}
            <div className="relative w-full h-full flex items-center justify-center px-10">
              <img
                src={images[activePhotoIndex]}
                alt={`Photo ${activePhotoIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg border border-white/5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              />
            </div>

            {/* Left Chevron Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-primary/50 text-slate-300 hover:text-primary transition-all p-3 rounded-full shadow-lg shadow-black/50 z-20 cursor-pointer">
              <ChevronLeft className="size-6 md:size-8" />
            </button>

            {/* Right Chevron Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-primary/50 text-slate-300 hover:text-primary transition-all p-3 rounded-full shadow-lg shadow-black/50 z-20 cursor-pointer">
              <ChevronRight className="size-6 md:size-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
