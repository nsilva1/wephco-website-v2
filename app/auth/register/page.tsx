import React from 'react'
import { AuthForm } from '@/components/AuthForm'

const RegisterPage = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <AuthForm isLogin={false} />
    </div>
  )
}

export default RegisterPage