'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { getAffiliates } from '@/actions/affiliates'
import { Loader } from '@/components/Loader'
import { IAffiliate } from '@/interfaces/userInterface'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Role } from '@/interfaces/userInterface'
import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'
import { Tooltip } from '@/components/Tooltip'

const DashboardPropertiesPage = () => {
    const router = useRouter()

    const { data: session, status } = useSession()

    const [affiliates, setAffiliates] = useState<IAffiliate[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const fetchAffiliates = useCallback(async () => {
        try {
            setLoading(true)
            const data = await getAffiliates()
            setAffiliates(data)
        } catch (err) {
            setError('Failed to fetch affiliates')
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
            fetchAffiliates()
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

    if (affiliates.length === 0) {
        return (
            <div className='flex flex-col gap-8 justify-center items-center h-screen'>
                <h3 className='text-2xl'>No Affiliates found</h3>
            </div>
        )
    }

    let tableHead = (
        <thead>
            <tr>
                <th className='p-4 text-left font-semibold'>Actions</th>
                <th className='p-4 text-left font-semibold'>Name</th>
                <th className='p-4 text-left font-semibold'>Email</th>
                <th className='p-4 text-left font-semibold'>Properties</th>
                <th className='p-4 text-left font-semibold'>Joined</th>
            </tr>
        </thead>
    )

    let tableBody = (
        <tbody>
            {affiliates.map((affiliate, index) => (
                <tr key={affiliate.id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                    <td className='flex gap-2 p-4'>
                      <Tooltip text='Delete' position='top'><Trash2 className='text-red-500' /></Tooltip>
                    </td>
                    <td className='p-4'>{affiliate.name}</td>
                    <td className='p-4'>{affiliate.email}</td>
                    <td className='p-4'>{affiliate.properties && affiliate.properties?.length > 0 ? `${affiliate.properties?.length}` : 'None'}</td>
                    <td className='p-4'>{affiliate.createdAt && new Date(affiliate.createdAt).toDateString()}</td>
                </tr>
            ))}
        </tbody>
    )


  return (
    <div className='flex flex-col items-center h-screen overflow-x-auto p-5'>
        <table className='w-full leading-normal mt-10'>
          <caption className='text-2xl font-bold mb-4'>Affiliates</caption>
            {tableHead}
            {tableBody}
        </table>
    </div>
  )
}

export default DashboardPropertiesPage