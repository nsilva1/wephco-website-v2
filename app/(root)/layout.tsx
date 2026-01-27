import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
// import Script from 'next/script';
import { WhatsAppWidget } from '@/components/WhatsappWidget';
import '../globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wephco - Buy, Sell Luxury Homes',
  description: 'Your Gateway to Prime Global Real Estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <ToastContainer />
        <Navbar />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
