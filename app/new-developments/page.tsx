'use client'

import React, { useState } from 'react'
import saadiyat from '@/images/saadiyat5.jpg'
import saadiyat2 from '@/images/saadiyat6.jpg'
import saadiyat3 from '@/images/saadiyat7.jpg'
import saadiyat4 from '@/images/saadiyat9.jpg'
import Image from 'next/image'
import { InterestForm } from '@/components/InterestForm'

const DevelopmentPage = () => {
    const [open, setOpen] = useState(false)

    let interestForm = (
        <InterestForm open={open} close={() => setOpen(false)} />
    )

  return (
    <section className='p-8'>
        {interestForm}
        <h2 className='text-4xl font-bold text-center'>New Developments</h2>
        <div className='flex flex-col lg:flex-row lg:p-8'>
            <div className='flex-1 lg:p-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex items-center justify-center'>
                        <Image src={saadiyat} alt='Saadiyat Island' className='w-full rounded-lg shadow-lg' />
                    </div>
                    <div className='flex items-center justify-center'>
                        <Image src={saadiyat2} alt='Saadiyat Island' className='w-full rounded-lg shadow-lg' />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                    <div className='flex items-center justify-center'>
                        <Image src={saadiyat3} alt='Saadiyat Island' className='w-full rounded-lg shadow-lg' />
                    </div>
                    <div className='flex items-center justify-center'>
                        <Image src={saadiyat4} alt='Saadiyat Island' className='w-full rounded-lg shadow-lg' />
                    </div>
                </div>
            </div>
            <div className='flex-1 lg:p-4'>
                <h3 className='text-2xl font-semibold mt-4'>Saadiyat Island, Abu Dhabi</h3>
                <h4 className='text-xl font-medium text-gray-500'>MANDARIN ORIENTAL RESIDENCES</h4>
                <p className='mt-2 text-gray-700'>
                    Saadiyat Island is a cultural district in Abu Dhabi, home to the Louvre Abu Dhabi and the upcoming Guggenheim Museum. 
                    It offers luxurious beachfront properties and a vibrant community.
                </p>
                <ul className='list-none mt-4'>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 1BR: 102sqm - $2.5M
                    </li>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 2BR: 204sqm - $12.3M
                    </li>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 2BR + Maid: 215sqm - $17.3M
                    </li>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 3BR + Maid: 249sqm - $26.2M
                    </li>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 3BR + Maid + Pool: 576sqm - $43.8M
                    </li>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 4BR + Maid + Pool: 644sqm - $51M
                    </li>
                    <li className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>✔️</span> 5BR Penthouse: 2,026sqm - TBA
                    </li>
                </ul>
                <div>
                <p>FULLY FURNISHED - FULLY EQUIPPED</p>
                <p>133 Total units</p>
                <p>Completion, Q3 2028</p>
                <p>Payment Plan 65/35</p>
                <p>10% Down Payment</p>
                <p>2% ADM Registration</p>
                </div>
                <button type='button' onClick={() => setOpen(true)} className='mt-4 px-4 py-2 bg-black text-white rounded-lg cursor-pointer'>Declare Interest</button>
            </div>
        </div>
    </section>
  )
}

export default DevelopmentPage