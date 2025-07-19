import React from 'react';
import '../../globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang='en'>
      <body>
        <div className='h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900'>
          <div className='bg-white dark:bg-gray-900 p-8 shadow-md w-full max-w-md'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

