import React from 'react'
import Image from 'next/image';
import { formatCurrency } from '@/lib/helperFunctions';

export interface PropertyCardProps {
    imageURL: string;
    price: number;
    location: string;
    currency: string;
    beds?: number;
    baths?: number;
    sqft?: number;
}

const PropertyCard = ({ imageURL, price, location, currency, beds, baths, sqft } : PropertyCardProps) => {
  return (
    <div className='bg-white rounded-2xl flex flex-col gap-2 p-4 shadow-2xl'>
        <div className='relative w-full h-96 transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-2xl'>
        <Image src={imageURL} alt='Property' fill objectFit='cover' className='rounded-2xl' />
        </div>
        <p className='text-primary font-bold'>{formatCurrency(price, currency)}</p>
        <p className='text-sm font-light font-sans'>{location}</p>
        <div className='flex justify-between items-center'>
            {beds && <p className='font-mono font-bold'>{beds} Beds</p>}
            {baths && <p className='font-mono font-bold'>{baths} Baths</p>}
            {sqft && <p className='font-mono font-bold'>{sqft} sqft</p>}
        </div>
    </div>
  )
}

export { PropertyCard }