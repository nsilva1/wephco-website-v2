'use client';

import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { createContactRequest } from '@/actions/contact';
import { IContactUs } from '@/interfaces/userInterface';

const ContactUs = () => {
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !phoneNumber) {
      toast.warning('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const contactUsData: Omit<IContactUs, 'message'> = {
      name,
      email,
      phoneNumber,
      status: false,
    };

    try {
      await createContactRequest(contactUsData as IContactUs);
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  return (
    <div className='bg-background-dark py-24 px-6 border-t border-primary/10 font-display z-10'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16'>
        <div className='flex flex-col gap-8 max-w-xl'>
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
              Get In Touch
            </span>
            <h3 className="text-4xl font-light text-white leading-tight">
              Let's Discuss Your <span className="font-extrabold text-primary">Next Move</span>
            </h3>
            <div className="h-1 w-20 bg-primary mt-6"></div>
          </div>
          
          <p className="text-slate-300 font-light leading-relaxed">
            Reach out to our private advisory team for bespoke asset guidance and generational estate planning.
          </p>

          <div className='space-y-6 mt-4'>
            <div className='flex gap-5 items-center p-3 rounded-lg hover:bg-secondary/20 transition-all duration-300'>
              <div className='bg-primary/10 border border-primary/30 rounded-lg p-3.5 text-primary'>
                <FaWhatsapp className='text-xl' />
              </div>
              <div>
                <p className='text-xs font-bold tracking-wider uppercase text-slate-400'>WhatsApp</p>
                <a
                  href='https://wa.me/2349161246300'
                  target='_blank'
                  className='text-sm font-medium text-white hover:text-primary transition-colors'
                >
                  Message Concierge
                </a>
              </div>
            </div>

            <div className='flex gap-5 items-center p-3 rounded-lg hover:bg-secondary/20 transition-all duration-300'>
              <div className='bg-primary/10 border border-primary/30 rounded-lg p-3.5 text-primary'>
                <FaPhone className='text-xl' />
              </div>
              <div>
                <p className='text-xs font-bold tracking-wider uppercase text-slate-400'>Phone Inquiry</p>
                <a href='tel:+2349161246300' className='text-sm font-medium text-white hover:text-primary transition-colors'>
                  +234 916 124 6300
                </a>
              </div>
            </div>

            <div className='flex gap-5 items-center p-3 rounded-lg hover:bg-secondary/20 transition-all duration-300'>
              <div className='bg-primary/10 border border-primary/30 rounded-lg p-3.5 text-primary'>
                <FaEnvelope className='text-xl' />
              </div>
              <div>
                <p className='text-xs font-bold tracking-wider uppercase text-slate-400'>Secure Email</p>
                <a
                  href='mailto:contact@wephco.com'
                  className='text-sm font-medium text-white hover:text-primary transition-colors'
                >
                  contact@wephco.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full max-w-lg'>
          <div className='bg-secondary/20 p-8 md:p-12 rounded-2xl border border-primary/10 shadow-xl shadow-black/25'>
            <h4 className='text-white text-xl font-light mb-6'>
              Send Secure Inquiry
            </h4>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-primary tracking-widest">Full Name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setFullName(e.target.value)}
                  className='w-full bg-background-dark/50 border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none'
                  placeholder='Your Name'
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-primary tracking-widest">Email Address</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full bg-background-dark/50 border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none'
                  placeholder='Your Email'
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-primary tracking-widest">Phone Number</label>
                <input
                  type='tel'
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full bg-background-dark/50 border border-primary/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none mb-2'
                  placeholder='Phone Number'
                  required
                  disabled={loading}
                />
              </div>
              <button
                className={`w-full bg-primary hover:bg-white text-background-dark font-bold py-4 rounded-lg tracking-[0.2em] uppercase transition-all duration-300 ease-in-out cursor-pointer ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type='submit'
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ContactUs };

