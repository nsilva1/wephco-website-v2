'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';

export interface EventItem {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time: string;
  location: string;
  image: string;
  scope: 'Local' | 'International';
  format: 'Physical' | 'Virtual';
  seatsRemaining?: number;
  isPast?: boolean;
  agenda?: {
    time: string;
    title: string;
    description?: string;
  }[];
  hosts?: {
    name: string;
    role: string;
    image: string;
  }[];
  highlights?: string[];
  galleryImages?: string[];
  hasGallery?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface EventCardProps {
  event: EventItem;
  onApply: (event: EventItem) => void;
}

export function EventCard({ event, onApply }: EventCardProps) {
  const {
    id,
    title,
    description,
    date,
    time,
    location,
    image,
    scope,
    format,
    seatsRemaining,
    isPast,
  } = event;

  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-primary/10 rounded-2xl overflow-hidden shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      {/* Event Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Soft Dark Vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />

        {/* Category Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary text-background-dark shadow-sm">
            {scope}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-primary border border-primary/20 backdrop-blur-xs">
            {format}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col grow space-y-4">
        <div className="space-y-2">
          {/* Date and Time */}
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <Calendar className="size-3.5" />
            <span>{date}</span>
            <span className="text-slate-600">•</span>
            <span>{time}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
            {id ? <Link href={`/events/${id}`}>{title}</Link> : title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Location & Attendance info */}
        <div className="pt-2 border-t border-primary/5 flex flex-col gap-2 mt-auto">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {!isPast && seatsRemaining !== undefined && (
            <div className="flex items-center gap-2 text-xs text-amber-500">
              <Users className="size-3.5 shrink-0" />
              <span>Only {seatsRemaining} VIP invites remaining</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isPast ? (
            event.hasGallery && id ? (
              <Link
                href={`/events/${id}/gallery`}
                className="w-full py-2.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-background-dark transition-all duration-300 font-bold rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-1 group/btn">
                <span>View Event Gallery</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            ) : (
              <button
                disabled
                className="w-full py-2.5 bg-slate-800/40 border border-slate-700/50 text-slate-500 font-bold rounded-lg text-xs tracking-wider uppercase">
                Completed
              </button>
            )
          ) : id ? (
            <Link
              href={`/events/${id}`}
              className="w-full py-2.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-background-dark transition-all duration-300 font-bold rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-1 group/btn">
              <span>View Event Details</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          ) : (
            <button
              onClick={() => onApply(event)}
              className="w-full py-2.5 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-background-dark transition-all duration-300 font-bold rounded-lg text-xs tracking-wider uppercase flex items-center justify-center gap-1 group/btn">
              <span>Request Invitation</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
