'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { getAllProperties } from '@/actions/properties'
import { Loader } from '@/components/Loader'
import { IProperty } from '@/interfaces/propertyInterface'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Role } from '@/interfaces/userInterface'
import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'

const DashboardPropertiesPage = () => {
    const router = useRouter()

    const { data: session, status } = useSession()

    const [properties, setProperties] = useState<IProperty[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const goToAddPropertyForm = () => {
        router.push('/dashboard/properties/add')
    }

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

    const checkAuthStatus = useCallback(() => {
        if (
            status === 'unauthenticated' ||
            !session?.user ||
            (session?.user.role !== Role.ADMIN && session?.user.role !== Role.SUPPORT)
        ) {
            toast.error('You are not authorized to view this page. Please log in with an admin or support account.')
            signOut({redirectTo: '/auth/login'})
        } else {
            // User is authenticated and has the right role
            fetchProperties()
        }
    }, [status])


    useEffect(() => {
        checkAuthStatus()
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
                <button onClick={goToAddPropertyForm} className='px-4 py-2 bg-black text-white hover:bg-black/80 rounded-md cursor-pointer'>Add New Property</button>
            </div>
        )
    }

    let tableHead = (
        <thead>
            <tr>
                <th>Actions</th>
                <th>Name</th>
                <th>Description</th>
                <th>Country</th>
                <th>City</th>
                <th>Image(s)</th>
                <th>PDF</th>
                <th>Created</th>
            </tr>
        </thead>
    )

    let tableBody = (
        <tbody>
            {properties.map((property, index) => (
                <tr key={property.id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                    <td className='flex gap-2 p-4'>
                        <button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                    </td>
                    <td className='p-4'>{property.name}</td>
                    <td className='p-4'>{property.description}</td>
                    <td className='p-4'>{property.country}</td>
                    <td className='p-4'>{property.city}</td>
                    <td className='p-4'>{property.images ? (<p>Yes</p>) : (<p>No</p>)}</td>
                    <td className='p-4'>{property.pdfUrl ? (<p>Yes</p>) : (<p>No</p>)}</td>
                    <td className='p-4'>{new Date(property.createdAt).toLocaleDateString()}</td>
                </tr>
            ))}
        </tbody>
    )


  return (
    <div className='flex flex-col items-center h-screen overflow-x-auto p-5'>
        <button onClick={goToAddPropertyForm} className='px-4 py-2 bg-black text-white hover:bg-black/80 rounded-md'>Add New Property</button>
        <table className='w-full leading-normal mt-10'>
            {tableHead}
            {tableBody}
        </table>
    </div>
  )
}

export default DashboardPropertiesPage