'use client';

import { ComponentPropsWithoutRef, useState, useCallback } from 'react';

type FormData = {
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
  const [formData, setFormData] = useState<FormData>({
    address: '',
    name: '',
    email: '',
    phone: '',
    timeline: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const resetAndRefresh = useCallback(() => {
    setStep(1);
    setFormData({
      address: '',
      name: '',
      email: '',
      phone: '',
      timeline: '',
    })
    window.location.reload()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would make an API call here
    console.log('Form submitted:', formData);

    // Mock API call
    try {
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      alert('Form submitted successfully!');
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
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
                      className='p-2 rounded-l-md text-black flex-grow focus:outline-none font-bold'
                      placeholder='Enter your property address...'
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
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
                <div className='space-y-4 bg-white p-4 rounded-2xl min-w-lg'>
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
                      className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Get An Estimate
                    </button>
                  </div>
                </div>
              )}

              {
                step === 3 && (
                    <div className='space-y-8 bg-white text-black p-8 rounded-2xl min-w-lg'>
                        <h3 className='font-bold text-3xl'>Your Estimate Is On The Way</h3>
                        <p className='text-sm md:text-base'>Thank You! We are going to prepare a customized report with information on the value of your property.</p>
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
