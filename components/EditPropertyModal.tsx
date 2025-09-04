import React, { useState, useEffect } from 'react'
import { Modal } from '@/components/Modal'
import { IProperty } from '@/interfaces/propertyInterface'
import { toast } from 'react-toastify'
import { updateProperty } from '@/actions/properties'
import { Loader } from './Loader'
import { ModalProps } from '@/interfaces/appInterface'


/**
 * 
 * @returns EditPropertyModal component
 * This component is used to edit property details.
 */
const EditPropertyModal = ({open, close, modalData, callback}: ModalProps<IProperty>) => {

    const [formData, setFormData] = useState<IProperty | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (modalData) {
            setFormData({ ...modalData })
        }
    }, [modalData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => (prev ? { ...prev, [name]: value } : prev))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return

        try {
            setLoading(true)
            await updateProperty(formData)
            toast.success('Property updated successfully')
            if (callback) callback()
            close()
        } catch (error) {
            console.error(error)
            toast.error('Failed to update property')
        } finally {
            setLoading(false)
        }
    }

    if (!formData) return null

  return (
    <Modal open={open} onClose={close}>
        <div className='flex flex-col items-center gap-8'>
            <h2 className='text-xl font-semibold mb-4 text-center'>Edit Property</h2>
            {
                modalData && (
                    <form onSubmit={handleSubmit} className='w-96'>
                <fieldset className='flex flex-col gap-8'>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-700'>Name</label>
                            <input type='text' className='p-2 border w-full border-gray-300 rounded-md' value={formData.name} name='name' onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-700'>Country</label>
                            <input type='text' className='p-2 border w-full border-gray-300 rounded-md' value={formData.country} name='country' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-700'>City</label>
                            <input type='text' className='p-2 border w-full border-gray-300 rounded-md' value={formData.city} name='city' onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-700'>Description</label>
                            <textarea className='p-2 border w-full border-gray-300 rounded-md' value={formData.description} rows={4} name='description' onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    <div className='mt-6'>
                            <button
                                type='submit'
                                className='px-6 py-2 w-full bg-black text-white rounded-md hover:bg-black/80 disabled:opacity-50 cursor-pointer'
                                disabled={loading}
                            >
                                {loading ? <Loader size="sm" /> : 'Update Property'}
                            </button>
                        </div>
                </fieldset>
            </form>
                )
            }
        </div>
    </Modal>
  )
}

export { EditPropertyModal }