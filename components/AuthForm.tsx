'use client';

import { useState } from 'react';
import { Loader } from './Loader';
import { useRouter } from 'next/navigation';
import { checkAuthenticationCode } from '@/lib/helperFunctions';
import { EyeClosed, Eye } from 'lucide-react';
import { getErrorMessage } from '@/lib/helperFunctions';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';


const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAuthCodeModal, setShowAuthCodeModal] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');

  const router = useRouter()
  const { login, signup, logout } = useAuth();

  const validate = (val: string | undefined) => !!val?.trim();

  const isFormValid = isLogin
  ? validate(email) && validate(password)
  : validate(name) && validate(email) && validate(password);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      try {
        if (!email || !password) {
          setError('Email and password are required');
          setLoading(false);
          return;
        }

        const sessionData = await login(email, password);
        const userRole = sessionData?.role;

        if (['SUPPORT', 'ADMIN', 'SUPERADMIN'].includes(userRole.toUpperCase())) {
          setSuccessMessage('Login successful. Redirecting...');
          router.push('/dashboard');
        } else {
          setError('403 Forbidden: You do not have access to the dashboard.');
          await logout();
        }
      } catch (error) {
        const errorMessage = getErrorMessage(
          error,
          "Login failed. Please check your email and password."
        )
        setError(errorMessage);
        return;
      } finally {
        setLoading(false);
      }

    } else {
      if (!name || !email || !password) {
        setError('Name, email, and password are required');
        setLoading(false);
        return;
      }
      setShowAuthCodeModal(true);
      setLoading(false);
    }
  };

  const handleRegisterWithCode = async () => {
    setAuthCodeError('');
    setLoading(true);

    const isValidCode = checkAuthenticationCode(authCode.toLowerCase());

    if (!isValidCode) {
      setAuthCodeError('Invalid authentication code');
      setLoading(false);
      return;
    }

    setShowAuthCodeModal(false);

    try {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      const fullName = `${firstName} ${lastName}`;

      const sessionData = await signup(email, password, fullName);
      const userRole = sessionData?.role;

      if (['SUPPORT', 'ADMIN', 'SUPERADMIN'].includes(userRole.toUpperCase())) {
        setSuccessMessage('Registration successful. Redirecting...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError('403 Forbidden: You do not have access to the dashboard.');
        await logout();
      }
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "Registration failed. Please verify your details and try again."
      )
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={``}>
      <Dialog open={showAuthCodeModal} onOpenChange={setShowAuthCodeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Code</DialogTitle>
            <DialogDescription>
              Please enter the authentication code to complete your registration.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            {authCodeError && (
              <div className="p-3 rounded-md border border-red-300 bg-red-50 text-red-800 text-sm">
                {authCodeError}
              </div>
            )}
            <div>
              <label htmlFor="authCode" className="block mb-1 text-sm font-medium">
                Code
              </label>
              <input
                id="authCode"
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="Enter code"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setShowAuthCodeModal(false)}
              className="px-4 py-2 border rounded text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRegisterWithCode}
              disabled={!authCode.trim() || loading}
              className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 disabled:opacity-50"
            >
              {loading ? <Loader size="sm" /> : 'Verify & Register'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='max-w-md mx-auto mt-8 space-y-4'
      >
        <fieldset disabled={loading} className='space-y-4'>
          {error && (
            <div
  role="alert"
  className="p-4 rounded-md border border-red-300 bg-red-50 text-red-800"
>
  <p className="font-semibold mb-1">There was a problem</p>
  <p className="text-sm">{error}</p>
</div>

          )}
          {
            successMessage && (
              <div
  role="status"
  className="p-4 rounded-md border border-green-300 bg-green-50 text-green-800"
>
  <p className="font-semibold mb-1">Success</p>
  <p className="text-sm">{successMessage}</p>
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
          <div className=''>
            <label htmlFor='password' className='block mb-1'>
              Password
            </label>
            <div className='relative'>
              <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-3 py-2 pr-10 border rounded'
              minLength={6}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white cursor-pointer'
              tabIndex={-1}
            >
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>     
            </div>      
          </div>
          {loading ? (
            <Loader size='sm' />
          ) : (
            <button
              type='submit'
              disabled={!isFormValid || loading}
              className='w-full px-4 py-2 text-white bg-black cursor-pointer dark:bg-wephco rounded hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed'
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
