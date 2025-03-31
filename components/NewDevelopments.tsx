'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Utility function to combine class names
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface DevelopmentCardProps {
  title: string;
  location: string;
  imageUrl: string;
  isLarge?: boolean;
}

const DevelopmentCard: React.FC<DevelopmentCardProps> = ({ title, location, imageUrl, isLarge = false }) => {
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden",
        "transition-all duration-300",
        "shadow-lg hover:shadow-xl hover:scale-[1.01]",
        isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1",
        "bg-gray-900"
      )}
    >
      <div className='w-full'>
      <Image
        src={imageUrl}
        alt={title}
        fill 
        objectFit='cover'
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          "transition-transform duration-300",
          "group-hover:scale-110",
        )}
      />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className={cn(
          "text-lg font-semibold",
          isLarge ? "text-xl" : "text-lg"
        )}>
          {title}
        </h3>
        <p className="text-sm">{location}</p>
      </div>
    </div>
  );
};

const NewDevelopmentsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Dummy data for the new developments.
    const developments: DevelopmentCardProps[] = [
        {
            title: "The Birchwood",
            location: "Brooklyn",
            imageUrl: "https://images.unsplash.com/photo-1505843128374-9598268a3552?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "183 Java Street",
            location: "Brooklyn",
            imageUrl: "https://images.unsplash.com/photo-1523217582875-b9154744a492?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Brooklyn Point",
            location: "Brooklyn",
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG0dby1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "75 1st Avenue",
            location: "New York",
            imageUrl: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG0dby1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Huxley",
            location: "New York",
            imageUrl: "https://images.unsplash.com/photo-1520256687417-d13545590715?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG0dby1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "VELA",
            location: "Queens",
            imageUrl: "https://images.unsplash.com/photo-1568602471123-78835e98274d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG0dby1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "The Galleria",
            location: "Jersey City",
            imageUrl: "https://images.unsplash.com/photo-1600804340584-c7db2e501694?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG0dby1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    const cardWidth = 350; // Approximate width of each card, for scroll calculation.
    const gap = 24;       // Gap between cards

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setScrollPosition(scrollLeft);
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); //subtract one to handle rounding errors
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Call handleScroll to set initial state
            handleScroll();
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= (cardWidth + gap) * 2; // Scroll by 2 cards
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft += (cardWidth + gap) * 2;
        }
    };

  return (
    <div className="bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The Boldest New Developments
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Explore transformative new buildings that elevate modern luxury living.
          </p>
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-snap-x scrollbar-hide pb-8" // Added pb-8
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
            }}
          >
            {developments.map((development, index) => (
              <DevelopmentCard
                key={index}
                title={development.title}
                location={development.location}
                imageUrl={development.imageUrl}
                isLarge={index === 0}
              />
            ))}
          </div>
          {/* Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={scrollLeft}
              disabled={isAtStart}
              className={cn(
                "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white",
                "border-gray-700",
                isAtStart && "opacity-50 cursor-not-allowed"
              )}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Scroll Left</span>
            </button>
            <button
              onClick={scrollRight}
              disabled={isAtEnd}
              className={cn(
                "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white",
                "border-gray-700",
                isAtEnd && "opacity-50 cursor-not-allowed"
              )}
            >
              <ArrowRight className="w-5 h-5" />
              <span className="sr-only">Scroll Right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export { NewDevelopmentsSection };