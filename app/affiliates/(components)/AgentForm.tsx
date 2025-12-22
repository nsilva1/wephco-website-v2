'use client';

import { useState, ChangeEvent } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import agentRegistration from '@/images/agent-registration.jpg';
import Image from 'next/image';
import { registerAffiliate } from '@/actions/affiliates';
import { Loader } from '@/components/Loader';
import { IAffiliate } from '@/interfaces/userInterface';
import { toast } from 'react-toastify';

interface INewAgent extends ComponentPropsWithoutRef<'div'> {}

const AgentForm = ({ ...rest }: INewAgent) => {
  const [formData, setFormData] = useState<
    Omit<IAffiliate, 'id' | 'createdAt'>
  >({
    name: '',
    email: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState('');

  type inputTypes = keyof IAffiliate;

  const handleChange =
    (input: inputTypes) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [input]: event.target.value });
    };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      location: '',
    });
    setInterest('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerAffiliate(formData);

      clearForm();
      toast.success('Registration successful! We will get back to you soon.');
    } catch (error) {
      toast.error('Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      {...rest}
      className="flex flex-col items-center justify-center p-4 lg:p-20 font-outfit">
      <h2 className="mb-10 text-2xl font-semibold">Affiliate Registration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="col-span-1 hidden md:flex">
          <div>
            <Image
              src={agentRegistration}
              alt="Agent Registration"
              className="rounded-4xl"
            />
          </div>
        </div>
        <div className="col-span-1 place-items-center">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl p-8 min-w-sm md:min-w-lg">
            <fieldset className="space-y-8">
              <div>
                <label className="block mb-4">Name</label>
                <input
                  required
                  className="border border-gray-300 rounded-md p-1 w-full"
                  value={formData.name}
                  onChange={handleChange('name')}
                />
              </div>
              <div>
                <label className="block mb-4">Email</label>
                <input
                  required
                  className="border border-gray-300 rounded-md p-1 w-full"
                  value={formData.email}
                  onChange={handleChange('email')}
                />
              </div>
              <div>
                <label className="block mb-4">Location</label>
                <input
                  required
                  className="border border-gray-300 rounded-md p-1 w-full"
                  value={formData.location}
                  onChange={handleChange('location')}
                />
              </div>
              <div>
                <label className="block mb-4">
                  What interests you in Wephco?
                </label>
                <textarea
                  className="border border-gray-300 rounded-md p-1 w-full"
                  rows={3}
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}></textarea>
              </div>
              {loading ? (
                <Loader size="sm" />
              ) : (
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-black cursor-pointer dark:bg-wephco rounded hover:bg-black/80">
                  Register
                </button>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AgentForm };
