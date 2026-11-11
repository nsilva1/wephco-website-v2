'use client'

import { fetchPosts } from "@/actions/blog"
import { BlogPostCard } from "./blog-post-card"
import { BlogPostSkeleton } from "./blog-post-skeleton"
import { useState, useEffect } from "react"
import { IBlogPost } from "@/interfaces/blogInterface"


export const BlogPostGrid = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false

    fetchPosts()
      .then((result) => {
        if (!cancelled) setPosts(result ?? [])
      })
      .catch((err) => {
        console.error("Error loading posts:", err)
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <BlogPostSkeleton />;

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-100">Something went wrong</h2>
        <p className="text-slate-400">
          We could not load the blog posts. Please refresh the page or try again later.
        </p>
      </div>
    );
  }


  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-100">No posts found</h2>
          <p className="text-slate-400">
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
    </div>
  )
}
