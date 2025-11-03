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
export const createBlogPost = async (postData: Omit<IBlogPost, 'slug' | 'views' | 'readTime' | 'metaTitle' | 'metaDescription' | 'publishedAt'>): Promise<IBlogPost> => {
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
export const fetchPosts = async(): Promise<IBlogPost[]>  =>{
    const URL = '/api/blog/posts'

    try {
      const response = await apiClient.get(URL);
      return response.data;
    } catch (error) {
      handleApiError(error, "fetching posts");
      throw error;
    }
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
        const response = await apiClient.get(URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

// Create new category
export const createCategory = async (data: Partial<IBlogCategory>): Promise<IBlogCategory> => {
  const URL = '/api/blog/categories'

  try {
        const response = await apiClient.post(URL, data);
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
