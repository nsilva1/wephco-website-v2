'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ISellEnquiry } from '@/interfaces/propertyInterface'
import { getAllEnquiries } from '@/actions/sellEnquiry'
import { Loader } from '@/components/Loader'

const SellRequest = () => {
    const [enquiries, setEnquiries] = useState<ISellEnquiry[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchEnquiries = useCallback(async () => {
        try {
            setLoading(true)
            const data = await getAllEnquiries()
            setEnquiries(data)
        } catch (err) {
            setError('Failed to fetch enquiries')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchEnquiries()
    }, [])

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h3 className='text-2xl text-red-500'>{error}</h3>
            </div>
        )
    }

    if (enquiries.length === 0) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h3 className='text-2xl'>No Sale Requests</h3>
            </div>
        )
    }

    let tableHead = (
        <thead>
            <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Timeline</th>
                <th>Created</th>
            </tr>
        </thead>
    )

    let tableBody = (
        <tbody>
            {enquiries.map((enquiry) => (
        <tr key={enquiry.id}>
            <td className='p-4'>{enquiry.status ? (<button></button>) : (<button>Contact Customer</button>)}</td>
            <td className='p-4'>{enquiry.name}</td>
            <td className='p-4'>{enquiry.email}</td>
            <td className='p-4'>{enquiry.phone}</td>
            <td className='p-4'>{enquiry.address}</td>
            <td className='p-4'>{enquiry.timeline}</td>
            <td className='p-4'>{new Date(enquiry.createdAt!).toLocaleDateString()}</td>
        </tr>
    ))}
        </tbody>
    )

  return (
    <div className='flex flex-col items-center justify-center h-screen overflow-x-auto p-5'>
        
        <table className='w-full border-collapse border border-gray-300 leading-normal'>
            <caption className='text-lg font-semibold mb-4'>Requests to Sell Property</caption>
            {tableHead}
            {tableBody}
        </table>
    </div>
  )
}

export { SellRequest }