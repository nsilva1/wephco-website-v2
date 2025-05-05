import React from 'react'
import { AuthForm } from '@/components/AuthForm'

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <AuthForm isLogin={true} />
    </div>
  )
}

export default LoginPage