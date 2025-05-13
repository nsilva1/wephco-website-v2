'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { getAllProperties } from '@/actions/properties'
import { Loader } from '@/components/Loader'
import { IProperty } from '@/interfaces/propertyInterface'

const DashboardPropertiesPage = () => {
    const [properties, setProperties] = useState<IProperty[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProperties = useCallback(async () => {
        try {
            setLoading(true)
            const data = await getAllProperties()
            setProperties(data)
        } catch (err) {
            setError('Failed to fetch properties')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProperties()
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

    if (properties.length === 0) {
        return (
            <div className='flex flex-col gap-8 justify-center items-center h-screen'>
                <h3 className='text-2xl'>No properties found</h3>
                <button className='px-4 py-2 bg-black text-white hover:bg-black/80 rounded-md cursor-pointer'>Add New Property</button>
            </div>
        )
    }

    let tableHead = (
        <thead>
            <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Price</th>
                <th>Country</th>
                <th>City</th>
                <th>Address</th>
                <th>Description</th>
                <th>Agent</th>
                <th>Created</th>
            </tr>
        </thead>
    )

    let tableBody = (
        <tbody>
            {properties.map((property) => (
                <tr key={property.id}>
                    <td className='flex gap-2 p-4'>
                        <button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                    </td>
                    <td className='p-4'>{property.name}</td>
                    <td className='p-4'>{property.price}</td>
                    <td className='p-4'>{property.country}</td>
                    <td className='p-4'>{property.city}</td>
                    <td className='p-4'>{property.address}</td>
                    <td className='p-4'>{property.description}</td>
                    <td className='p-4'>{property?.agent?.name}</td>
                    <td className='p-4'>{new Date(property.createdAt).toLocaleDateString()}</td>
                </tr>
            ))}
        </tbody>
    )


  return (
    <div className='flex flex-col items-center justify-center h-screen overflow-x-auto p-5'>
        <button className='px-4 py-2 bg-black text-white hover:bg-black/80 rounded-md'>Add New Property</button>
        <table className='w-full border-collapse border border-gray-300 leading-normal'>
            <caption className='text-lg font-semibold mb-4'>Properties</caption>
            {tableHead}
            {tableBody}
        </table>
    </div>
  )
}

export default DashboardPropertiesPage