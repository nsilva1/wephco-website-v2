'use client';

import { ComponentPropsWithoutRef, useState, useCallback, useRef } from 'react';
// import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { createEnquiry } from '@/actions/sellEnquiry';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ISellEnquiry } from '@/interfaces/propertyInterface';


type InterestFormData = {
  address: string;
  name: string;
  email: string;
  phone: string;
  timeline:
    | 'I want to sell my property now'
    | 'In the next 3 months'
    | 'In the next 12 months'
    | "I'm just curious..."
    | '';
};

interface INewInterest extends ComponentPropsWithoutRef<'div'> {}

const InterestForm = ({ ...rest }: INewInterest) => {
  

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<InterestFormData>({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeline: '',
  });

  
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);



  
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  },[])

  const handleNext = useCallback(() => {
    setStep((prev) => prev + 1);
 }, [formData.address,]);

 const handleBack = useCallback(() => {
  setStep((prev) => prev - 1);
}, []); // Empty dependency array

const resetAndRefresh = useCallback(() => {
  setStep(1);
  setFormData({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeline: '',
  });
  
  if (inputRef.current) {
      inputRef.current.value = ''; // Clear input field
  }

}, []); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create form data object
    const propertyData: Omit<ISellEnquiry, 'id' | 'createdAt'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      timeline: formData.timeline,
      status: false,
    }
    

    setLoading(true);

    // API call
    try {
      const response = await createEnquiry(propertyData);

      if(response){
        toast.success('Form submitted successfully! We will contact you shortly')
      }
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div {...rest} className='flex items-center justify-center p-4'>
      <div className=''>
        <div className=''>
          <div className=''>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className=''>
                  <div className='bg-white flex items-center rounded-full gap-4 p-3'>
                    
                    <input
                      type='text'
                      ref={inputRef}
                      className='p-2 rounded-l-md text-black flex-grow focus:outline-none font-bold'
                      placeholder='Enter your property address...'
                      name='address'
                      onChange={handleChange}
                      value={formData.address}
                    />
                    
                    <button
                      type='button'
                      onClick={handleNext}
                      disabled={!formData.address}
                      className='bg-black text-white py-2 px-3 rounded-full cursor-pointer'
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className='space-y-4 bg-white p-8 rounded-2xl min-w-lg'>
                  <div>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder='Your Name'
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    />
                  </div>

                  <div>
                    
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='Your Email'
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    />
                  </div>

                  <div>
                    
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder='Your phone number'
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    />
                  </div>

                  <div>
                    
                    <select
                      id='timeline'
                      name='timeline'
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border text-black font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
                    >
                      <option value=''>Select a timeline</option>
                      <option value='I want to sell my property now'>
                        I want to sell my property now
                      </option>
                      <option value='In the next 3 months'>
                        In the next 3 months
                      </option>
                      <option value='In the next 12 months'>
                        In the next 12 months
                      </option>
                      <option value="I'm just curious...">
                        I'm just curious...
                      </option>
                    </select>
                  </div>

                  <div className='flex justify-between'>
                    <button
                      type='button'
                      onClick={handleBack}
                      className='px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      disabled={
                        !formData.phone ||
                        !formData.timeline ||
                        !formData.email ||
                        !formData.name
                      }
                      className={`px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                  <p className='text-sm text-black font-bold'>
                    By clicking "Submit", you agree to our service charge deposit of 1% of the total value of the property.
                  </p>
                </div>
              )}

              {
                step === 3 && (
                    <div className='space-y-8 bg-white text-black p-8 rounded-2xl min-w-lg'>
                        <h3 className='font-bold text-3xl'>Thank You For Trusting Us</h3>
                        <p className='text-sm md:text-base'>We will reach out to you for further details.</p>
                        <button onClick={resetAndRefresh} className='bg-black text-white py-2 px-3 rounded-full cursor-pointer'>Get in Touch</button>
                    </div>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InterestForm };
