"use client"

import { useState, useCallback, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Save, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { fetchCategories } from "@/actions/blog"
import { IBlogCategory, IBlogPost, PostStatus } from "@/interfaces/blogInterface"
import { generateId } from "@/lib/helperFunctions"
import { uploadFile } from "@/actions/vercel"
import { createBlogPost } from "@/actions/blog"


const validateForm = (formData: IBlogPost) => {
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

export function PostEditor({userId}: {userId: string | undefined}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<IBlogCategory[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUploading, setImageUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [imageProgress, setImageProgress] = useState(0);
  const [formData, setFormData] = useState<IBlogPost>({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    categoryId: "",
    tags: [],
    status: PostStatus.DRAFT,
    featured: false,
    slug: "",
    views: 0,
    readTime: 0,
    metaTitle: "",
    metaDescription: "",
    publishedAt: null,
    authorId: ''
  })
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const getCategories = useCallback(async () => {
    try {
      const result = await fetchCategories()
      setCategories(result);
    } catch (error) {
      toast.error('Error fetching categories')
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
          if (typeof reader.result === 'string') {
          setPreviewImages([reader.result])
          }
        }
        reader.readAsDataURL(file)
    
        setSelectedFile(file)
    }

  const updateField = (field: keyof IBlogPost, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setImageUploading(true)
    setIsLoading(true)

    const imageId = generateId()

    const imageBlob = await uploadFile(imageId, selectedFile!, setImageProgress)
    
    const blogData: Omit<IBlogPost, 'slug' | 'views' | 'readTime' | 'metaTitle' | 'metaDescription' | 'publishedAt'> = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      coverImage: imageBlob.url,
      categoryId: formData.categoryId,
      tags: formData.tags,
      status: PostStatus.PUBLISHED,
      featured: formData.featured,
      authorId: userId!
    }

    try {
      await createBlogPost(blogData)

      toast.success("Post created successfully")
      router.push("/blog/admin/posts")
    } catch (error) {
      toast.error("Failed to save post")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          {/* <Button type="button" variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button> */}
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Create Post"}
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
                  className="text-lg mt-2"
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
                  className="mt-2"
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
                  className="font-mono mt-2"
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
                  className="flex mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  className="flex mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">-</option>
                  {
                    categories.map((category, index) => (
                      <option key={index} value={category.id}>{category.name}</option>
                    ))
                  }
                </select>
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
                <Input className="mt-2" type='file' accept="image/jpeg, image/png, image/svg" onChange={handleImageChange} />
                {/* <Input
                  id="coverImage"
                  placeholder="https://example.com/image.jpg"
                  value={formData.coverImage}
                  onChange={(e) => updateField("coverImage", e.target.value)}
                  className="mt-2"
                /> */}
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
                  placeholder="react, travelling, self-development"
                  className="mt-2"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onBlur={(e) => {
                    const tags = tagInput
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                    updateField("tags", tags)
                    setTagInput(tags.join(", "))
                  }}
                />
              </div>

              <div className="mt-4">
                <Label>Featured Post</Label>
                <select onChange={(e) => updateField('featured', e.target.value)} className="flex mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" >
                  <option value="-">-</option>
                  <option value='True'>Yes</option>
                  <option value="False">No</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
