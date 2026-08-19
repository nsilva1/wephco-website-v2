import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S4KJ9R4BVF"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S4KJ9R4BVF');
          `}
        </Script>
        <Script
          src="https://t.contentsquare.net/uxa/65358b2c8c4e3.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
