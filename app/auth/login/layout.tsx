import React from 'react';
import { ToastContainer } from 'react-toastify';
import '../../globals.css';
import { Metadata } from 'next';

// Metadata for the login page
export const metadata: Metadata = {
  title: "Wephco - Login",
  description: "Login to your Wephco account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang='en'>
      <body>
        <ToastContainer />
        <div className='h-screen flex flex-col items-center justify-center bg-gray-50'>
          <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};


