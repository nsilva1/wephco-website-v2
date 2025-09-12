import { fetchPosts } from "@/actions/blog"
import { BlogPostCard } from "./blog-post-card"
import { BlogPagination } from "./blog-pagination"

interface BlogPostGridProps {
  searchParams: {
    page?: string
    category?: string
    search?: string
    tag?: string
    featured?: string
  }
}

export async function BlogPostGrid({ searchParams }: BlogPostGridProps) {
  const resolvedParams = await searchParams // 👈 if it's a Promise

  const page = Number.parseInt(resolvedParams.page || "1")
  const category = resolvedParams.category
  const search = resolvedParams.search
  const tag = resolvedParams.tag
  const featured = resolvedParams.featured === "true"

  const { posts, pagination } = await fetchPosts({
    page,
    limit: 9,
    category,
    search,
    tag,
    featured,
  })

  if (posts?.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
        <p className="text-muted-foreground">
          {search ? `No posts match "${search}"` : "No posts available at the moment."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {search
              ? `Search results for "${search}"`
              : category
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} Posts`
                : tag
                  ? `Posts tagged "${tag}"`
                  : featured
                    ? "Featured Posts"
                    : "Latest Posts"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {pagination.total} {pagination.total === 1 ? "post" : "posts"} found
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && <BlogPagination pagination={pagination} />}
    </div>
  )
}
