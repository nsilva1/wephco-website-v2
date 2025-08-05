'use client';

import React, { useState, FormEvent } from 'react';
import { Phone } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
import { Loader } from '@/components/Loader';
import { toast } from 'react-toastify';
import { createConsultation } from '@/actions/consultation';
import { IConsultation } from '@/interfaces/userInterface';

const ConsultationsPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IConsultation>({
    service: '',
    meetingDate: new Date(),
    meetingLocation: '',
    phoneNumber: '',
    email: '',
    organizationName: '',
    name: '',
    preferredModeOfContact: '',
    details: '',
    status: false,
  });

  // clear form data
  const clearForm = () => {
    setFormData({
      service: '',
      meetingDate: new Date(),
      meetingLocation: '',
      phoneNumber: '',
      email: '',
      organizationName: '',
      name: '',
      details: '',
      preferredModeOfContact: '',
      status: false,
    });
  };

  // handle form data changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'meetingDate') {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.service ||
      !formData.meetingDate ||
      !formData.meetingLocation ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.name
    ) {
      toast.warning('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await createConsultation(formData);
      toast.success('Consultation request sent successfully!');
      clearForm();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/2349161246300', '_blank');
  };

  return (
    <div className='p-8 my-20'>
      <div className='container mx-auto max-w-4xl'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col md:flex-row items-center justify-center gap-2 font-semibold text-2xl'>
            <h5>Call Us:</h5>
            <Phone size={18} />
            <span>+234(0) 916-124-6300</span>
          </div>
          <div className='bg-red-50 dark:bg-gray-600 w-full rounded-md flex flex-col gap-4 p-8'>
            <h5 className='text-center text-2xl font-semibold'>
              Schedule a Consultation
            </h5>
            <p className='text-center text-gray-500 dark:text-gray-200'>
              To schedule a consultation, fill out the form below to get
              started.
            </p>
            <button
              onClick={openWhatsApp}
              className='mx-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-md cursor-pointer'
            >
              <BsWhatsapp size={18} />
              <span>Chat with us on WhatsApp</span>
            </button>
            <form onSubmit={submitForm}>
              <fieldset disabled={loading}>
                
                {/* Service & Preferred Contact */}
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-4 order-2'>
                  <div className='mb-2 mt-4'>
                    <label className='block mb-2 text-base font-bold'>
                      Preferred Contact Method
                      <span className='text-red-500'>*</span>
                    </label>
                    <select
                      name='preferredModeOfContact'
                      value={formData.preferredModeOfContact}
                      onChange={handleChange}
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      required
                    >
                      <option value=''>-Select Contact Method-</option>
                      <option value='phone'>Phone</option>
                      <option value='email'>Email</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div className='mb-2 mt-4 order-1'>
                  <label className='block mb-2 text-base font-bold'>
                    What type of Service do you need
                    <span className='text-red-500'>*</span>
                  </label>
                  <select
                    name='service'
                    value={formData.service}
                    onChange={handleChange}
                    className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                    required
                  >
                    <option value=''>-Select Service-</option>
                    <option value='buy'>Buy Property</option>
                    <option value='sell'>Sell Property</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Investment Tour">Investment Tour</option>
                    <option value="Affiliate Program">Affiliate Program</option>
                  </select>
                </div>
                </div>

                {/* Date & Location */}
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-base font-bold'>
                      Preferred Meeting Date
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='meetingDate'
                      value={formData.meetingDate.toISOString().split('T')[0]}
                      onChange={handleChange}
                      type='date'
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-base font-bold'>
                      Preferred Meeting Location
                      <span className='text-red-500'>*</span>
                    </label>
                    <select
                      name='meetingLocation'
                      value={formData.meetingLocation}
                      onChange={handleChange}
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      required
                    >
                      <option value=''>-Select Location-</option>
                      <option value='physical'>Physical</option>
                      <option value='virtual'>
                        Virtual (Zoom, Google Meet, Microsoft Teams)
                      </option>
                    </select>
                  </div>
                </div>

                {/* phone & email */}
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-base font-bold'>
                      Phone Number<span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      type='tel'
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      placeholder='Your Phone Number...'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-base font-bold'>
                      Email Address<span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      type='email'
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      placeholder='Your Email Address...'
                      required
                    />
                  </div>
                </div>

                {/* organization & name */}
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-base font-bold'>
                      Organization Name (Optional)
                    </label>
                    <input
                      name='organizationName'
                      value={formData.organizationName}
                      onChange={handleChange}
                      type='text'
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      placeholder='Your Organization Name...'
                    />
                  </div>
                  <div>
                    <label className='block text-base font-bold'>
                      Your Name<span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      type='text'
                      className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                      placeholder='Your Name...'
                      required
                    />
                  </div>
                </div>

                {/* Details */}
                <div className='my-5'>
                  <label className='block text-base font-bold'>
                    Details (Optional)
                  </label>
                  <textarea
                    name='details'
                    value={formData.details}
                    onChange={handleChange}
                    className='w-full p-4 bg-white rounded-md dark:bg-gray-500'
                    placeholder='Provide additional details...'
                    rows={4}
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  type='submit'
                  className='w-full mt-4 bg-pink-700 hover:bg-pink-800 cursor-pointer text-white py-2 px-4 rounded-md'
                >
                  {loading ? <Loader /> : 'SEND'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsPage;
