'use client';

import React from 'react';
import { newsArticles } from '@/lib/constants';
import Link from 'next/link';
import { BiRightArrowAlt } from 'react-icons/bi';

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary text-xs font-bold tracking-widest uppercase block">
            Media Room
          </span>
          <h3 className="text-4xl md:text-5xl font-light text-slate-100 leading-tight">
            In the{' '}
            <span className="text-primary font-extrabold italic">Press</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            See what&apos;s got everyone talking. Enjoy featured stories about
            our dynamic properties, agents, and company as the premier luxury
            real estate network.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <div
              key={index}
              className="bg-[#022618]/15 border border-primary/10 rounded-2xl p-8 hover:border-primary/45 transition-all duration-300 flex flex-col justify-between h-full group">
              <div className="space-y-4 mb-6">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest block">
                  {article.publication}
                </span>
                <q className="text-slate-100 text-lg font-light leading-relaxed italic block before:content-none after:content-none">
                  &quot;{article.title}&quot;
                </q>
              </div>

              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 mt-auto group-hover:translate-x-1 duration-300 w-fit">
                Read More <BiRightArrowAlt className="text-lg" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
