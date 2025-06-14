import React from 'react'
import '../globals.css'
import { MainLayout } from './(components)/MainLayout'
import { AuthProvider } from '@/lib/auth/SessionProvider'
import { ToastContainer } from 'react-toastify';

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MainLayout>
            {children}
            <ToastContainer />
          </MainLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
