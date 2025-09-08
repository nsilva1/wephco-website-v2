import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import Script from 'next/script';
import './globals.css';

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
        {/* Inline Zoho setup script */}
        <Script
          id="zoho-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$zoho = window.$zoho || {};
              $zoho.salesiq = $zoho.salesiq || {
                ready: function() {}
              };
            `,
          }}
        />

        {/* Zoho widget loader script */}
        <Script
          id="zoho-script"
          src="https://salesiq.zohopublic.com/widget?wc=siqec03d4022833d9de76f733b7ff7454d795217e06a438641d6f7172e1dd13841b"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
