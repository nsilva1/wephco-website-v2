import Link from "next/link"
import { format } from "date-fns"
import { Clock, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IBlogPost } from "@/interfaces/blogInterface"


export function BlogPostCard({ title, slug, excerpt, coverImage, category, tags, author, publishedAt, readTime }: Partial<IBlogPost>) {
  return (
    <div>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Cover Image */}
      {coverImage ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary/30">{title?.charAt(0)}</div>
        </div>
      )}

      <CardHeader className="pb-3">
        {/* Category Badge */}
        {category && (
          <Badge
            variant="secondary"
            className="w-fit mb-2 font-outfit"
            style={{ color: category.color! }}
          >
            {category.name}
          </Badge>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-balance leading-tight group-hover:text-primary transition-colors font-outfit">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Excerpt */}
        {excerpt && <p className="text-muted-foreground text-sm leading-relaxed text-pretty font-outfit">{excerpt}</p>}

        {/* Tags */}
        {/* {tags!.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags!.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge variant="outline" className="text-xs hover:bg-accent hover:text-accent-foreground">
                  #{tag}
                </Badge>
              </Link>
            ))}
            {tags!.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags!.length - 3}
              </Badge>
            )}
          </div>
        )} */}
      </CardContent>

      <CardFooter className="pt-3 border-t flex items-center justify-between">
        {/* Post Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{author!.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={new Date(publishedAt!).toUTCString()}>{format(new Date(publishedAt!), "MMM d")}</time>
          </div>

          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readTime}m</span>
            </div>
          )}
        </div>

        {/* Read More Button */}
        <Link href={`/blog/${slug}`}>
          <Button size="sm" variant="secondary" className="text-primary hover:text-primary-foreground hover:bg-primary">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  )
}
