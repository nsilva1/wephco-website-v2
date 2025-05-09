'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

/**
 * 
 * @returns SignOutButton component
 * @description A button that allows the user to sign out of their account. It uses the NextAuth.js signOut function to handle the sign-out process.
 * @example
 * <SignOutButton />
 */
const SignOutButton = () => {
  return (
    <button onClick={() => signOut({redirectTo: '/'})} className='px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200'>
        Sign Out
    </button>
  )
}

export { SignOutButton }