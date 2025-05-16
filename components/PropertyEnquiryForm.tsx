import React, { useState } from 'react'
import { Modal } from './Modal'
import { IPropertyEnquiry } from '@/interfaces/propertyInterface';
import { createPropertyEnquiryRequest } from '@/actions/propertyEnquiry';
import { toast } from 'react-toastify';

const PropertyEnquiryForm = ({open, close, propertyId}: {open:boolean; close: () => void; propertyId: string}) => {

      const [email, setEmail] = useState('')
      const [name, setName] = useState('')
      const [phone, setPhone] = useState('')
      const [loading, setLoading] = useState(false)
  
      const clearForm = () => {
          setEmail('')
          setName('')
          setPhone('')
      }
  
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          setLoading(true)
  
          const formData: IPropertyEnquiry = {
              name,
              email,
              phone,
              propertyId
          }
  
          try {
              await createPropertyEnquiryRequest(formData)
  
              toast.success('Thank you for declaring interest for our properties. We will reach out to you shortly')
          } catch (error:any) {
              toast.error(error.message)
          } finally {
              setLoading(false)
              clearForm()
              close()
          }
      }
  
      if(!open){
          return (
              <div className='hidden'></div>
          )
      }
  
    return (
      <div className='bg-white rounded-lg shadow-lg p-6'>
          <Modal open={open} onClose={close}>
              <h3 className='text-center text-xl text-gray-600 mb-5'>Property Enquiry Form</h3>
              <form onSubmit={handleSubmit} className='space-y-4'>
                  <fieldset disabled={loading} className=''>
                      {/* <legend className='text-lg font-semibold'>Declare Interest</legend> */}
                      <div className='flex flex-col space-y-2 my-2'>
                          <label htmlFor='name' className='text-sm font-medium'>Name</label>
                          <input
                              type='text'
                              id='name'
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className='border rounded-md p-2'
                          />
                      </div>
                      <div className='flex flex-col space-y-2 my-2'>
                          <label htmlFor='email' className='text-sm font-medium'>Email</label>
                          <input
                              type='email'
                              id='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className='border rounded-md p-2'
                          />
                      </div>
                      <div className='flex flex-col space-y-2 my-2'>
                          <label htmlFor='phone' className='text-sm font-medium'>Phone</label>
                          <input
                              type='tel'
                              id='phone'
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              className='border rounded-md p-2'
                          />
                      </div>                      
                      <button
                          type='submit'
                          disabled={loading}
                          className={`w-full py-2 text-white bg-black rounded-md mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-black/80'}`}
                      >
                          {loading ? 'Submitting...' : 'Submit'}
                      </button>
                  </fieldset>
              </form>
          </Modal>
      </div>
    )
}

export { PropertyEnquiryForm }