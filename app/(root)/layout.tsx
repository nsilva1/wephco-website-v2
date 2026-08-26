import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
// import Script from 'next/script';
import ChatWidget from '@/components/ChatWidget';
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
      <ChatWidget />
      <Footer />
    </>
  );
}
