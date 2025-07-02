import React from 'react'
import { partners } from '@/lib/constants'
import Image from 'next/image'
import { typography, layout } from '@/lib/styles' // Assuming you have a styles file for typography

const Partners = () => {

  return (
    <div className={`${layout.columnSection}`}>
      <h3 className={`${typography.heading2} mb-10 md:mb-20 text-center`}>Our Partners</h3>
      <div className='flex flex-wrap gap-8 items-center justify-center md:justify-between'>
        {
          partners.map((partner, index) => (
            <div key={index} className='w-24'>
              <Image src={partner.image} alt={partner.title} width={200} className='filter brightness-10 dark:brightness-100 dark:invert' />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { Partners }