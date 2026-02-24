import type { Metadata } from 'next';
import '../globals.css';
import { ReloadPrompt } from '@/components/InstallPrompt';
import { AuthProvider } from '@/context/AuthContext';
import { PWAProvider } from '@/context/PwaContext';

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
          <PWAProvider>
            {children}
            <ReloadPrompt />
          </PWAProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
