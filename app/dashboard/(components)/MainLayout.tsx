'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dashboardMenu } from '@/lib/constants';
// import logo from '@/images/logo.png'
import smallLogo from '@/images/logo-w.png';
import { Tooltip } from '@/components/Tooltip';
import { BellIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='flex h-screen bg-white text-black'>
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-slate-600 text-white transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className='p-4 border-b border-gray-800'>
          {isCollapsed ? (
            <div className='flex justify-center'>
              <div className='h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium'>
                JD
              </div>
            </div>
          ) : (
            <div>
              <p className='font-medium'>userName</p>
              <p className='text-sm text-gray-400 truncate'>userEmail</p>
            </div>
          )}
        </div>

        <nav className='p-4'>
          <ul className='space-y-2'>
            {dashboardMenu.map((item) => (
              <li
                key={item.label}
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 hover:cursor-pointer transition-colors duration-200 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <Link href={item.path} className='flex'>
                  {
                    isCollapsed ? (<Tooltip text={item.label} position='right'>{<item.icon />}</Tooltip>) : <item.icon />
                  }
                  <span className={`${isCollapsed ? 'hidden' : 'ml-3'}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='p-4 border-t border-gray-800 flex justify-center'>
          <Image
            src={smallLogo.src}
            alt='Wephco'
            width={100}
            height={100}
            className=''
          />
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white border-b border-gray-200 p-4 flex justify-between items-center'>
          <button
            onClick={toggleSidebar}
            className='p-2 rounded-md hover:bg-gray-200 transition-colors duration-200'
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <div className='flex items-center space-x-4 gap-4'>
            <button className='p-2 rounded-full hover:bg-gray-100 relative'>
              <BellIcon size={20} />
              <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>
            </button>
            <SignOutButton />
          </div>
        </header>

        {/* Content */}
        <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
          {children}
        </main>
      </div>
    </div>
  );
};

export { MainLayout };
