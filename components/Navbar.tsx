'use client';

import React, { useState, useEffect } from 'react';
import { navbarMenu } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdMenu } from 'react-icons/md';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { ArrowRight, X } from 'lucide-react';

const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState(
    'bg-background-dark/60 border-b border-primary/10'
  );
  const [navbarButton, setNavbarButton] = useState(
    'bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg'
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg(
          'bg-background-dark/95 border-b border-primary/20 shadow-lg shadow-black/35'
        );
        setNavbarButton(
          'bg-primary hover:bg-white text-background-dark px-6 py-2.5 rounded-lg'
        );
      } else {
        setNavbarBg('bg-background-dark/60 border-b border-primary/10');
        setNavbarButton(
          'bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-lg'
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when off-canvas menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  // Close menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathName]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-40 ${navbarBg} h-20 flex items-center backdrop-blur-md font-display`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="logo"
              width={90}
              height={45}
              className="brightness-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center gap-10">
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

          <div className="flex items-center gap-4">
            <Link
              href="/consultations"
              className={`${navbarButton} hidden lg:flex items-center text-xs font-bold tracking-widest uppercase transition-all duration-300`}
            >
              Consult Expert
              <ArrowRight
                size={14}
                className="inline ml-2 transition-transform duration-300 hover:translate-x-1"
              />
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                aria-label="Toggle navigation menu"
                className="p-2 text-slate-200 hover:text-primary transition-colors focus:outline-none"
                onClick={() => setShowMobileMenu(true)}
              >
                <MdMenu size={30} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Off-Canvas Mobile Drawer & Backdrop */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background-dark/98 border-l border-primary/20 shadow-2xl z-50 flex flex-col justify-between p-6 transform transition-transform duration-300 ease-in-out lg:hidden ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Off-Canvas Header */}
        <div className="flex items-center justify-between pb-6 border-b border-primary/15">
          <Link
            href="/"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={35}
              className="brightness-110"
            />
            <span className="text-sm font-extrabold tracking-widest text-primary uppercase">
              WEPHCO
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setShowMobileMenu(false)}
            className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-primary border border-primary/20 transition-all hover:scale-105"
          >
            <X size={20} />
          </button>
        </div>

        {/* Off-Canvas Navigation List */}
        <div className="flex-1 py-8 overflow-y-auto space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary/70 mb-4 px-3">
            Navigation Menu
          </p>
          <ul className="space-y-1">
            {navbarMenu.map((item, index) => {
              const isActive = pathName === item.path;
              return (
                <li key={index}>
                  <Link
                    href={item.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-display text-sm uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30'
                        : 'text-slate-200 hover:bg-slate-900/80 hover:text-primary'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      size={14}
                      className={`transition-transform ${
                        isActive ? 'text-primary' : 'text-slate-500'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Off-Canvas Footer Action */}
        <div className="pt-6 border-t border-primary/15 space-y-4">
          <Link
            href="/consultations"
            onClick={() => setShowMobileMenu(false)}
            className={`${navbarButton} flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase w-full py-3.5 shadow-lg shadow-primary/20`}
          >
            <span>Consult Expert</span>
            <ArrowRight size={16} />
          </Link>

          <p className="text-[10px] text-center text-slate-500 font-light">
            © {new Date().getFullYear()} WEPHCO Brokerage & Asset Management
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;


