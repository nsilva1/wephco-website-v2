'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { IProperty } from '@/interfaces/propertyInterface';

export interface PropertyCardProps extends IProperty {
  showModal?: () => void;
  openModal: boolean;
}

const PropertyCard = ({ showModal, openModal, ...props }: PropertyCardProps) => {
  

  return (
    <div
      className='bg-white dark:bg-gray-700 font-outfit rounded-xl shadow-lg overflow-hidden flex flex-col gap-2 transition-transform hover:scale-105'
    >
      <div className='relative w-full h-96 rounded-t-xl cursor-pointer'>
        <Image
          src={props.images[0]}
          alt='Property'
          fill
          objectFit='cover'
          className={`rounded-t-xl ${openModal ? '-z-10' : ''}`}
        />
      </div>
      <div className='p-4 flex flex-col gap-2'>
        <p className='text-base font-medium font-sans'>{props.name}</p>
      <p className='text-sm font-light'>{props.description}</p>
      <p className='font-mono font-bold'>
        {props.city}, {props.country}
      </p>
      <button onClick={showModal} className='bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-black transition-colors duration-300 cursor-pointer'>
        Get PDF
        <ArrowRight className='inline ml-2' />
      </button>
      </div>    
    </div>
  );
};

export { PropertyCard };
