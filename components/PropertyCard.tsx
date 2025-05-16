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
      className='bg-white rounded-2xl flex flex-col gap-2 p-4 shadow-2xl'
      onClick={showModal}
    >
      <div className='relative w-full h-96 transition-all duration-200 hover:scale-105 rounded-2xl cursor-pointer'>
        <Image
          src={props.images[0]}
          alt='Property'
          fill
          objectFit='cover'
          className='rounded-2xl'
        />
      </div>
      <p className='text-base font-medium font-sans'>{props.name}</p>
      <p className='text-sm font-light'>{props.description}</p>
      <p className='font-mono font-bold'>
        {props.city}, {props.country}
      </p>
      {interestModal}
    </div>
  );
};

export { PropertyCard };
