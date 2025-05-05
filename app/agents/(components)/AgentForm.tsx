'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import agentRegistration from '@/images/agent-registration.jpg';
import Image from 'next/image';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: 'Abuja' | 'Dubai' | '';
};

interface INewAgent extends ComponentPropsWithoutRef<'div'> {}

const AgentForm = ({ ...rest }: INewAgent) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
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
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div {...rest} className='flex items-center justify-center p-4 lg:p-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-24'>
        <div className='col-span-1 hidden md:flex'>
          <div>
            <Image
              src={agentRegistration}
              alt='Agent Registration'
              className='rounded-4xl'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='bg-white p-8 rounded-lg shadow-md w-full md:max-w-lg'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>
              Agent Registration Form
            </h1>

            {/* Progress indicator */}
            <div className='flex mb-6'>
              <div
                className={`flex-1 border-t-2 pt-1 ${
                  step >= 1 ? 'border-primary' : 'border-gray-300'
                }`}
              >
                <p
                  className={`text-sm ${
                    step >= 1 ? 'text-primary font-medium' : 'text-gray-500'
                  }`}
                >
                  Personal Information
                </p>
              </div>
              <div
                className={`flex-1 border-t-2 pt-1 ${
                  step >= 2 ? 'border-primary' : 'border-gray-300'
                }`}
              >
                <p
                  className={`text-sm ${
                    step >= 2 ? 'text-primary font-medium' : 'text-gray-500'
                  }`}
                >
                  Contact Information
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className='space-y-4'>
                  {/* <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2> */}

                  <div>
                    <label
                      htmlFor='firstName'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      First Name
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black'
                    />
                  </div>

                  <div className='flex justify-end'>
                    <button
                      type='button'
                      onClick={handleNext}
                      disabled={
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.email
                      }
                      className='px-4 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className='space-y-4'>
                  {/* <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2> */}

                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='location'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Location
                    </label>
                    <select
                      id='location'
                      name='location'
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black'
                    >
                      <option value=''>Select a location</option>
                      <option value='Abuja'>Abuja</option>
                      <option value='Dubai'>Dubai</option>
                    </select>
                  </div>

                  <div className='flex justify-between'>
                    <button
                      type='button'
                      onClick={handleBack}
                      className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      disabled={!formData.phone || !formData.location}
                      className='px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AgentForm };
