import React from 'react'
import Link from 'next/link'
import agent from '@/images/building2.jpg'
import Image from 'next/image'
import { BiArrowToRight } from 'react-icons/bi'

const BecomeAgent = () => {
  return (
    <div id='#agents' className='my-20 p-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='col-span-1 '>
                <Image src={agent} alt='agent' className='w-full h-full rounded-3xl' />
            </div>
            <div className='col-span-1 flex flex-col gap-8 items-center md:items-start'>
                <h5 className='uppercase text-gray-500 font-semibold font-roboto'>Become a wephco agent</h5>
                <h2 className='text-4xl font-bold mb-4 text-black lg:text-5xl'>Join the Future<br /> of Real Estate</h2>
                <p className='mb-8 md:text-2xl text-lg text-center md:text-start text-gray-500'>Grow your business and brand with a brokerage that empowers you with the resourcess and access to do great things.</p>
                <Link href='/agents' className='bg-black text-white rounded-full px-5 py-3 flex justify-between items-center hover:bg-black/80 cursor-pointer w-full lg:w-40'>
                    <p className='font-bold'>Join Us</p>
                    <BiArrowToRight className='text-2xl ml-2' />
                </Link>
            </div>
        </div>
    </div>
  )
}

export { BecomeAgent }