import React from 'react';
import '../../globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang='en'>
      <body>
        <div className='h-screen flex flex-col items-center justify-center bg-gray-50'>
          <div className='bg-white p-8  shadow-md w-full max-w-md'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

