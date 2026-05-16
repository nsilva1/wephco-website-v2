import type { Metadata } from 'next';
import '../globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: "Wephco Brokerage App - Your Gateway to Global Real Estate",
  manifest: "/manifest.json",
}

export default function BrokerageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
