'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getErrorMessage, checkAuthenticationCode } from '@/lib/helperFunctions';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/Loader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAuthCodeModal, setShowAuthCodeModal] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');

  const router = useRouter();
  const { signup, logout } = useAuth();

  const isFormValid = name.trim() && email.trim() && password.trim() && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Name, email, and password are required');
      setLoading(false);
      return;
    }
    
    // Open authentication code dialog before registration
    setShowAuthCodeModal(true);
    setLoading(false);
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

      if (['SUPPORT', 'ADMIN', 'SUPERADMIN', 'AGENT'].includes(userRole.toUpperCase())) {
        setSuccessMessage('Registration successful. Redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      } else {
        setError('403 Forbidden: You do not have access to the dashboard.');
        await logout();
      }
    } catch (err) {
      const errorMessage = getErrorMessage(
        err,
        "Registration failed. Please verify your details and try again."
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-display">
      {/* Background Image with low opacity */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80")' }}
        ></div>
        {/* Dark Overlay for Greenish Tint */}
        <div className="absolute inset-0 mix-blend-multiply"></div>
      </div>

      {/* Dialog for Authentication Code */}
      <Dialog open={showAuthCodeModal} onOpenChange={setShowAuthCodeModal}>
        <DialogContent className="sm:max-w-md bg-background-dark/95 border border-primary/20 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-light">Authentication Code</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Please enter the authentication code to complete your registration.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            {authCodeError && (
              <div className="p-3 rounded-md border border-red-900 bg-red-950/40 text-red-200 text-xs">
                {authCodeError}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="authCode" className="block text-[10px] uppercase font-bold text-primary tracking-widest">
                Code
              </label>
              <input
                id="authCode"
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="w-full bg-background-dark/50 border border-primary/20 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Enter auth code"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAuthCodeModal(false)}
              className="px-4 py-2 border border-primary/20 rounded text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRegisterWithCode}
              disabled={!authCode.trim() || loading}
              className="px-4 py-2 bg-primary hover:bg-white text-background-dark rounded text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader size="sm" /> : 'Verify & Register'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-20 lg:px-40">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <Image src={logo} alt="Wephco Logo" width={80} height={40} className="brightness-110" />
          <h2 className="text-slate-100 text-lg font-extrabold tracking-tight uppercase hidden sm:block">WEPHCO</h2>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-slate-400 text-xs">Already have an account?</span>
          <Link href="/auth/login" className="flex items-center justify-center rounded-lg h-10 px-6 border border-primary/50 text-primary text-xs font-bold hover:bg-primary/10 transition-colors uppercase tracking-wider">
            Login
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[500px] bg-background-dark/50 backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-10 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-400 text-xs">Enter the world of exclusive high-end real estate.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div role="alert" className="p-3 rounded-md border border-red-900 bg-red-950/40 text-red-200 text-xs">
                {error}
              </div>
            )}
            {successMessage && (
              <div role="status" className="p-3 rounded-md border border-green-900 bg-green-950/40 text-green-200 text-xs">
                {successMessage}
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User size={16} />
                </span>
                <input 
                  className="w-full pl-12 pr-4 h-12 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                  placeholder="Johnathan Doe" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={16} />
                </span>
                <input 
                  className="w-full pl-12 pr-4 h-12 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                  placeholder="email@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={16} />
                </span>
                <input 
                  className="w-full pl-12 pr-12 h-12 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                  placeholder="••••••••" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full h-12 bg-primary text-background-dark font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader size="sm" /> : 'Create Account'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] font-bold">© {new Date().getFullYear()} Wephco. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;

