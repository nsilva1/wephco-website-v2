import React from 'react';
import { AuthForm } from '@/components/AuthForm';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create an Account</h1>
        <p className="text-slate-500 dark:text-slate-400">Join us to manage your real estate business</p>
      </div>

      <AuthForm isLogin={false} />
      
      <div className="mt-8 text-center border-t border-gray-100 dark:border-slate-700 pt-6">
        <p className="text-slate-600 dark:text-slate-300">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
