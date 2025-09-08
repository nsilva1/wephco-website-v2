'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { typography } from '@/lib/styles'
import { IProperty } from '@/interfaces/propertyInterface'


const NewDevelopmentCard = ({name, description, images, country, city}: IProperty) => {
    const [isHovered, setIsHovered] = useState(false)
    const [imageHeight, setImageHeight] = useState<number>(480)
    const textRef = useRef<HTMLParagraphElement>(null)


  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-96 w-96'>
        <div className='relative w-full h-96 rounded-t-xl cursor-pointer' >
          <Image src={images[0]} fill objectFit='cover' alt={name} className={`object-cover ${isHovered ? 'transition-all ease-in-out duration-500': ''}`} />
        </div>
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
          New
        </span>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100': 'opacity-0'}`} />
        <div className='absolute bottom-4 left-4 text-white'>
            <h3 className={`font-semibold ${isHovered ? 'text-3xl' : 'text-lg'} transition-all duration-300`}>{name}</h3>
            <p className={`${isHovered ? 'text-xl' : 'text-sm'} transition-all duration-300 font-outfit`}>{`${city}, ${country}`}</p>
            <p ref={textRef} className={`${typography.paragraph} whitespace-pre-line transition-opacity duration-500 max-h-0 ${isHovered ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'} overflow-hidden pointer-events-none`}>{description}</p>
        </div>
    </div>
  )
}

export { NewDevelopmentCard }