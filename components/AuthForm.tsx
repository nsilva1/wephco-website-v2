'use client';

import { useState } from 'react';
import { registerUser } from '@/actions/register';
import { Role } from '@/interfaces/userInterface';
import { loginUser } from '@/actions/login';
import { Loader } from './Loader';
import { useRouter } from 'next/navigation';

const AuthForm = ({ isLogin, affiliateOnly = false }: { isLogin: boolean, affiliateOnly?: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>(Role.AFFILIATE);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const authCode1 = process.env.auth_code1
  const authCode2 = process.env.auth_code2

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      // Handle login logic here
      try {
        // Check if email and password are provided
      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      await loginUser(email, password);

      // if(result?.error){
      //   setError('Invalid email or password')
      // } else if (result?.ok){
      //   router.push('/dashboard')
      // }
      } catch (error) {
        if(error instanceof Error) {
          setError(error.message);
        }
        return;
      }

    } else {
      // Handle registration logic here
      try {
        // Check if name, email, and password are provided
      if (!name || !email || !password) {
        setError('Name, email, and password are required');
        setLoading(false);
        return;
      }

      const user = { name, email, password, role };

      const code = prompt('Enter the authentication code:');

      if (code !== authCode1 || code !== authCode2) {
        setError('Invalid authentication code');
        setLoading(false);
        return;
      }

      const response = await registerUser(user);

      if (response.error) {
        setError(response.error);
        return;
      }

      setSuccessMessage('Registration successful. Redirecting...')

      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
      } catch (error) {
        if(error instanceof Error) {
          setError(error.message);
        }
        return;
      }
    }
  };

  return (
    <div className='font-outfit'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='max-w-md mx-auto mt-8 space-y-4'
      >
        <fieldset disabled={loading} className='space-y-4'>
          {error && (
            <div className='p-4 text-red-700 bg-red-100 rounded-md text-center'>
              {error}
            </div>
          )}
          {
            successMessage && (
              <div className='p-4 text-green-700 bg-green-100 rounded-md text-center'>
                {successMessage}
              </div>
            )
          }
          {!isLogin && (
            <div>
              <label htmlFor='name' className='block mb-1'>
                Name
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='w-full px-3 py-2 border rounded'
              />
            </div>
          )}
          <div>
            <label htmlFor='email' className='block mb-1'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          <div>
            <label htmlFor='password' className='block mb-1'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-3 py-2 border rounded'
              minLength={6}
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor='role' className='block mb-1'>
                Role
              </label>
              <select
                id='role'
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className='w-full px-3 py-2 border rounded'
              >
                {
                  affiliateOnly ? (
                    <option value={Role.AFFILIATE}>Affiliate</option>
                  ) : (
                    <>
                      <option value={Role.AFFILIATE}>Affiliate</option>
                      <option value={Role.SUPPORT}>Support</option>
                      <option value={Role.ADMIN}>Admin</option>
                    </>
                  )
                }
              </select>
            </div>
          )}
          {loading ? (
            <Loader size='sm' />
          ) : (
            <button
              type='submit'
              className='w-full px-4 py-2 text-white bg-black cursor-pointer dark:bg-primary rounded hover:bg-black/80'
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export { AuthForm };
