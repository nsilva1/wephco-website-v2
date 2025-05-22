'use client'

import { useRef, useState } from 'react'
import { IProperty } from '@/interfaces/propertyInterface'
import { createProperty } from '@/actions/properties'
import { XCircle } from 'lucide-react'
import { uploadFile } from '@/actions/vercel'
import { generateId } from '@/lib/helperFunctions'
import { Loader } from './Loader'

const PropertyForm = () => {
    const imageInputRef = useRef<HTMLInputElement>(null)
    const pdfInputRef = useRef<HTMLInputElement>(null)

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const [imageProgress, setImageProgress] = useState(0);
    const [pdfProgress, setPdfProgress] = useState(0);
    const [imageUploading, setImageUploading] = useState(false);
    const [pdfUploading, setPdfUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [formData, setFormData] = useState<Omit<IProperty, 'createdAt' | 'updatedAt'>>({
      name: '',
      description: '',
      images: [],
      country: '',
      city: '',
      pdfUrl: ''
    })
    
    const clearForm = () => {
        setFormData({
          name: '',
          description: '',
          images: [],
          country: '',
          city: '',
          pdfUrl: ''
        })
        setPreviewImages([])
        setSelectedFiles(null)
        setError('')
        setSuccess('')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setImageUploading(true)
        setPdfUploading(true)
        setImageProgress(0);
        setPdfProgress(0);
        setError('')
        setSuccess('')

        if (!imageInputRef.current?.files) {
			    throw new Error("Please select an image to continue!");
		    }

        if (!pdfInputRef.current?.files) {
          throw new Error("Please select a PDF to continue!");
        }

        const imageFiles = imageInputRef.current?.files
        const pdfFile = pdfInputRef.current?.files[0]
        const imageURLs: string[] = [];
        const id = generateId()
      

        try {
          // upload images and return image urls
          for (var image of imageFiles) {
            const imageBlob = await uploadFile(id, image, setImageProgress)
            imageURLs.push(imageBlob.url)
          }

          // upload pdf
          const pdfBlob = await uploadFile(id, pdfFile, setPdfProgress)
          
          formData.images = imageURLs;
          formData.pdfUrl = pdfBlob.url

          await createProperty(formData)         

          setSuccess('Property created successfully')
          clearForm()
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setIsSubmitting(false)
            setImageUploading(false)
            setPdfUploading(false)
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
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded flex justify-between">
          {error}
          <XCircle onClick={() => setError('')} className='cursor-pointer' />
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded flex justify-between">
          {success}
          <XCircle onClick={() => setSuccess('')} className='cursor-pointer' />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={isSubmitting}>
          <div className='my-3'>
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

        <div className='my-3'>
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

        <div className='my-3'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            ref={imageInputRef}
            type="file"
            name="images"
            multiple
            accept="image/jpeg, image/png, image/gif"
            required
            disabled={imageUploading}
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50 bg-primary text-black cursor-pointer"
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

          {imageUploading && (
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-black/60 h-2.5 rounded-full transition-all duration-300"
								style={{ width: `${imageProgress}%` }}
							></div>
							<p className="text-sm text-white mt-2 text-center">
								{Math.round(imageProgress)}% uploaded
							</p>
						</div>
					)}
        </div>

        <div className='my-3'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload PDF
          </label>
          <input
            ref={pdfInputRef}
            type="file"
            name="pdf"
            accept='application/pdf'
            // onChange={handlePdfChange}
            disabled={pdfUploading}
            required
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50 bg-black text-white cursor-pointer"
          />
          {pdfUploading && (
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-black/60 h-2.5 rounded-full transition-all duration-300"
								style={{ width: `${pdfProgress}%` }}
							></div>
							<p className="text-sm text-white mt-2 text-center">
								{Math.round(pdfProgress)}% uploaded
							</p>
						</div>
					)}
        </div>

        <div className='my-3'>
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

        <div className='my-3'>
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

        <div className='my-3'>
          <button
            type="submit"
            disabled={isSubmitting || !selectedFiles}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader /> : 'Add Property'}
          </button>
        </div>
        </fieldset>
      </form>
    </div>
  )
}

export { PropertyForm }