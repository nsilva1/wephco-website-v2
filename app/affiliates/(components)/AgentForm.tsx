'use client';

import { ComponentPropsWithoutRef } from 'react';
import agentRegistration from '@/images/agent-registration.jpg';
import Image from 'next/image';
// import { Role } from '@/interfaces/userInterface';
import { AuthForm } from '@/components/AuthForm';

interface INewAgent extends ComponentPropsWithoutRef<'div'> {}

const AgentForm = ({ ...rest }: INewAgent) => {

  return (
    <div {...rest} className='flex flex-col items-center justify-center p-4 lg:p-20 font-outfit'>
      <h2 className='mb-10 text-2xl font-semibold'>Affiliate Registration</h2>
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
          <AuthForm isLogin={false} affiliateOnly={true} />
        </div>
      </div>
    </div>
  );
};

export { AgentForm };
