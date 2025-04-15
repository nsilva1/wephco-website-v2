'use client';

import React, { useState, useEffect } from 'react';
import { PropertyCard, PropertyCardProps } from './PropertyCard';
import { sampleProperties } from '@/lib/constants';
import { BiArrowToRight } from 'react-icons/bi';
import Link from 'next/link';

interface PropertyProps extends React.ComponentPropsWithoutRef<'div'> {
  numberOfProperties?: number;
  viewMore?: boolean;
}

const FeaturedProperties = ({numberOfProperties = 3, viewMore = true, ...rest}: PropertyProps) => {
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);

  useEffect(() => {
    setProperties(sampleProperties);
  }, []);

  return (
    <div {...rest} className='bg-white p-8 my-20'>
      <h1 className='lg:text-5xl text-4xl font-bold text-black mb-5 text-center'>
        Featured Properties
      </h1>
      <p className='mb-5 text-gray-500 text-center'>
        Check out some of our most exclusive houses, apartments, townhomes,
        penthouses, and more
      </p>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
        {properties.slice(0, numberOfProperties).map((property, index) => (
          <div className='' key={index}>
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
        <div className={`mt-8 ${viewMore ? 'flex' : 'hidden'}`}>
            <Link href='/buy' className='bg-black text-white rounded-full px-5 py-3 flex justify-between items-center hover:bg-black/80 cursor-pointer w-full lg:w-40'>
                <p>View More</p>
                <BiArrowToRight className='text-2xl ml-2' />
            </Link>
        </div>
    </div>
  );
};

export { FeaturedProperties };
