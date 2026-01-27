import React from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';
import { Metadata } from 'next';
import { WhatsAppWidget } from '@/components/WhatsappWidget';

export const metadata: Metadata = {
  title: 'Wephco - Buy, Sell Luxury Homes',
  description: 'Your Gateway to Prime Global Real Estate',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
