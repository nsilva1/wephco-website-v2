import React from 'react'
import { Footer } from '@/components/Footer'
import '../globals.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Wephco - Buy, Sell Luxury Homes",
  description: "Your Gateway to Prime Global Real Estate",
};

export default function DevelopmentLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
