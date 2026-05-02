'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { dashboardMenu } from '@/lib/constants';
import { Tooltip } from '@/components/Tooltip';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Settings,
  Building
} from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { SignOutButton } from '@/components/SignOutButton';
import { useAuth } from '@/context/AuthContext';
import { getInitials } from '@/lib/helperFunctions';
import logo from '@/images/logo.png';
import { PrivateRoute } from '@/components/PrivateRoute';
import { useRouter } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, role } = useAuth();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <PrivateRoute>
      <div className="flex h-screen bg-[#f8f9fa] text-slate-800 font-sans">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-[#fdfcfb] border-r border-gray-100 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}>
        
        {/* Logo Area */}
        <div className="p-3 flex items-center justify-center">
          {isCollapsed ? (
             <div className="flex items-center justify-center">
               <Image src={logo} alt="Logo" width={50} height={50} />
             </div>
          ) : (
            <div className="flex items-center gap-3 w-full">
              <div className="flex items-center justify-center">
                <Image src={logo} alt="Logo" width={50} height={50} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wider text-slate-900 leading-none">WEPHCO</span>
                <span className="text-[10px] text-[#cfb53b] font-semibold tracking-widest mt-1">ADMIN PANEL</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {dashboardMenu.map((item) => {
              const isActive = pathname === item.path || (pathname?.startsWith(item.path) && item.path !== '/dashboard');
              return (
                <li key={item.label} className="w-full">
                  <Link href={item.path} className="w-full block">
                    <div className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#fef9e8] text-[#cfb53b] font-medium' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    } ${isCollapsed ? 'justify-center' : ''}`}>
                      {isCollapsed ? (
                        <Tooltip text={item.label} position="right">
                          <item.icon className="text-xl" />
                        </Tooltip>
                      ) : (
                        <div className="flex items-center gap-4 w-full">
                           <item.icon className={`text-xl ${isActive ? 'text-[#cfb53b]' : 'text-gray-400'}`} />
                           <span className="text-sm">{item.label}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#f8f9fa] py-4 px-8 flex justify-between items-center z-10">
           <div className="flex items-center gap-4 flex-1">
             <button
               onClick={toggleSidebar}
               className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500">
               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
             </button>
           </div>

           {/* Header Right */}
           <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
               <NotificationBell />
               <Link href={'/dashboard/settings'} className="p-2.5 bg-white rounded-full cursor-pointer shadow-sm hover:bg-gray-200 transition-colors text-gray-600">
                 <Settings size={18} />
               </Link>
             </div>
             
             <div className="h-8 w-px bg-gray-200"></div>
             
             <div className="flex items-center gap-3 cursor-pointer">
               <div className="text-right hidden md:block">
                 <p className="text-sm font-semibold text-slate-800">{currentUser?.displayName}</p>
                 <p className="text-[10px] text-[#cfb53b] font-bold uppercase">{role}</p>
               </div>
               <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-slate-600 font-semibold border-2 border-white">
                 {currentUser?.photoURL ? (
                   <Image src={currentUser.photoURL} alt="User avatar" width={40} height={40} className="object-cover" />
                 ) : (
                   getInitials(currentUser?.displayName!)
                 )}
               </div>
             </div>
             
             <div className="h-8 w-px bg-gray-200"></div>
             <SignOutButton />
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 pt-4">
          {children}
        </main>
      </div>
    </div>
    </PrivateRoute>
  );
};

export { MainLayout };
