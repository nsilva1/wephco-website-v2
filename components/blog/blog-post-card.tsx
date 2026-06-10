import Link from "next/link";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { IBlogPost } from "@/interfaces/blogInterface";

export function BlogPostCard({ title, slug, excerpt, coverImage, category, tags, publishedAt, readTime }: Partial<IBlogPost>) {
  return (
    <div className="bg-[#022618]/15 border border-primary/10 rounded-2xl overflow-hidden hover:border-primary/45 transition-all duration-300 flex flex-col justify-between h-full group">
      
      {/* Cover Image */}
      {coverImage ? (
        <div className="aspect-video overflow-hidden relative border-b border-primary/10">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-neutral-dark/30 border-b border-primary/10 flex items-center justify-center">
          <div className="text-4xl font-light text-primary/30">{title?.charAt(0)}</div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {category && (
            <span 
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded bg-[#022618]/30 border border-primary/10 text-primary w-fit"
            >
              {category.name}
            </span>
          )}
          
          <div className="flex flex-wrap gap-1">
            {tags!.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Link */}
        <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-slate-400 text-xs leading-relaxed font-light line-clamp-3">
            {excerpt}
          </p>
        )}
      </div>

      {/* Footer Meta */}
      <div className="px-6 py-4 border-t border-primary/10 bg-[#022618]/5 flex items-center justify-between text-[10px] text-slate-500 font-medium">
        
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="text-primary text-sm" />
            <time>{publishedAt ? format(new Date(publishedAt), "MMM d, yyyy") : 'Draft'}</time>
          </span>

          {readTime && (
            <span className="flex items-center gap-1.5 border-l border-primary/10 pl-4">
              <Clock className="text-primary text-sm" />
              <span>{readTime}m read</span>
            </span>
          )}
        </div>

        <Link 
          href={`/blog/${slug}`}
          className="text-primary hover:text-white font-bold uppercase tracking-wider transition-colors hover:translate-x-0.5 duration-200"
        >
          Read More
        </Link>
      </div>

    </div>
  );
}
