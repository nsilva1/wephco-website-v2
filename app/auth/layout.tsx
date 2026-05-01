import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import Image from 'next/image';
import logo from '@/images/logo.png'; 

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-gray-900">
        {/* Left Column - Branding / Image */}
        <div className="hidden md:flex flex-col justify-center items-center bg-slate-900 text-white p-10 relative overflow-hidden">
          {/* Background image for premium feel */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md text-center">
            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-sm mb-8 border border-white/20 shadow-2xl">
              <Image src={logo} alt="Wephco Logo" width={180} height={180} className="drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Welcome to Wephco</h1>
            {/* <p className="text-lg text-slate-200 font-light">
              Manage your real estate portfolio, commissions, and team members from our premium administrative dashboard.
            </p> */}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 relative z-10">
            {/* Mobile Logo */}
            <div className="flex md:hidden justify-center mb-8">
              <div className="bg-slate-900 p-4 rounded-2xl shadow-lg">
                <Image src={logo} alt="Wephco Logo" width={100} height={100} />
              </div>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
