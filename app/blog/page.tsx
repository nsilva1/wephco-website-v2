import { Suspense } from "react"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogPostGrid } from "@/components/blog/blog-post-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogPostSkeleton } from "@/components/blog/blog-post-skeleton"

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string; tag?: string }
}) {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Suspense fallback={<BlogPostSkeleton />}>
              <BlogPostGrid searchParams={searchParams} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
