import React from 'react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import '../globals.css'

export default function DevelopmentLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
