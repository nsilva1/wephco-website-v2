import React from 'react'
import Link from 'next/link'
import logo from '@/images/logo.png'
import Image from 'next/image'
import { socialLinks } from '@/lib/constants'

const Footer = () => {
  return (
    <footer className='px-8 md:py-16 bg-[#131316] font-outfit'>
        <div className='grid grid-cols-1 md:grid-cols-4 py-8 gap-5 justify-between'>
            <div className='col-span-1 flex justify-center items-center md:justify-start'>
                <Link href='/'><Image src={logo.src} alt='logo' width={200} height={200} className='' /></Link>
            </div>
            
            <div className='col-span-1 flex flex-col items-center gap-5'>
                <h5 className='uppercase text-gray-500 font-semibold font-roboto hidden md:flex'>Company</h5>
                <Link href='/about' className='font-semibold text-white text-sm uppercase leading-6 hover:underline'>About</Link>
                <Link href='/careers' className='font-semibold text-white text-sm uppercase leading-6 hover:underline'>Careers</Link>
                <Link href='/press' className='font-semibold text-white text-sm uppercase leading-6 hover:underline'>Press</Link>
            </div>
            <div className='col-span-1 flex flex-col items-center gap-5'>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/buy'>Buy</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/sell'>Sell</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/new-developments'>New Developments</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/agents'>Agents</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/contact-us'>Contact Us</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/auth/login'>Login</Link>
            </div>
            <div className='col-span-1 flex flex-col items-center gap-5'>
                <h5 className='uppercase text-gray-500 font-semibold font-roboto hidden md:flex'>Resources</h5>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/blog'>Blog</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/privacy-policy'>Privacy Policy</Link>
                <Link className='font-semibold text-white text-sm uppercase leading-6 hover:underline' href='/terms-of-service'>Terms of Service</Link>
            </div>
        </div>
        <hr className='text-gray-300' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-8 md:py-4'>
            <div className='col-span-1 flex flex-col justify-center items-center'>
                <p className='text-gray-500'>© {new Date().getFullYear()} Wephco. All rights reserved.</p>
            </div>
            <div className='col-span-1 flex justify-center items-center gap-5'>
                {socialLinks.map((social, index) => (
                    <Link key={index} href={social.link} target='_blank' rel='noopener noreferrer'>
                        <social.icon className='text-4xl text-gray-500 hover:text-green-700 border border-gray-500 hover:border-green-700 rounded-full p-2' />
                    </Link>
                ))}
            </div>
        </div>
    </footer>
  )
}

export { Footer }