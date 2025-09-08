import React from 'react';
import { AuthForm } from '@/components/AuthForm';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <AuthForm isLogin={false} />
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
