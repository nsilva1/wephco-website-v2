import React from 'react'
import { typography, layout } from '@/lib/styles'

const page = () => {
  return (
    <div className={`${layout.section} h-screen flex items-center justify-center`}>
        <h1 className={`${typography.heading1} text-center`}>
            Coming Soon...
        </h1>
    </div>
  )
}

export default page