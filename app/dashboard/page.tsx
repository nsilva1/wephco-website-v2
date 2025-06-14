import React from 'react'
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'
import { toast } from 'react-toastify';

const page = async () => {
  const session: Session | null = await auth()

  if (!session) {
    toast.error('You are not authenticated. Please log in to access the dashboard.')
    redirect('/auth/login')
  }

  return (
    <div className='flex justify-center'>
        <h3 className='text-4xl font-semibold'>Dashboard Home</h3>
    </div>
  )
}

export default page