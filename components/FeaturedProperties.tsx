'use client';

import React, { useState, useEffect } from 'react';
import { PropertyCard, PropertyCardProps } from './PropertyCard';
import { sampleProperties } from '@/lib/constants';
import { BiArrowToRight } from 'react-icons/bi';
import Link from 'next/link';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);

  useEffect(() => {
    setProperties(sampleProperties);
  }, []);

  return (
    <div className='bg-white p-8'>
      <h1 className='lg:text-5xl text-4xl font-bold text-primary mb-5'>
        Featured Properties
      </h1>
      <p className='mb-5'>
        Check out some of our most exclusive houses, apartments, townhomes,
        penthouses, and more
      </p>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
        {properties.map((property, index) => (
          <div className='' key={index}>
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
        <div className='mt-8'>
            <Link href='/buy' className='bg-green-700 text-white rounded-full px-5 py-3 flex justify-between items-center hover:bg-green-700/80 cursor-pointer w-full lg:w-40'>
                <p>View More</p>
                <BiArrowToRight className='text-2xl ml-2' />
            </Link>
        </div>
    </div>
  );
};

export { FeaturedProperties };
