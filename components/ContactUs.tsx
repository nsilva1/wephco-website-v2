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
                <h3 className='text-4xl uppercase text-[#131316] font-semibold text-center md:text-start'>Speak with our real estate<br /> specialists today.</h3>
                <div className='flex gap-4'>
                    <div className='bg-black rounded-full p-3 text-white'>
                        <FaWhatsapp className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-base font-semibold'>WhatsApp</p>
                        <p className='text-sm text-gray-500'>Click to WhatsApp</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                <div className='bg-black rounded-full p-3 text-white'>
                        <FaPhone className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-base font-semibold'>Phone</p>
                        <p className='text-sm text-gray-500'>+234 903 052 5756</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                <div className='bg-black rounded-full p-3 text-white'>
                        <FaEnvelope className='text-2xl' />
                    </div>
                    <div>
                        <p className='text-base font-semibold'>Email</p>
                        <p className='text-sm text-gray-500'>info@wephco.com</p>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='bg-white rounded-xl shadow-2xl shadow-gray-500 w-96 md:w-[500px] p-8'>
                    <h3 className='text-4xl uppercase text-[#131316] font-semibold mb-10'>Contact Us!</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className='flex flex-col gap-8'>
                            <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} className='border-b p-2 w-full' placeholder='Your Name...' />
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-b p-2 w-full' placeholder='Your Email...' />
                            <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='border-b p-2 w-full' placeholder='Phone Number...' />
                            <button className='bg-[#131316] text-white font-semibold w-full p-4' type='submit'>Submit</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export { ContactUs }