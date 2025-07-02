'use client'

import React, { useState } from 'react';
import { CgArrowRight } from 'react-icons/cg';
import { typography, layout } from '@/lib/styles'; // Assuming you have a styles file for typography

const Regions = () => {
  const [abudhabiOpen, setAbudhabiOpen] = useState(false);
  const [dubaiOpen, setDubaiOpen] = useState(false);
  const [londonOpen, setLondonOpen] = useState(false);

  return (
    <div className={`${layout.section}`}>
      <div className='grid lg:grid-cols-4 gap-4'>
        <div className='col-span-1'>
          <h1 className={`${typography.heading2}`}>
            Our Regions
          </h1>
          <p className={`${typography.subtitle}`}>Discover the property you've been waiting for</p>
        </div>
        <div className='col-span-1'>
          <div
            onClick={() => setAbudhabiOpen(!abudhabiOpen)}
            className='bg-black text-white hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>Abu Dhabi</h3>
            <CgArrowRight className={`${abudhabiOpen ? 'rotate-90' : ''}`} />
          </div>
            {abudhabiOpen && (
              <div className='bg-white shadow-lg dark:bg-gray-800 p-4 rounded-2xl mt-2'>
              <ul className={`${typography.smallParagraph} space-y-4`}>
                <li>Government-backed development projects</li>
                <li>Exclusive, peaceful residential communities</li>
                <li>Great for family relocation and high-end investors</li>
              </ul>
              </div>
            )}
        </div>
        <div className='col-span-1'>
          <div
            onClick={() => setDubaiOpen(!dubaiOpen)}
            className='bg-black text-white hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>Dubai</h3>
            <CgArrowRight className={`${dubaiOpen ? 'rotate-90' : ''}`} />
          </div>
          {dubaiOpen && (
            <div className='bg-white shadow-lg dark:bg-gray-800 p-4 rounded-2xl mt-2'>
              <ul className={`${typography.smallParagraph} space-y-4`}>
                <li>Tax-free investment returns.</li>
                <li>Booming tourism and business hub.</li>
                <li>High rental yields in premium areas.</li>
              </ul>
            </div>
          )}
        </div>
        <div className='col-span-1'>
          <div
            onClick={() => setLondonOpen(!londonOpen)}
            className='bg-black text-white hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>London</h3>
            <CgArrowRight className={`${londonOpen ? 'rotate-90' : ''}`} />
          </div>
          {londonOpen && (
            <div className='bg-white shadow-lg dark:bg-gray-800 p-4 rounded-2xl mt-2'>
              <ul className={`${typography.smallParagraph} space-y-4`}>
                <li>Global financial capital.</li>
                <li>Safe, long-term property appreciation.</li>
                <li>High demand for prime real estate.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Regions };
