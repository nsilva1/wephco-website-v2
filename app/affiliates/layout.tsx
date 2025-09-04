import React from 'react'
import Navbar from '@/components/Navbar'
import '../globals.css'
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Wephco - Buy, Sell Luxury Homes",
  description: "Your Gateway to Prime Global Real Estate",
};

export default function AgentLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
