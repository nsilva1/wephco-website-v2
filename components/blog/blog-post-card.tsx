import Link from "next/link"
import { format } from "date-fns"
import { Clock, Eye, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/actions/blog"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Cover Image */}
      {post.coverImage ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary/30">{post.title.charAt(0)}</div>
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Category Badge */}
        {post.category && (
          <Badge
            variant="secondary"
            className="w-fit mb-2"
            style={{ backgroundColor: post.category.color + "20", color: post.category.color }}
          >
            {post.category.name}
          </Badge>
        )}

        {/* Featured Badge */}
        {post.featured && (
          <Badge variant="default" className="w-fit mb-2 bg-accent">
            Featured
          </Badge>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-balance leading-tight group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Excerpt */}
        {post.excerpt && <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{post.excerpt}</p>}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge variant="outline" className="text-xs hover:bg-accent hover:text-accent-foreground">
                  #{tag}
                </Badge>
              </Link>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t flex items-center justify-between">
        {/* Post Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.author.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt!), "MMM d")}</time>
          </div>

          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}m</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{post.views}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Link href={`/blog/${post.slug}`}>
          <Button size="sm" variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
