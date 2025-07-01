'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import agentRegistration from '@/images/agent-registration.jpg';
import Image from 'next/image';
import { Role } from '@/interfaces/userInterface';
import { AuthForm } from '@/components/AuthForm';

type AgentFormData = {
  name: string;
  password: string;
  email: string;
  role: Role;
};

interface INewAgent extends ComponentPropsWithoutRef<'div'> {}

const AgentForm = ({ ...rest }: INewAgent) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    password: '',
    email: '',
    role: Role.AGENT
  });
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    formData.append('status', 'false')

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
      handleNext(); // Move to the next step after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div {...rest} className='flex flex-col items-center justify-center p-4 lg:p-20 font-outfit'>
      <h2 className='mb-10 text-2xl font-semibold'>Agent Registration</h2>
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
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};

export { AgentForm };
