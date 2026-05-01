"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteProperty, updatePropertyTag, updatePropertyStatus } from "@/actions/property-management"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, PenLine } from "lucide-react"
import Link from "next/link"

interface PropertyControlsProps {
  propertyId: string
  currentTag: string
  currentStatus: string
}

export default function PropertyControls({ propertyId, currentTag, currentStatus }: PropertyControlsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tag, setTag] = useState(currentTag)
  const [status, setStatus] = useState(currentStatus)

  const handleTagChange = async (newTag: string) => {
    setTag(newTag)
    setIsLoading(true)
    try {
      await updatePropertyTag(propertyId, newTag)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update tag")
      setTag(currentTag)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus)
    setIsLoading(true)
    try {
      await updatePropertyStatus(propertyId, newStatus)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update status")
      setStatus(currentStatus)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteProperty(propertyId)
      setIsDeleteModalOpen(false)
      router.push('/dashboard/properties')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete property")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <Label className="text-sm text-muted-foreground">Tag:</Label>
        <Select value={tag} onValueChange={handleTagChange} disabled={isLoading}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label className="text-sm text-muted-foreground">Status:</Label>
        <Select value={status} onValueChange={handleStatusChange} disabled={isLoading}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="under offer">Under Offer</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Link href={`/dashboard/properties/${propertyId}/edit`}>
        <Button variant="outline">
          <PenLine className="mr-2 h-4 w-4" />
          Edit Property
        </Button>
      </Link>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this property? This action cannot be undone and the listing will be removed from the mobile app.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
