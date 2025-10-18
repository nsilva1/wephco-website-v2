import axios from "axios"
import { IBlogPost, IBlogCategory } from "@/interfaces/blogInterface"
import { apiClient, handleApiError } from "@/app/api/apiClient"

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

// POSTS
// create new blog post
/**
 * Creates a new blog post.
 * @param postData - The data for the new post.
 * @returns The created blog post.
 */
export const createBlogPost = async (postData: Partial<IBlogPost>): Promise<IBlogPost> => {
  const URL = '/api/blog/posts'

  try {
    const response = await apiClient.post<IBlogPost>(URL, postData)
    return response.data
  } catch (error) {
    handleApiError(error, "creating post")
    throw error;
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
}): Promise<PaginatedResponse<IBlogPost>> {
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


/**
 * Fetches a single blog post by its slug.
 * @param slug - The slug of the post to fetch.
 * @returns The requested blog post.
 */
export const fetchPost = async(slug: string): Promise<IBlogPost> => {
  const URL = `/api/blog/posts/${slug}`

  try {
    const response = await apiClient.get<IBlogPost>(URL)
    return response.data
  } catch (error) {
    handleApiError(error, `fetching post with slug: ${slug}`)
    throw error;
  }
  
}


// CATEGORIES
// Fetch categories
export const fetchCategories = async (): Promise<IBlogCategory[]> => {
  const URL = '/api/blog/categories'
  
  try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching consultations:", error);
        throw error;
    }
}

// Create new category
export const createCategory = async (data: Partial<IBlogCategory>): Promise<IBlogCategory> => {
  const URL = '/api/blog/categories'

  try {
        const response = await axios.post(URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

// Admin functions
export async function fetchAdminPosts(params?: {
  page?: number
  limit?: number
  status?: string
}): Promise<PaginatedResponse<IBlogPost>> {
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
