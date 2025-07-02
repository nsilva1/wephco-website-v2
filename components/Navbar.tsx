'use client';

import React, { useState, useEffect } from 'react';
import { navbarMenu } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdCancel, MdMenu } from 'react-icons/md';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { ArrowRight } from 'lucide-react';
import { typography } from '@/lib/styles';

const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState('transparent');
  const [textColor, setTextColor] = useState('text-white');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [navbarButton, setNavbarButton] = useState(
    'bg-white py-2 px-4 rounded-full'
  );
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBg('bg-white shadow-lg');
        setTextColor('text-black');
        setNavbarButton('bg-black text-white py-2 px-4 rounded-full');
      } else {
        setNavbarBg('transparent');
        setTextColor('text-white');
        setNavbarButton('bg-white py-2 px-4 rounded-full');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 rounded-full transition-all duration-300 z-50 ${navbarBg} h-16 font-outfit`}
    >
      <div className='flex justify-between items-center'>
        <Link href='/' className=''>
          <Image src={logo} alt='logo' width={100} height={50} />
        </Link>
        <div className='hidden lg:flex justify-center gap-8'>
          {navbarMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`${textColor} ${
                pathName === item.path ? 'font-bold underline' : ''
              } text-xl`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className='mr-6'>
          <Link href='/consultations' className={`${navbarButton} hidden lg:flex items-center ${typography.smallParagraph}`}>
            Talk With An Expert Consultant
            <ArrowRight size={16} className='inline ml-1' />
          </Link>
          <div className='lg:hidden col-span-1 flex justify-end items-center'>
          <div
            className='cursor-pointer'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <MdCancel size={30} className={textColor} />
            ) : (
              <MdMenu size={30} className={textColor} />
            )}
          </div>
          <div
            className={`${
              showMobileMenu ? 'flex' : 'hidden'
            } p-6 bg-white text-black absolute top-16 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-10`}
          >
            <ul className='list-none flex flex-col justify-end items-center flex-1'>
              {navbarMenu.map((item, index) => (
                <li
                  key={index}
                  className={`font-sans font-normal cursor-pointer text-[20px] mb-3`}
                >
                  <Link href={item.path}>{item.label}</Link>
                </li>
              ))}
              <li className='font-sans font-normal cursor-pointer text-[16px] mb-3'>
                <Link href='/consultations' className={navbarButton}>
                  Talk With An Expert Consultant
                </Link>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
