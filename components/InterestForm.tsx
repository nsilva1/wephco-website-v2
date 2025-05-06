'use client'

import React, { useState } from 'react'
import { Modal } from './Modal'
import { toast } from 'react-toastify'

const InterestForm = ({open, close}: {open: boolean; close: () => void}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)

    const clearForm = () => {
        setEmail('')
        setName('')
        setPhone('')
        setLocation('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast.success('Form submitted successfully!')
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setLoading(false)
            clearForm()
            close()
        }
    }

  return (
    <div className='bg-white rounded-lg shadow-lg p-6'>
        <Modal open={open} onClose={close}>
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

export { InterestForm }