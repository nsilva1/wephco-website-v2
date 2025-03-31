'use client'

import React, { useState } from 'react'
import hero from '@/images/hero-md.jpg'
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'
// import { BsSearch } from 'react-icons/bs'

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform search logic here using searchTerm
        console.log('Search term:', searchTerm);
    };

  return (
    <div className='relative h-[500px] lg:h-[600px]'>
        <Image src={hero} alt='Background' layout='fill' objectFit='cover'  />
        <div className='absolute inset-0 bg-black/50 opacity-80 flex items-center justify-center'>
        <div className='text-center text-white p-8 max-w-2xl'>
            <h1 className='lg:text-7xl text-4xl font-bold mb-4'>Make A Move For<br />Your Future</h1>
            <p className='text-2xl font-bold mb-6'>With Over $20 Million Sold, The Most Reliable Real Estate Brand in the Country</p>
            <form className='bg-white flex items-center rounded-full gap-4 p-2'>
                <input type='text' className="p-2 rounded-l-md text-black flex-grow focus:outline-none" placeholder='Search properties, locations, agents...' />
                <div className='rounded-full cursor-pointer'>
                    <BiSearch color='#808080' size={40} />
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export { Hero }