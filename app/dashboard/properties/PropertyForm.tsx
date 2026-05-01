"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createProperty, updateProperty } from "@/actions/property-management"
import { IProperty } from "@/interfaces/propertyInterface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Upload, ImageIcon, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PropertyFormProps {
  property?: IProperty
  mode: 'create' | 'edit'
}

export default function PropertyForm({ property, mode }: PropertyFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(property?.image || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null)
  const [pdfFileName, setPdfFileName] = useState<string | null>(property?.pdfUrl ? 'Existing brochure' : null)

  const [formState, setFormState] = useState({
    title: property?.title || '',
    developer: property?.developer || '',
    location: property?.location || '',
    yieldValue: property?.yieldValue?.toString() || '0',
    price: property?.price?.toString() || '0',
    description: property?.description || '',
    currency: property?.currency || 'NGN',
    status: property?.status || 'available',
    tag: property?.tag || 'pending',
  })

  const handleChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedPdf(file)
      setPdfFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', formState.title)
      formData.append('developer', formState.developer)
      formData.append('location', formState.location)
      formData.append('yieldValue', formState.yieldValue)
      formData.append('price', formState.price)
      formData.append('description', formState.description)
      formData.append('currency', formState.currency)
      formData.append('status', formState.status)
      formData.append('tag', formState.tag)

      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      if (selectedPdf) {
        formData.append('pdf', selectedPdf)
      }

      if (mode === 'edit' && property?.id) {
        formData.append('existingImage', property.image || '')
        formData.append('existingPdf', property.pdfUrl || '')
        await updateProperty(property.id, formData)
      } else {
        await createProperty(formData)
      }

      router.push('/dashboard/properties')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert(`Failed to ${mode === 'create' ? 'create' : 'update'} property`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/properties">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {mode === 'create' ? 'Add New Property' : 'Edit Property'}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formState.title}
                  onChange={e => handleChange('title', e.target.value)}
                  placeholder="Property title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="developer">Developer</Label>
                <Input
                  id="developer"
                  value={formState.developer}
                  onChange={e => handleChange('developer', e.target.value)}
                  placeholder="Developer name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formState.location}
                  onChange={e => handleChange('location', e.target.value)}
                  placeholder="e.g. Lagos, Nigeria"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formState.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="Property description..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formState.price}
                      onChange={e => handleChange('price', e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formState.currency} onValueChange={v => handleChange('currency', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">NGN (₦)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="yieldValue">Yield (%)</Label>
                  <Input
                    id="yieldValue"
                    type="number"
                    step="0.1"
                    value={formState.yieldValue}
                    onChange={e => handleChange('yieldValue', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status & Tag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Tag</Label>
                  <Select value={formState.tag} onValueChange={v => handleChange('tag', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select value={formState.status} onValueChange={v => handleChange('status', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="under offer">Under Offer</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Property Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-[#cfb53b] transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-md" sizes="400px" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                    <p className="text-sm">Click to upload an image</p>
                    <p className="text-xs">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => { setImagePreview(null); setSelectedFile(null) }}
                >
                  Remove Image
                </Button>
              )}
            </CardContent>
          </Card>

          {/* PDF Upload & Submit */}
          <Card>
            <CardHeader>
              <CardTitle>PDF Brochure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-[#cfb53b] transition-colors"
                onClick={() => pdfInputRef.current?.click()}
              >
                {pdfFileName ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-[#cfb53b]" />
                    <p className="text-sm font-medium">{pdfFileName}</p>
                    <p className="text-xs text-muted-foreground">Click to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText className="h-10 w-10" />
                    <p className="text-sm">Click to upload a PDF brochure</p>
                    <p className="text-xs">PDF up to 20MB</p>
                  </div>
                )}
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handlePdfChange}
                />
              </div>
              {pdfFileName && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => { setSelectedPdf(null); setPdfFileName(null) }}
                >
                  Remove PDF
                </Button>
              )}
              
            </CardContent>
          </Card>
        </div>
        <div className="mt-5">
            <Button
                type="submit"
                className="w-full bg-[#cfb53b] hover:bg-[#b89e2f] text-white mt-4"
                disabled={isSubmitting}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isSubmitting
                  ? (mode === 'create' ? 'Creating...' : 'Updating...')
                  : (mode === 'create' ? 'Create Property' : 'Update Property')
                }
              </Button>
          </div>
      </form>
    </div>
  )
}
