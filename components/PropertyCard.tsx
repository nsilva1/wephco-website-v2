'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// import { formatCurrency } from '@/lib/helperFunctions';
import { InterestForm } from './InterestForm';
import { IProperty } from '@/interfaces/propertyInterface';

export interface PropertyCardProps extends IProperty {
  showForm?: boolean;
}

const PropertyCard = ({ showForm = false, ...props }: PropertyCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    if (!showForm) {
      return;
    }

    setOpenModal(true);
  };

  let interestModal = (
    <InterestForm open={openModal} close={() => setOpenModal(false)} />
  );

  return (
    <div
      onClick={showModal}
      className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col gap-2 transition-transform hover:scale-105 cursor-pointer'
    >
      <div className='relative w-full h-96 rounded-t-xl cursor-pointer'>
        <Image
          src={props.images[0]}
          alt='Property'
          fill
          objectFit='cover'
          className='rounded-t-xl'
        />
      </div>
      <div className='p-4 flex flex-col gap-2'>
        <p className='text-base font-medium font-sans'>{props.name}</p>
      <p className='text-sm font-light'>{props.description}</p>
      <p className='font-mono font-bold'>
        {props.city}, {props.country}
      </p>
      </div>
      {/* <div className='flex items-end justify-between'>
        <button className='bg-black text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80'>
          View More
        </button>
        <button
          onClick={showModal}
          className='bg-primary text-white rounded-lg px-6 py-3 mx-2 hover:bg-primary/80'
        >
          Show Interest
        </button>
      </div> */}
      {interestModal}
    </div>
  );
};

export { PropertyCard };
