import React from 'react';
import { CgArrowRight } from 'react-icons/cg';
import Link from 'next/link';

const Regions = () => {
  return (
    <div className='bg-slate-200 py-14 px-8'>
      <div className='grid lg:grid-cols-3 gap-4'>
        <div className='col-span-1'>
          <h1 className='lg:text-5xl text-4xl font-bold text-primary mb-5'>
            Our Regions
          </h1>
          <p className=''>Discover the home you've been waiting for</p>
        </div>
        <div className='col-span-1'>
          <Link
            href='/abuja'
            className='bg-white text-black hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>Abuja</h3>
            <CgArrowRight />
          </Link>
        </div>
        <div className='col-span-1'>
          <Link
            href='/dubai'
            className='bg-white text-black hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>Dubai</h3>
            <CgArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Regions };
