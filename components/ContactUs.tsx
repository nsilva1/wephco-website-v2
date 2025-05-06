'use client'

import React, { useState } from 'react'
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa6'

const ContactUs = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleSubmit = () => {}

  return (
    <div>
        <div className='flex justify-around flex-col md:flex-row items-center gap-8 p-8'>
            <div className='col-span-1 flex flex-col gap-8'>
                <h3 className='text-xl md:text-3xl uppercase text-[#131316] font-semibold text-center md:text-start'>Speak with our real estate<br /> specialists today.</h3>
                <div className='flex gap-4'>
                    <div className='bg-black rounded-full p-3 text-white'>
                        <FaWhatsapp className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-base font-semibold'>WhatsApp</p>
                        <a href='https://wa.me/2349161246300' target='_blank' className='text-sm text-gray-500'>Click to WhatsApp</a>
                    </div>
                </div>
                <div className='flex gap-4'>
                <div className='bg-black rounded-full p-3 text-white'>
                        <FaPhone className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-base font-semibold'>Phone</p>
                        <a href='tel:+2349161246300' className='text-sm text-gray-500'>+234 916 124 6300</a>
                    </div>
                </div>
                <div className='flex gap-4'>
                <div className='bg-black rounded-full p-3 text-white'>
                        <FaEnvelope className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-base font-semibold'>Email</p>
                        <a href='mailto:contact@wephco.com' className='text-sm text-gray-500'>contact@wephco.com</a>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='bg-white rounded-xl border border-gray-200 w-96 md:w-[500px] px-8 py-16'>
                    <h3 className='text-3xl uppercase text-[#131316] font-semibold mb-10'>Contact Us</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className='flex flex-col gap-8'>
                            <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} className='border-b p-2 w-full' placeholder='Your Name...' />
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-b p-2 w-full' placeholder='Your Email...' />
                            <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='border-b p-2 w-full' placeholder='Phone Number...' />
                            <button className='bg-[#131316] text-white font-semibold w-full p-4 rounded-3xl' type='submit'>Submit</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export { ContactUs }