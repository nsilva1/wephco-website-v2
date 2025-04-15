import React from 'react'
import { partners } from '@/lib/constants'
import Image from 'next/image'

const Partners = () => {

  return (
    <div className='px-8 py-20 bg-white'>
      <h3 className='lg:text-5xl text-4xl font-bold text-black mb-10 md:mb-20 text-center'>Our Partners</h3>
      <div className='flex flex-wrap gap-8 items-center justify-center md:justify-between'>
        {
          partners.map((partner, index) => (
            <div key={index} className='w-24'>
              <Image src={partner.image} alt={partner.title} width={200} className='filter brightness-10' />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { Partners }