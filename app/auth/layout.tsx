import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background-dark text-slate-100 font-display">
        {children}
      </div>
    </AuthProvider>
  );
}

