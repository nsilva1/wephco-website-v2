"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCategory } from "@/actions/blog"

interface CreateCategoryDialogProps {
  children: React.ReactNode
}

interface FormData {
  name: string
  description: string
  color: string
}

interface FormErrors {
  name?: string
  description?: string
  color?: string
}

export function CreateCategoryDialog({ children }: CreateCategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    color: "#3B82F6",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {}

    if (!data.name.trim()) {
      errors.name = "Name is required"
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    } else if (data.name.trim().length > 50) {
      errors.name = "Name must be less than 50 characters"
    }

    if (data.description && data.description.length > 200) {
      errors.description = "Description must be less than 200 characters"
    }

    if (!data.color.match(/^#[0-9A-Fa-f]{6}$/)) {
      errors.color = "Color must be a valid hex color"
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsLoading(true)
    try {
      const response = await createCategory(formData)

      

      setToast({ message: "Category created successfully", type: "success" })
      setTimeout(() => setToast(null), 3000)

      setOpen(false)
      setFormData({ name: "", description: "", color: "#3B82F6" })
      setErrors({})
    } catch (error) {
      setToast({ message: "Failed to create category", type: "error" })
      setTimeout(() => setToast(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  return (
    <>
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Category name" value={formData.name} onChange={handleInputChange("name")} />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the category"
                value={formData.description}
                onChange={handleInputChange("description")}
                rows={3}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={handleInputChange("color")}
                  className="w-16 h-10"
                />
                <Input
                  placeholder="#3B82F6"
                  value={formData.color}
                  onChange={handleInputChange("color")}
                  className="flex-1"
                />
              </div>
              {errors.color && <p className="text-sm text-red-500 mt-1">{errors.color}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
