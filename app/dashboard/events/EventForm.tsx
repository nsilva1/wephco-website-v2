"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/actions/events"
import { EventItem } from "@/app/(root)/events/_components/EventCard"
import { toast } from "sonner"
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
import { ArrowLeft, Upload, ImageIcon, Plus, Trash2, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { uploadFile } from "@/lib/helperFunctions"

interface EventFormProps {
  event?: EventItem
  mode: 'create' | 'edit'
}

interface HostInput {
  name: string
  role: string
  imageFile: File | null
  imagePreview: string
  existingUrl?: string
}

export default function EventForm({ event, mode }: EventFormProps) {
  const router = useRouter()
  const coverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Basic Fields
  const [formState, setFormState] = useState({
    title: event?.title || '',
    description: event?.description || '',
    longDescription: event?.longDescription || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    scope: event?.scope || 'Local',
    format: event?.format || 'Physical',
    seatsRemaining: event?.seatsRemaining?.toString() || '',
    isPast: event?.isPast || false,
    hasGallery: event?.hasGallery || false,
  })

  // Cover Image
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>(event?.image || '')

  // Highlights State
  const [highlights, setHighlights] = useState<string[]>(event?.highlights || [])
  const [newHighlight, setNewHighlight] = useState('')

  // Agenda State
  const [agenda, setAgenda] = useState<{ time: string; title: string; description?: string }[]>(event?.agenda || [])
  const [newAgenda, setNewAgenda] = useState({ time: '', title: '', description: '' })

  // Hosts State
  const [hosts, setHosts] = useState<HostInput[]>(
    event?.hosts?.map(h => ({
      name: h.name,
      role: h.role,
      imageFile: null,
      imagePreview: h.image,
      existingUrl: h.image
    })) || []
  )
  const [newHost, setNewHost] = useState({ name: '', role: '', imageFile: null as File | null, imagePreview: '' })
  const hostImageInputRef = useRef<HTMLInputElement>(null)

  // Gallery Images State
  const [existingGallery, setExistingGallery] = useState<string[]>(event?.galleryImages || [])
  const [newGalleryFiles, setNewGalleryFiles] = useState<{ file: File; preview: string }[]>([])

  const handleChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }

  // Cover Image Change Handlers
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Highlights Handlers
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights(prev => [...prev, newHighlight.trim()])
      setNewHighlight('')
    }
  }

  const removeHighlight = (index: number) => {
    setHighlights(prev => prev.filter((_, i) => i !== index))
  }

  // Agenda Handlers
  const addAgendaItem = () => {
    if (newAgenda.time.trim() && newAgenda.title.trim()) {
      setAgenda(prev => [...prev, { ...newAgenda }])
      setNewAgenda({ time: '', title: '', description: '' })
    }
  }

  const removeAgendaItem = (index: number) => {
    setAgenda(prev => prev.filter((_, i) => i !== index))
  }

  // Hosts Handlers
  const handleHostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewHost(prev => ({ ...prev, imageFile: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewHost(prev => ({ ...prev, imagePreview: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addHost = () => {
    if (newHost.name.trim() && newHost.role.trim() && (newHost.imagePreview || newHost.imageFile)) {
      setHosts(prev => [...prev, {
        name: newHost.name.trim(),
        role: newHost.role.trim(),
        imageFile: newHost.imageFile,
        imagePreview: newHost.imagePreview,
      }])
      setNewHost({ name: '', role: '', imageFile: null, imagePreview: '' })
      if (hostImageInputRef.current) hostImageInputRef.current.value = ''
    } else {
      toast.error("Please fill in all host details, including picking an image.")
    }
  }

  const removeHost = (index: number) => {
    setHosts(prev => prev.filter((_, i) => i !== index))
  }

  // Gallery Handlers
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewGalleryFiles(prev => [...prev, { file, preview: reader.result as string }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeExistingGalleryImage = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index))
  }

  const removeNewGalleryImage = (index: number) => {
    setNewGalleryFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!coverPreview) {
      toast.error("Cover image is required")
      return
    }

    setIsSubmitting(true)
    const toastId = toast.loading(`${mode === 'create' ? 'Creating' : 'Updating'} event...`)

    try {
      // 1. Upload Cover Image if changed
      let finalCoverUrl = event?.image || ''
      if (coverFile) {
        finalCoverUrl = await uploadFile(coverFile, 'events')
      }

      // 2. Upload Host Images if new
      const uploadedHosts = await Promise.all(
        hosts.map(async (h) => {
          let imageUrl = h.existingUrl || ''
          if (h.imageFile) {
            imageUrl = await uploadFile(h.imageFile, 'events/hosts')
          }
          return {
            name: h.name,
            role: h.role,
            image: imageUrl
          }
        })
      )

      // 3. Upload Gallery Images
      const newGalleryUrls = await Promise.all(
        newGalleryFiles.map(gf => uploadFile(gf.file, 'events/gallery'))
      )
      const finalGalleryImages = [...existingGallery, ...newGalleryUrls]

      const payload: EventItem = {
        title: formState.title,
        description: formState.description,
        longDescription: formState.longDescription || undefined,
        date: formState.date,
        time: formState.time,
        location: formState.location,
        image: finalCoverUrl,
        scope: formState.scope as 'Local' | 'International',
        format: formState.format as 'Physical' | 'Virtual',
        seatsRemaining: formState.seatsRemaining ? Number(formState.seatsRemaining) : undefined,
        isPast: formState.isPast,
        hasGallery: formState.hasGallery,
        highlights: highlights.length > 0 ? highlights : undefined,
        agenda: agenda.length > 0 ? agenda : undefined,
        hosts: uploadedHosts.length > 0 ? uploadedHosts : undefined,
        galleryImages: finalGalleryImages.length > 0 ? finalGalleryImages : undefined,
      }

      if (mode === 'edit' && event?.id) {
        await updateEvent(event.id, payload)
        toast.success("Event updated successfully", { id: toastId })
      } else {
        await createEvent(payload)
        toast.success("Event created successfully", { id: toastId })
      }

      router.push('/dashboard/events')
      router.refresh()
    } catch (error: any) {
      console.error(error)
      toast.error(`Error: ${error.message || 'Operation failed'}`, { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/events">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {mode === 'create' ? 'Add New Event' : 'Edit Event'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column: Core Fields */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formState.title}
                    onChange={e => handleChange('title', e.target.value)}
                    placeholder="e.g. VIP Investment Summit"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formState.description}
                    onChange={e => handleChange('description', e.target.value)}
                    placeholder="Brief summary shown on lists..."
                    rows={2}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="longDescription">Long Description</Label>
                  <Textarea
                    id="longDescription"
                    value={formState.longDescription}
                    onChange={e => handleChange('longDescription', e.target.value)}
                    placeholder="Detailed page information about the event..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logistics & Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        value={formState.date}
                        onChange={e => handleChange('date', e.target.value)}
                        placeholder="e.g. Oct 24, 2026 or 2026-10-24"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      value={formState.time}
                      onChange={e => handleChange('time', e.target.value)}
                      placeholder="e.g. 10:00 AM WAT"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formState.location}
                    onChange={e => handleChange('location', e.target.value)}
                    placeholder="e.g. Eko Hotels & Suites, Lagos"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Scope</Label>
                    <Select value={formState.scope} onValueChange={v => handleChange('scope', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Local">Local</SelectItem>
                        <SelectItem value="International">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Format</Label>
                    <Select value={formState.format} onValueChange={v => handleChange('format', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Physical">Physical</SelectItem>
                        <SelectItem value="Virtual">Virtual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="grid gap-2 col-span-1">
                    <Label htmlFor="seatsRemaining">Seats Remaining</Label>
                    <Input
                      id="seatsRemaining"
                      type="number"
                      value={formState.seatsRemaining}
                      onChange={e => handleChange('seatsRemaining', e.target.value)}
                      placeholder="e.g. 50"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      id="isPast"
                      checked={formState.isPast}
                      onChange={e => handleChange('isPast', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#cfb53b] focus:ring-[#cfb53b]"
                    />
                    <Label htmlFor="isPast" className="cursor-pointer">Past Event</Label>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      id="hasGallery"
                      checked={formState.hasGallery}
                      onChange={e => handleChange('hasGallery', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#cfb53b] focus:ring-[#cfb53b]"
                    />
                    <Label htmlFor="hasGallery" className="cursor-pointer">Has Gallery</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Event Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newHighlight}
                    onChange={e => setNewHighlight(e.target.value)}
                    placeholder="Add a key highlight of the event"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHighlight(); } }}
                  />
                  <Button type="button" onClick={addHighlight} className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {highlights.length > 0 && (
                  <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center justify-between p-2 bg-slate-50 border rounded-lg text-sm">
                        <span>{h}</span>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(idx)} className="h-8 w-8 text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Assets & Substructures */}
          <div className="space-y-6">
            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Event Cover Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-[#cfb53b] transition-colors"
                  onClick={() => coverInputRef.current?.click()}
                >
                  {coverPreview ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                      <Image src={coverPreview} alt="Cover Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-sm font-medium">Click to replace</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-10 w-10" />
                      <p className="text-sm">Click to upload cover image *</p>
                      <p className="text-xs">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 p-3 bg-slate-50 border rounded-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Time (e.g. 09:00 - 10:00)"
                      value={newAgenda.time}
                      onChange={e => setNewAgenda(prev => ({ ...prev, time: e.target.value }))}
                    />
                    <Input
                      placeholder="Title (e.g. Registration)"
                      value={newAgenda.title}
                      onChange={e => setNewAgenda(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <Input
                    placeholder="Short Description (optional)"
                    value={newAgenda.description}
                    onChange={e => setNewAgenda(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Button type="button" onClick={addAgendaItem} className="w-full bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
                    Add Agenda Item
                  </Button>
                </div>

                {agenda.length > 0 && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {agenda.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start p-3 bg-white border rounded-lg text-xs gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <span className="text-[#cfb53b] font-medium">{item.time}</span>
                            <span>-</span>
                            <span>{item.title}</span>
                          </div>
                          {item.description && <p className="text-muted-foreground">{item.description}</p>}
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeAgendaItem(idx)} className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hosts */}
            <Card>
              <CardHeader>
                <CardTitle>Event Hosts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 p-3 bg-slate-50 border rounded-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Name"
                      value={newHost.name}
                      onChange={e => setNewHost(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Role/Title"
                      value={newHost.role}
                      onChange={e => setNewHost(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:border-[#cfb53b] transition-colors flex-1"
                      onClick={() => hostImageInputRef.current?.click()}
                    >
                      {newHost.imagePreview ? (
                        <div className="relative h-12 w-full max-w-[120px] mx-auto rounded overflow-hidden">
                          <Image src={newHost.imagePreview} alt="Host Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                          <User className="h-4 w-4" />
                          <span>Select Host Image</span>
                        </div>
                      )}
                      <input
                        ref={hostImageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHostImageChange}
                      />
                    </div>
                  </div>

                  <Button type="button" onClick={addHost} className="w-full bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
                    Add Host
                  </Button>
                </div>

                {hosts.length > 0 && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {hosts.map((host, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white border rounded-lg text-xs gap-3">
                        <div className="flex items-center gap-3">
                          {host.imagePreview && (
                            <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border">
                              <Image src={host.imagePreview} alt={host.name} fill className="object-cover" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-800">{host.name}</p>
                            <p className="text-muted-foreground">{host.role}</p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeHost(idx)} className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery Images (Specially for admin to upload photos of past events) */}
            <Card>
              <CardHeader>
                <CardTitle>Event Gallery Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-[#cfb53b] transition-colors"
                  onClick={() => galleryInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                    <p className="text-sm">Click to upload gallery images</p>
                    <p className="text-xs">Multiple files allowed</p>
                  </div>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryChange}
                  />
                </div>

                {(existingGallery.length > 0 || newGalleryFiles.length > 0) && (
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1 border rounded-lg">
                    {existingGallery.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative aspect-square rounded overflow-hidden group">
                        <Image src={url} alt="Gallery image" fill className="object-cover" sizes="100px" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingGalleryImage(idx)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    {newGalleryFiles.map((gf, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded overflow-hidden group border-2 border-[#cfb53b]">
                        <Image src={gf.preview} alt="New gallery image" fill className="object-cover" sizes="100px" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeNewGalleryImage(idx)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/events">
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white px-8"
            disabled={isSubmitting}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isSubmitting
              ? (mode === 'create' ? 'Creating...' : 'Saving...')
              : (mode === 'create' ? 'Create Event' : 'Save Changes')
            }
          </Button>
        </div>
      </form>
    </div>
  )
}
