'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IProperty, IPropertyEnquiry } from '@/interfaces/propertyInterface';
import { createPropertyEnquiryRequest } from '@/actions/propertyEnquiry';
import { Loader } from './Loader';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

export interface PropertyCardProps extends IProperty {
  showModal?: () => void;
  openModal: boolean;
}

const PropertyCard = ({ showModal, openModal, ...props }: PropertyCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGetPdf = async () => {

    const propertyData: IPropertyEnquiry = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      propertyId: props.id!,
    }

    try {
      setLoading(true)
      await createPropertyEnquiryRequest(propertyData)
      setFormData({ name: '', email: '', phone: '' });
      setFlipped(false);
      window.open(props.pdfUrl, '_blank');
    } catch (error) {
      toast.error('Failed loading PDF. Please try again.')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className='[perspective:1000px] w-96 h-[400px]'
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* --- FRONT SIDE --- */}
        <div className='absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-gray-700 font-outfit rounded-xl shadow-lg overflow-hidden flex flex-col gap-2'>
          <div className='relative w-full h-52 rounded-t-xl cursor-pointer'>
            <Image
              src={props.images[0]}
              alt='Property'
              fill
              style={{ objectFit: 'cover' }}
              className={`rounded-t-xl ${openModal ? '-z-10' : ''}`}
            />
          </div>
          <div className='p-4 flex flex-col gap-2'>
            <p className='text-base font-medium font-sans'>{props.name}</p>
            <p className='text-sm font-light line-clamp-2'>{props.description}</p>
            <p className='font-mono font-bold'>
              {props.city}, {props.country}
            </p>
            <button
              onClick={() => setFlipped(true)}
              className='bg-wephco text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-black transition-colors duration-300 cursor-pointer'
            >
              Get PDF
            </button>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className='absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white dark:bg-gray-700 font-outfit rounded-xl shadow-lg overflow-hidden flex flex-col gap-4 justify-center p-6'>
          <button className='flex cursor-pointer' onClick={() => setFlipped(false)}>
            <ArrowLeft />
            Back
          </button>
          <p>Fill the form to view the PDF</p>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Your Name'
            className='mb-2 p-2 border rounded w-full'
            required
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Your Email'
            className='mb-2 p-2 border rounded w-full'
            required
          />
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Your Phone Number'
            className='mb-4 p-2 border rounded w-full'
            required
          />
          <button
            onClick={handleGetPdf}
            className='bg-wephco text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-black transition-colors duration-300 cursor-pointer'
          >
            {
              loading ? <Loader /> : 'View PDF'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export { PropertyCard };
