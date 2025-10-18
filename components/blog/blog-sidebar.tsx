'use client'

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchCategories, fetchPosts } from "@/actions/blog"
import { useState, useCallback, useEffect } from "react"
import { IBlogCategory } from "@/interfaces/blogInterface"

const BlogSidebar = () => {
  const [categories, setCategories] = useState<IBlogCategory[]>([])
  // const [categories, recentPosts] = await Promise.all([fetchCategories(), fetchPosts({ limit: 5 })])

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?category=${category.slug}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span className="font-medium">{category.name}</span>
              <Badge variant="secondary" style={{ backgroundColor: category.color + "20" }}>
                {category.posts?.length}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Recent Posts */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentPosts.posts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <div className="space-y-1">
                <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {post.author.name} • {post.readTime}m read
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card> */}

      {/* Newsletter Signup */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Get the latest posts delivered right to your inbox.</p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="w-full bg-primary text-primary-foreground px-3 py-2 text-sm rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { BlogSidebar }