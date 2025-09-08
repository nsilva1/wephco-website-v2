import React from 'react';
import { Footer } from '@/components/Footer';
import '../globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | WEPHCO',
  description:
    'These Terms of Service govern your access to and use of the website located at www.wephco.com.',
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
