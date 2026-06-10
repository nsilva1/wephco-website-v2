'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/logo.png';
import { Mail, Lock, Eye, EyeOff, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/helperFunctions';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/Loader';

import { auth } from '@/firebase/firebaseClient';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const router = useRouter();
  const { login, logout } = useAuth();

  const isFormValid = email.trim() && password.trim() && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      const sessionData = await login(email, password);
      const userRole = sessionData?.role;

      if (['SUPPORT', 'ADMIN', 'SUPERADMIN', 'AGENT'].includes(userRole.toUpperCase())) {
        setSuccessMessage('Login successful. Redirecting...');
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
        "Login failed. Please check your email and password."
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address');
      setForgotLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, forgotEmail.trim());
      setForgotSuccess('A password reset email has been sent. Please check your inbox.');
      setForgotEmail('');
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to send password reset email.');
      setForgotError(errorMessage);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-display">
      {/* Background Image with low opacity */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80")' }}
        ></div>
        {/* Dark Overlay for Greenish Tint */}
        <div className="absolute inset-0 mix-blend-multiply"></div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotModal} onOpenChange={(open) => {
        setShowForgotModal(open);
        if (!open) {
          setForgotError('');
          setForgotSuccess('');
          setForgotEmail('');
        }
      }}>
        <DialogContent className="sm:max-w-md bg-background-dark/95 border border-primary/20 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-light">Reset Password</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4 py-4">
            {forgotError && (
              <div role="alert" className="p-3 rounded-md border border-red-900 bg-red-950/40 text-red-200 text-xs">
                {forgotError}
              </div>
            )}
            {forgotSuccess && (
              <div role="status" className="p-3 rounded-md border border-green-900 bg-green-950/40 text-green-200 text-xs">
                {forgotSuccess}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="forgotEmail" className="block text-[10px] uppercase font-bold text-primary tracking-widest">
                Email Address
              </label>
              <input
                id="forgotEmail"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full bg-background-dark/50 border border-primary/20 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="name@wephco.com"
                required
                disabled={forgotLoading}
              />
            </div>
            <DialogFooter className="flex gap-2 justify-end pt-4">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 border border-primary/20 rounded text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/5 transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={forgotLoading || !forgotEmail.trim()}
                className="px-4 py-2 bg-primary hover:bg-white text-background-dark rounded text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
              >
                {forgotLoading ? <Loader size="sm" /> : 'Send Reset Link'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md px-6 py-12 mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4 text-primary flex items-center gap-2">
            <Image src={logo} alt="Wephco Logo" width={80} height={40} className="brightness-110" />
          </Link>
          <h1 className="text-2xl font-bold tracking-widest text-slate-100 mb-1 uppercase">WEPHCO</h1>
        </div>

        <div className="bg-background-dark/50 backdrop-blur-xl border border-primary/15 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-100">Welcome Back</h2>
            <p className="text-slate-400 text-xs mt-1">Please enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50">
                  <Mail size={16} />
                </span>
                <input 
                  className="w-full bg-background-dark/70 border border-primary/20 rounded-lg py-3 pl-10 pr-4 text-slate-100 text-sm placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                  placeholder="name@wephco.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Password</label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotModal(true)} 
                  className="text-primary text-[10px] uppercase font-bold hover:underline transition-all cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50">
                  <Lock size={16} />
                </span>
                <input 
                  className="w-full bg-background-dark/70 border border-primary/20 rounded-lg py-3 pl-10 pr-12 text-slate-100 text-sm placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                  placeholder="••••••••" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-primary hover:bg-white text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98] mt-4 uppercase tracking-wider text-xs cursor-pointer flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader size="sm" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6">
            <p className="text-slate-400 text-xs">
              New to Wephco? 
              <Link className="text-primary font-bold hover:text-primary/80 transition-colors ml-1 uppercase text-[10px] tracking-wider" href="/auth/register">
                Register New Account
              </Link>
            </p>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-slate-500 text-[9px] uppercase tracking-[0.2em] font-bold">
          <Link className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
          <Link className="hover:text-primary transition-colors" href="#">Support</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


