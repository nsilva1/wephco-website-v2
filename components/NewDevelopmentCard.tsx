'use client'

import React, { useState, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'

interface NewDevelopmentCardProps {
    imageURL: StaticImageData;
    title: string;
    location: string;
    description: string;
}

const NewDevelopmentCard = ({imageURL, title, location, description}: NewDevelopmentCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [imageHeight, setImageHeight] = useState<string | number>('30rem')
    const textRef = useRef<HTMLParagraphElement>(null)

    // useEffect(() => {
    //     if(isHovered){
    //         // const textHeight = textRef.current ? textRef.current.offsetHeight : 0;
    //         // const newHeight = ((textHeight + 40)/16).toString() + 'rem';
    //         setImageHeight('45rem')
    //     } else {
    //         setImageHeight('40rem')
    //     }
    // },[isHovered])

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
        <Image src={imageURL} alt={title} style={{height:`${imageHeight}`}} className={`w-full object-cover ${isHovered ? 'transition-all ease-in-out duration-500': ''}`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100': 'opacity-0'}`} />
        <div className='absolute bottom-4 left-4 text-white'>
            <h3 className={`font-semibold ${isHovered ? 'text-3xl' : 'text-lg'} transition-all duration-300`}>{title}</h3>
            <p className={`${isHovered ? 'text-xl' : 'text-sm'} transition-all duration-300`}>{location}</p>
            <p ref={textRef} className={`text-base mt-2 max-w-[80%] whitespace-pre-line transition-opacity duration-500 max-h-0 ${isHovered ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'} overflow-hidden pointer-events-none`}>{description}</p>
        </div>
    </div>
  )
}

export { NewDevelopmentCard }