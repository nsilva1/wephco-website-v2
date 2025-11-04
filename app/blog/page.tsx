import { Suspense } from "react"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogPostSkeleton } from "@/components/blog/blog-post-skeleton"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Main Content */}
          <div className="">
            <Suspense fallback={<BlogPostSkeleton />}>
              <BlogPostGrid />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
