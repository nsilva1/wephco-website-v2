"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"

interface PostEditorProps {
  post?: any // In a real app, this would be properly typed
}

const validateForm = (formData: FormData) => {
  const errors: Record<string, string> = {}

  if (!formData.title.trim()) {
    errors.title = "Title is required"
  } else if (formData.title.length < 3) {
    errors.title = "Title must be at least 3 characters"
  }

  if (!formData.content.trim()) {
    errors.content = "Content is required"
  } else if (formData.content.length < 10) {
    errors.content = "Content must be at least 10 characters"
  }

  return errors
}

interface FormData {
  title: string
  content: string
  excerpt: string
  coverImage: string
  categoryId: string
  tags: string[]
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    coverImage: post?.coverImage || "",
    categoryId: post?.categoryId || "",
    tags: post?.tags || [],
    status: post?.status || "DRAFT",
    featured: post?.featured || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/blog/posts", {
        method: post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save post")

      toast.success(post ? "Post updated successfully" : "Post created successfully")
      router.push("/blog/admin/posts")
    } catch (error) {
      toast.error("Failed to save post")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="text-lg"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={formData.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  rows={20}
                  className="font-mono"
                />
                {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField("status", e.target.value as any)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div>
                <Label htmlFor="categoryId">Category</Label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => updateField("categoryId", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select category</option>
                  <option value="tech">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Post</Label>
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  placeholder="https://example.com/image.jpg"
                  value={formData.coverImage}
                  onChange={(e) => updateField("coverImage", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="react, javascript, web-development"
                  value={formData.tags.join(", ")}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                    updateField("tags", tags)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
