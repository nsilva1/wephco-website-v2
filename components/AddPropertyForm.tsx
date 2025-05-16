'use client'

// import type { PropertyFormData } from '@/interfaces/propertyInterface'
import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { IProperty } from '@/interfaces/propertyInterface'
import { toast } from 'react-toastify'
import { uploadImage, uploadPDF } from '@/lib/helperFunctions'
import { createProperty } from '@/actions/properties'

const PropertyForm = () => {
    // const router = useRouter()
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [formData, setFormData] = useState<Omit<IProperty, 'createdAt' | 'updatedAt'>>({
      name: '',
      description: '',
      images: [],
      country: '',
      city: '',
      pdfUrl: ''
    })

    const uploadImages = async (files: FileList): Promise<string[]> => {
      const images: string[] = []
      
      for(const file of files) {
        if(file.size > 0){
          const imageURL = await uploadImage(file)
          images.push(imageURL)
        }
      }

      return images;
    }

    const getPDFurl = async (): Promise<string> => {
      const pdfURL = await uploadPDF(pdfFile!)
      return pdfURL
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')
      

        try {
          // upload images and return image urls
          const imageURLs = await uploadImages(selectedFiles!)

          // upload pdf
          const pdf = await getPDFurl()
          
          formData.images = imageURLs;
          formData.pdfUrl = pdf;

          await createProperty(formData)         

          toast.success('Property created successfully')
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
    
        const newPreviewImages: string[] = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const reader = new FileReader()
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              newPreviewImages.push(reader.result)
              if (i === files.length - 1) {
                setPreviewImages(prev => [...prev, ...newPreviewImages])
              }
            }
          }
          reader.readAsDataURL(file)
        }

        setSelectedFiles(e.target.files)
    }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50 bg-gray-300 cursor-pointer"
          />
          {previewImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload PDF
          </label>
          <input
            type="file"
            name="pdf"
            accept='.pdf'
            onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50 bg-gray-300 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select name="country" required value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value})} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="-">-</option>
            <option value="UAE">UAE</option>
            <option value="UK">UK</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select name="city" required value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value="-">-</option>
            <option value="Dubai">Dubai</option>
            <option value="London">London</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  )
}

export { PropertyForm }