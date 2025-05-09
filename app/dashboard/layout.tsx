import React from 'react'
import '../globals.css'
import { MainLayout } from './(components)/MainLayout'
import { auth } from '@/lib/auth/auth'
// import { Role } from '@/interfaces/userInterface'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    // Check if the user is authenticated
    // const session = await auth()
    // if (!session) {
    //     // Redirect to the login page if not authenticated
    //     redirect('/login')
    // }
    // Check if the user is an admin
    // if (session?.user.role !== Role.ADMIN) {
    //     // Redirect to the home page if not an admin
    //     redirect('/')
    // }

  return (
    <html lang="en">
      <body>
        <MainLayout>
            {children}
        </MainLayout>
      </body>
    </html>
  )
}
