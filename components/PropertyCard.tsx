'use client';

import React from 'react';
import Image from 'next/image';
// import { formatCurrency } from '@/lib/helperFunctions';
// import { InterestForm } from './InterestForm';
import { IProperty } from '@/interfaces/propertyInterface';

export interface PropertyCardProps extends IProperty {
  showModal?: () => void;
  openModal: boolean;
}

const PropertyCard = ({ showModal, openModal, ...props }: PropertyCardProps) => {
  

  return (
    <div
      onClick={showModal}
      className='bg-white dark:bg-gray-700 font-outfit rounded-xl shadow-lg overflow-hidden flex flex-col gap-2 transition-transform hover:scale-105 cursor-pointer'
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
      <button>
        Download PDF
      </button>
      </div>    
    </div>
  );
};

export { PropertyCard };
