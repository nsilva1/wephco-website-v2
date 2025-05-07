import React from 'react';
import { CgArrowRight } from 'react-icons/cg';
import Link from 'next/link';

const Regions = () => {
  return (
    <div className='bg-white py-14 px-8 my-20'>
      <div className='grid lg:grid-cols-4 gap-4'>
        <div className='col-span-1'>
          <h1 className='lg:text-5xl text-4xl font-bold text-[#131316] mb-5'>
            Our Regions
          </h1>
          <p className='text-gray-500'>Discover the property you've been waiting for</p>
        </div>
        <div className='col-span-1'>
          <Link
            href='/buy'
            className='bg-black text-white hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>Abu Dhabi</h3>
            <CgArrowRight />
          </Link>
        </div>
        <div className='col-span-1'>
          <Link
            href='/buy'
            className='bg-black text-white hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>Dubai</h3>
            <CgArrowRight />
          </Link>
        </div>
        <div className='col-span-1'>
          <Link
            href='/buy'
            className='bg-black text-white hover:bg-primary hover:text-white p-4 rounded-2xl flex flex-1 justify-between items-center cursor-pointer'
          >
            <h3 className='font-bold'>London</h3>
            <CgArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Regions };
