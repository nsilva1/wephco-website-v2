'use client'

import React from 'react';
import Image from 'next/image';
import hero from '@/images/agent5.jpg';


const Hero = ({onButtonClick}: {onButtonClick: () => void;}) => {
  return (
    <div className='relative h-[500px] lg:h-[600px]'>
      <Image
        src={hero}
        alt='Background'
        layout='fill'
        objectFit='cover'
        className='rounded-b-3xl'
      />
      <div className='absolute inset-0 bg-black/80 opacity-80 flex items-center justify-center rounded-b-3xl'>
        <div className='text-center text-white p-8 max-w-3xl'>
          <h1 className='lg:text-7xl text-4xl font-bold mb-4 font-outfit'>
            Become A Wephco
            <br />
            Affiliate
          </h1>
          <button onClick={onButtonClick} className='bg-primary text-white py-2 px-4 rounded-full cursor-pointer'>Join Us</button>
        </div>
      </div>
    </div>
  );
};

export { Hero };
