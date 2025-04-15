import React from 'react'
import Navbar from '@/components/Navbar'
import '../globals.css'

export default function AgentLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
