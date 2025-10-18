'use client'

import { fetchPosts } from "@/actions/blog"
import { BlogPostCard } from "./blog-post-card"
import { BlogPagination } from "./blog-pagination"
import { BlogPostSkeleton } from "./blog-post-skeleton"
import { useState, useCallback, useEffect } from "react"
import { IBlogPost } from "@/interfaces/blogInterface"
import { sampleBlogPosts } from "@/interfaces/blogInterface"


export const BlogPostGrid = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 10, limit: 5, total: 50 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);


  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { posts, pagination } = await fetchPosts()
      setPosts(posts || sampleBlogPosts)
      setPagination(pagination)
    } catch (error) {
      setPosts([]);
      setError(`Error loading posts: ${error}`)
    } finally {
      setLoading(false);
    }
  }, [currentPage])


  useEffect(() => {
    loadPosts()
  }, [])

  if (loading) return <BlogPostSkeleton />;

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }


  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
          <p className="text-muted-foreground">
            No posts available at the moment. Please check back later.
          </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>

      {/* Pagination */}
      {/* {pagination.totalPages > 1 && <BlogPagination pagination={pagination} onPageChange={setCurrentPage} />} */}
    </div>
  )
}
