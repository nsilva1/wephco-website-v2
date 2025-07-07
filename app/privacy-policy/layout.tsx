import React from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | WEPHCO',
  description: 'This Privacy Policy explains how WEPHCO collects, uses, discloses, and protects your personal information when you visit our website.',
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
