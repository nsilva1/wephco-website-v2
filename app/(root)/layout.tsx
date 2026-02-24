import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
// import Script from 'next/script';
import { WhatsAppWidget } from '@/components/WhatsappWidget';
import '../globals.css';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ToastContainer />
      <Navbar />
      {children}
      <WhatsAppWidget />
      <Footer />
    </>      
  );
}
