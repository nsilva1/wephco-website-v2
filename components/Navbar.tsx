'use client';

import React, { useState, useEffect } from 'react';
import { navbarMenu } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdCancel, MdMenu } from 'react-icons/md';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { ArrowRight } from 'lucide-react';


const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState('bg-background-dark/60 border-b border-primary/10');
  const [navbarButton, setNavbarButton] = useState(
    'bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg'
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg('bg-background-dark/95 border-b border-primary/20 shadow-lg shadow-black/35');
        setNavbarButton('bg-primary hover:bg-white text-background-dark px-6 py-2.5 rounded-lg');
      } else {
        setNavbarBg('bg-background-dark/60 border-b border-primary/10');
        setNavbarButton('bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${navbarBg} h-20 flex items-center backdrop-blur-md font-display`}
    >
      <div className='max-w-7xl mx-auto w-full px-6 flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-3'>
          <Image src={logo} alt='logo' width={90} height={45} className="brightness-110" />
          <span className="hidden sm:inline text-lg font-extrabold tracking-widest text-primary uppercase">WEPHCO</span>
        </Link>
        <div className='hidden lg:flex justify-center gap-10'>
          {navbarMenu.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`text-slate-200 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase ${
                pathName === item.path ? 'text-primary font-bold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          <Link href='/consultations' className={`${navbarButton} hidden lg:flex items-center text-xs font-bold tracking-widest uppercase transition-all duration-300`}>
            Consult Expert
            <ArrowRight size={14} className='inline ml-2 transition-transform duration-300 hover:translate-x-1' />
          </Link>
          
          <div className='lg:hidden flex items-center'>
            <div
              className='cursor-pointer text-slate-200 hover:text-primary transition-colors'
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <MdCancel size={28} />
              ) : (
                <MdMenu size={28} />
              )}
            </div>
            {showMobileMenu && (
              <div
                className='p-6 bg-background-dark border border-primary/25 text-white absolute top-20 right-4 left-4 rounded-xl sidebar z-50 flex flex-col gap-4 shadow-xl'
              >
                <ul className='list-none flex flex-col justify-end items-center flex-1 w-full gap-4'>
                  {navbarMenu.map((item, index) => (
                    <li
                      key={index}
                      className='font-display font-medium cursor-pointer text-base uppercase tracking-wider hover:text-primary transition-colors w-full text-center py-2'
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Link href={item.path} className="block w-full">{item.label}</Link>
                    </li>
                  ))}
                  <li className='w-full' onClick={() => setShowMobileMenu(false)}>
                    <Link href='/consultations' className={`${navbarButton} flex items-center justify-center text-xs font-bold tracking-widest uppercase w-full py-3`}>
                      Consult Expert
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

