'use client'

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * 
 * @returns SignOutButton component
 * @description A button that allows the user to sign out of their account.
 * @example
 * <SignOutButton />
 */
const SignOutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  return (
    <button onClick={handleSignOut} className='px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 cursor-pointer'>
        Sign Out
    </button>
  )
}

export { SignOutButton }