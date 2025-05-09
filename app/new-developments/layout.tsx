import React from 'react'
import { Footer } from '@/components/Footer'
import '../globals.css'

export default function DevelopmentLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
