import React from 'react'
import { AuthForm } from '@/components/AuthForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <AuthForm isLogin={true} />
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  )
}

export default LoginPage