import React from 'react'
import Image from 'next/image'
import hero from '@/images/new-home2.jpg'

const Hero = () => {
  return (
    <div className='relative h-[500px] lg:h-[600px]'>
        <Image src={hero} alt='Background' layout='fill' objectFit='cover'  />
        <div className='absolute inset-0 bg-black/80 opacity-80 flex items-center justify-center'>
        <div className='text-center text-white p-8 max-w-2xl'>
            <h1 className='lg:text-7xl text-4xl font-bold mb-4'>Your New Home<br />Awaits</h1>
        </div>
        </div>
    </div>
  )
}

export { Hero }