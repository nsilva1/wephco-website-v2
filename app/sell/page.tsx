import React from 'react'
import { Hero } from './components/Hero'
import Image from 'next/image'
import agent from '@/images/agent-sell.jpg'
import { LiaAwardSolid } from "react-icons/lia";
import { Footer } from '@/components/Footer';

const SellPage = () => {
  return (
    <section className=''>
        <Hero />

        <section className='p-10 font-outfit'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='col-span-1'>
                    <Image src={agent} alt='Agent' className='rounded-2xl' width={800} />
                </div>
                <div className='col-span-1 flex flex-col items-center md:items-start justify-start gap-4'>
                    <h3 className='text-primary text-2xl font-semibold text-center md:text-start'>Put your property in front of more potential buyers worldwide than anyone else.</h3>
                    <p className='text-[#131316] dark:text-gray-400 text-sm md:text-base text-center md:text-start'>Work with a dedicated WEPHCO agent who will listen to your needs and goals, use data and creativity to optimize your property for potential buyers, and stand beside you for every step of the selling process. We welcome expectations because we hold ourselves to the highest standard and know that our success is defined by yours. If you’re considering selling your home, or just want to get a sense of your home’s value, we would love to connect.</p>
                </div> 
            </div>
        </section>

        <section className='p-10 font-outfit'>
            <div className='flex flex-col items-center gap-8'>
                <LiaAwardSolid className='text-4xl' />
                <h4 className='tracking-wide text-center'>The most followed Real Estate brand in the country</h4>
                <h3 className='text-primary text-4xl font-semibold text-center md:text-start'>Why Everyone is Selling with Wephco</h3>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                    <div className='col-span-1 border border-gray-300 rounded-lg p-20'>
                        <h4 className='text-primary text-3xl md:text-4xl lg:text-5xl font-bold text-center'>40M+<br />impressions per month</h4>
                    </div>
                    <div className='col-span-1 border border-gray-300 rounded-lg p-20'>
                        <h4 className='text-primary text-3xl md:text-4xl lg:text-5xl font-bold text-center'>1M+<br />followers</h4>
                    </div>
                    <div className='col-span-1 border border-gray-300 rounded-lg p-20'>
                        <h4 className='text-primary text-3xl md:text-4xl lg:text-5xl font-bold text-center'>1B+<br />total impressions</h4>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </section>
  )
}

export default SellPage