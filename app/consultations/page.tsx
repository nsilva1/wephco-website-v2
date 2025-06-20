import React from 'react'
import { ContactUs } from '@/components/ContactUs'

const ConsultationsPage = () => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            {/* <p className='text-lg mb-8'>We'd love to hear from you!</p> */}
            <ContactUs contact={false} />
        </div>
    </div>
  )
}

export default ConsultationsPage