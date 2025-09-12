import axios from "axios"

// Client-side API functions for blog operations
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
  views: number
  readTime?: number
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  category?: {
    id: string
    name: string
    slug: string
    color: string
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  _count: {
    posts: number
  }
}

export interface PaginatedResponse<T> {
  posts?: T[]
  categories?: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Fetch published posts
export async function fetchPosts(params?: {
  page?: number
  limit?: number
  category?: string
  tag?: string
  search?: string
  featured?: boolean
}): Promise<PaginatedResponse<BlogPost>> {
  const searchParams = new URLSearchParams()

  if (params?.page) searchParams.set("page", params.page.toString().trim())
  if (params?.limit) searchParams.set("limit", params.limit.toString().trim())
  if (params?.category) searchParams.set("category", params.category.trim())
  if (params?.tag) searchParams.set("tag", params.tag.trim())
  if (params?.search) searchParams.set("search", params.search.trim())
  if (params?.featured) searchParams.set("featured", "true")

//   const response = await fetch(`/api/blog/posts?${searchParams}`)
const response = await fetch(`/api/blog/posts`)
  if (!response.ok) throw new Error("Failed to fetch posts")

  return response.json()
}

// Fetch single post by slug
export async function fetchPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`/api/blog/posts/${slug}`)
  if (!response.ok) throw new Error("Failed to fetch post")

  return response.json()
}

// Fetch categories
export async function fetchCategories(): Promise<BlogCategory[]> {
  const response = await fetch("/api/blog/categories")
  if (!response.ok) throw new Error("Failed to fetch categories")

  return response.json()
}

// Admin functions
export async function fetchAdminPosts(params?: {
  page?: number
  limit?: number
  status?: string
}): Promise<PaginatedResponse<BlogPost>> {
  const searchParams = new URLSearchParams()

  if (params?.page) searchParams.set("page", params.page.toString())
  if (params?.limit) searchParams.set("limit", params.limit.toString())
  if (params?.status) searchParams.set("status", params.status)

  const response = await fetch(`/api/blog/admin/posts?${searchParams}`)
  if (!response.ok) throw new Error("Failed to fetch admin posts")

  return response.json()
}

export async function fetchBlogStats() {
  const response = await fetch("/api/blog/admin/stats")
  if (!response.ok) throw new Error("Failed to fetch blog stats")

  return response.json()
}
