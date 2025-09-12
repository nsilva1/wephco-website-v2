import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Clock, Eye, Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchPost } from "@/actions/blog"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await fetchPost(params.slug)

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <article>
            {/* Post Header */}
            <header className="mb-8">
              {post.category && (
                <Badge
                  variant="secondary"
                  className="mb-4"
                  style={{ backgroundColor: post.category.color + "20", color: post.category.color }}
                >
                  {post.category.name}
                </Badge>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 leading-tight">{post.title}</h1>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground text-pretty mb-6 leading-relaxed">{post.excerpt}</p>
              )}

              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt!), "MMMM d, yyyy")}</time>
                </div>

                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
                className="leading-relaxed"
              />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
