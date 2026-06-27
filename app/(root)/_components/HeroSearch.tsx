'use client';

import React, { useState } from 'react';
import { ArrowRight, MapPin, Home, DollarSign } from 'lucide-react';

const HeroSearch = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Modern Villa');
  const [price, setPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Action logic for search
    console.log({ location, type, price });
  };

  return (
    <div className="glass-effect p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto w-full mt-10">
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/20">
        {/* Location */}
        <div className="flex flex-col items-start px-6 py-3">
          <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1.5 flex items-center gap-1">
            <MapPin size={10} /> Location
          </span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Beverly Hills, CA"
            className="bg-transparent border-none outline-none focus:ring-0 text-white placeholder:text-slate-500 w-full p-0 text-sm font-medium"
          />
        </div>

        {/* Property Type */}
        <div className="flex flex-col items-start px-6 py-3">
          <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1.5 flex items-center gap-1">
            <Home size={10} /> Property Type
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-0 text-white w-full p-0 text-sm font-medium appearance-none cursor-pointer">
            <option
              value="Modern Villa"
              className="bg-background-dark text-white">
              Modern Villa
            </option>
            <option
              value="Sky Penthouse"
              className="bg-background-dark text-white">
              Sky Penthouse
            </option>
            <option
              value="Coastal Mansion"
              className="bg-background-dark text-white">
              Coastal Mansion
            </option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col items-start px-6 py-3">
          <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1.5 flex items-center gap-1">
            <DollarSign size={10} /> Price Range
          </span>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$2M - $15M+"
            className="bg-transparent border-none outline-none focus:ring-0 text-white placeholder:text-slate-500 w-full p-0 text-sm font-medium"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-primary hover:bg-white text-background-dark px-10 py-4 rounded-xl md:rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shrink-0">
        <span className="text-xs tracking-widest uppercase">Search</span>
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
  );
};

export { HeroSearch };
