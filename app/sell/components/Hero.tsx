import React from 'react';
import Image from 'next/image';
import hero from '@/images/home-interior.jpg';
import { InterestForm } from './InterestForm';

const Hero = () => {
  return (
    <div className='relative h-[500px] lg:h-[600px]'>
      <Image src={hero} alt='Background' layout='fill' objectFit='cover' />
      <div className='absolute inset-0 bg-black/80 opacity-80 flex items-center justify-center'>
        <div className='text-center text-white p-8 max-w-2xl'>
          <h1 className='lg:text-6xl text-4xl font-bold mb-4'>
            Sell With The Best
          </h1>
          <p className='text-xl font-bold mb-6'>
            Receive a free home valuation from one of our property experts
          </p>
          <InterestForm />
        </div>
      </div>
    </div>
  );
};

export { Hero };
