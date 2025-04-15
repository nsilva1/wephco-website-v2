import React from 'react'
import Navbar from '@/components/Navbar'
import '../globals.css'

export default function BuyLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
