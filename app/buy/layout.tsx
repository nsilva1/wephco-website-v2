import React from 'react';
import Navbar from '@/components/Navbar';
import '../globals.css';
import { Metadata } from 'next';
import { WhatsAppWidget } from '@/components/WhatsappWidget';

export const metadata: Metadata = {
  title: 'Wephco - Buy, Sell Luxury Homes',
  description: 'Your Gateway to Prime Global Real Estate',
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
