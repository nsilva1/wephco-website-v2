'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { getConsultations } from '@/actions/consultation'
import { Loader } from '@/components/Loader'
import { IConsultation } from '@/interfaces/userInterface'
// import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Role } from '@/interfaces/userInterface'
import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'
import { allowedRoles } from '@/lib/constants'

const ConsultationsPage = () => {
    // const router = useRouter()

    const { data: session, status } = useSession()

    const [consultations, setConsultations] = useState<IConsultation[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const fetchConsultations = useCallback(async () => {
        try {
            setLoading(true)
            const data = await getConsultations()
            setConsultations(data)
        } catch (err) {
            setError('Failed to fetch consultations')
        } finally {
            setLoading(false)
        }
    }, [])

    const checkAuthStatus = useCallback(() => {
        if (
            status === 'unauthenticated' ||
            !session?.user ||
            !allowedRoles.includes(session?.user.role as Role)
        ) {
            toast.error('You are not authorized to view this page. Please log in with an admin or support account.')
            signOut({redirectTo: '/auth/login'})
        } else {
            // User is authenticated and has the right role
            fetchConsultations()
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

    if (consultations.length === 0) {
        return (
            <div className='flex flex-col gap-8 justify-center items-center h-screen'>
                <h3 className='text-2xl'>No Consultations yet</h3>
            </div>
        )
    }

    let tableHead = (
        <thead>
            <tr>
                <th>Actions</th>
                <th>Service</th>
                <th>Meeting Date</th>
                <th>Meeting Location</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Organisation</th>
                <th>Contact Name</th>
                <th>Mode of Contact</th>
                <th>Details</th>
            </tr>
        </thead>
    )

    let tableBody = (
        <tbody>
            {consultations.map((consultation, index) => (
                <tr key={consultation.id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                    <td className='flex flex-col gap-2 p-4'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded cursor-pointer'>Contact</button>
                        <button className='bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded cursor-pointer'>Add a Note</button>
                    </td>
                    <td className='p-4'>{consultation.service}</td>
                    <td className='p-4'>{new Date(consultation.meetingDate).toDateString()}</td>
                    <td className='p-4'>{consultation.meetingLocation}</td>
                    <td className='p-4'>{consultation.phoneNumber}</td>
                    <td className='p-4'>{consultation.email}</td>
                    <td className='p-4'>{consultation.organizationName}</td>
                    <td className='p-4'>{consultation.name}</td>
                    <td className='p-4'>{consultation.preferredModeOfContact}</td>
                    <td className='p-4'>{consultation.details}</td>
                </tr>
            ))}
        </tbody>
    )


  return (
    <div className='flex flex-col items-center h-screen overflow-x-scroll p-5'>
        <table className='w-full leading-normal mt-10'>
            <caption className='text-2xl font-bold mb-4'>Consultations</caption>
            {tableHead}
            {tableBody}
        </table>
    </div>
  )
}

export default ConsultationsPage