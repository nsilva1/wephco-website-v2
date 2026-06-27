import React from 'react';
import '../globals.css';
import { MainLayout } from './(components)/MainLayout';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { Toaster } from '@/components/ui/sonner';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthProvider>
        <MainLayout>
          {children}
          <ToastContainer />
          <Toaster />
        </MainLayout>
      </AuthProvider>
    </div>
  );
}
