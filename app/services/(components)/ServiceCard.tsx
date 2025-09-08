'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ServiceCard = ({imageURL, title, description, step, length, increaseStep, decreaseStep}: { imageURL: StaticImageData; title: string; description: string; step: number; length: number, increaseStep: () => void; decreaseStep: () => void }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-16 font-outfit'> 
        <div className='col-span-1 relative hidden md:flex image-shadow-container'>
            <Image src={imageURL} alt='Service' width={400} height={500} objectFit='cover' className='w-full h-full' />
        </div>
        <div className='col-span-1 flex flex-col gap-4 justify-start items-start'>
            <h2 className='text-primary uppercase font-semibold'>Our Services</h2>
            <hr className='text-black w-full' />
            <h2 className='text-black text-3xl my-8'>{title}</h2>
            <p className='font-light mb-4 text-black'>{description}</p>
            <div className='flex gap-20'>
                <button onClick={decreaseStep} disabled={step === 0 ? true : false} className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors'>
                    <ArrowLeft size={16} />
                </button>
                <button onClick={increaseStep} disabled={step === length ? true : false} className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors'>
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    </div>
  )
}

export { ServiceCard }