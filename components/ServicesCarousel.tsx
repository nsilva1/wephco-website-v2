'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { wephcoServices } from '@/lib/constants';
import {
  BiGlobe,
  BiCheckDouble,
  BiTrendingUp,
  BiUserVoice,
  BiStar,
  BiBuildings,
  BiChevronLeft,
  BiChevronRight
} from 'react-icons/bi';
import {
  ShieldCheck,
  Compass,
  Key,
  Palette,
  Users,
  Landmark,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export type ServiceCategory = 'all' | 'international' | 'local' | 'consultation';

interface ServiceItem {
  id: string;
  category: 'international' | 'local' | 'consultation';
  categoryLabel: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ServicesCarousel() {
  // Aggregate all services with their category metadata and specialized icons
  const allServices: ServiceItem[] = useMemo(() => {
    const internationalItems: ServiceItem[] = (wephcoServices.international || []).map(
      (item, idx) => ({
        id: `intl-${idx}`,
        category: 'international',
        categoryLabel: 'International',
        tag: 'Global Coverage',
        title: item.title,
        description: item.description,
        icon: idx === 0 ? <BiGlobe className="text-2xl" /> : <BiCheckDouble className="text-2xl" />,
      })
    );

    const localIcons = [
      <BiBuildings key="0" className="text-2xl" />,
      <Landmark key="1" className="w-6 h-6" />,
      <Compass key="2" className="w-6 h-6" />,
      <Key key="3" className="w-6 h-6" />,
      <Palette key="4" className="w-6 h-6" />,
      <ShieldCheck key="5" className="w-6 h-6" />,
    ];

    const localItems: ServiceItem[] = (wephcoServices.local || []).map((item, idx) => ({
      id: `local-${idx}`,
      category: 'local',
      categoryLabel: 'Local Services',
      tag: 'Domestic Execution',
      title: item.title,
      description: item.description,
      icon: localIcons[idx % localIcons.length],
    }));

    const consultationIcons = [
      <BiTrendingUp key="0" className="text-2xl" />,
      <BiUserVoice key="1" className="text-2xl" />,
      <Users key="2" className="w-6 h-6" />,
      <BiStar key="3" className="text-2xl" />,
      <BiTrendingUp key="4" className="text-2xl" />,
    ];

    const consultationItems: ServiceItem[] = (wephcoServices.consultation || []).map(
      (item, idx) => ({
        id: `consult-${idx}`,
        category: 'consultation',
        categoryLabel: 'Consultation & Advisory',
        tag: 'Bespoke Guidance',
        title: item.title,
        description: item.description,
        icon: consultationIcons[idx % consultationIcons.length],
      })
    );

    return [...internationalItems, ...localItems, ...consultationItems];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_INTERVAL = 3800; // 3.8 seconds

  // Filter items based on selected category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return allServices;
    return allServices.filter((s) => s.category === selectedCategory);
  }, [allServices, selectedCategory]);

  // Handle responsive visible card count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, filteredServices.length - visibleCount);

  // Clamp current index when filter or responsive size changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, visibleCount]);

  // Navigate next
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Navigate prev
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay timer effect
  useEffect(() => {
    if (viewMode !== 'carousel') return;
    if (!isPlaying || isHovered || maxIndex <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, maxIndex, handleNext, viewMode]);

  // Touch swipe support
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const categories: { key: ServiceCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Services', count: allServices.length },
    {
      key: 'international',
      label: 'International',
      count: allServices.filter((s) => s.category === 'international').length,
    },
    {
      key: 'local',
      label: 'Local Services',
      count: allServices.filter((s) => s.category === 'local').length,
    },
    {
      key: 'consultation',
      label: 'Consultation & Advisory',
      count: allServices.filter((s) => s.category === 'consultation').length,
    },
  ];

  return (
    <div className="w-full">
      {/* Section Header Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 pb-6 border-b border-primary/10">
        <div>
          <h2 className="text-slate-100 text-3xl md:text-4xl font-light">
            Comprehensive <span className="font-extrabold text-primary">Services</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl font-light">
            End-to-end luxury brokerage, cross-border structuring, and private wealth advisory.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all uppercase flex items-center gap-2 border ${
              selectedCategory === cat.key
                ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/20 scale-102'
                : 'bg-neutral-dark/20 text-slate-400 border-primary/10 hover:border-primary/30 hover:text-slate-200'
            }`}>
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategory === cat.key
                  ? 'bg-background-dark/30 text-background-dark'
                  : 'bg-primary/10 text-primary'
              }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* CAROUSEL VIEW */}
      {viewMode === 'carousel' ? (
        <div
          className="relative group select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}>
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-4 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-2xl opacity-40 pointer-events-none -z-10" />

          {/* Carousel Track Wrapper */}
          <div className="overflow-hidden rounded-2xl py-2">
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}>
              {filteredServices.map((service, idx) => (
                <div
                  key={service.id}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / visibleCount}%` }}>
                  <div className="h-full bg-neutral-dark/25 hover:bg-neutral-dark/40 border border-primary/15 hover:border-primary/40 rounded-2xl p-7 md:p-8 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/20 hover:shadow-primary/5 hover:-translate-y-1 group/card">
                    {/* Card Top */}
                    <div>
                      <div className="flex items-start gap-4 mb-5">
                        <div className="bg-primary/15 text-primary p-3 rounded-xl shrink-0 group-hover/card:bg-primary group-hover/card:text-background-dark transition-all duration-300 shadow-md">
                          {service.icon}
                        </div>
                        <h3 className="text-slate-100 text-lg md:text-xl font-bold leading-snug group-hover/card:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        {service.categoryLabel}
                      </span>
                      <Link
                        href="/consultations"
                        className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group-hover/card:translate-x-1 duration-200">
                        <span>Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autoplay Progress Line */}
          {isPlaying && !isHovered && maxIndex > 0 && (
            <div className="w-full bg-primary/10 h-1 rounded-full overflow-hidden mt-6">
              <div
                key={currentIndex}
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: '100%',
                  animation: `progressTimer ${AUTOPLAY_INTERVAL}ms linear`,
                }}
              />
            </div>
          )}

          {/* Controls Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2">
            {/* Dots Pagination */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-primary shadow-md shadow-primary/30'
                      : 'w-2 bg-primary/20 hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>

            {/* Counter and Prev/Next Navigation */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400 font-mono">
                <span className="text-primary font-bold">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                {' / '}
                {String(maxIndex + 1).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous services"
                  className="size-10 rounded-xl bg-neutral-dark/40 hover:bg-primary hover:text-background-dark border border-primary/20 text-slate-200 flex items-center justify-center transition-all duration-200 shadow-md">
                  <BiChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next services"
                  className="size-10 rounded-xl bg-neutral-dark/40 hover:bg-primary hover:text-background-dark border border-primary/20 text-slate-200 flex items-center justify-center transition-all duration-200 shadow-md">
                  <BiChevronRight className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW (Alternative full display) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className="bg-neutral-dark/25 hover:bg-neutral-dark/40 border border-primary/15 hover:border-primary/40 rounded-2xl p-7 backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-primary text-[10px] font-bold tracking-widest uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                  <span className="text-slate-500 font-mono text-xs font-semibold">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/15 text-primary p-3 rounded-xl shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-slate-100 text-lg font-bold leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  {service.categoryLabel}
                </span>
                <Link
                  href="/consultations"
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress timer keyframe animation */}
      <style jsx>{`
        @keyframes progressTimer {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
