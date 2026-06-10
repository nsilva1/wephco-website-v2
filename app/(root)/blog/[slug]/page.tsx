import { format } from 'date-fns';
import { BiTimeFive, BiShow, BiCalendar, BiUser, BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import { fetchPost } from '@/actions/blog';
import Image from 'next/image';

export default async function BlogPostPage({ params }: any) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-24 pb-20">
      
      {/* Header Back Button */}
      <header className="border-b border-primary/10 bg-background-dark/50 backdrop-blur-sm sticky top-20 z-10">
        <div className="container mx-auto px-6 py-4 max-w-4xl flex justify-between items-center">
          <Link 
            href="/blog"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            <BiArrowBack className="text-lg" /> Back to Blog
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <article className="space-y-8">
          
          {/* Post Header */}
          <header className="space-y-6">
            {post.category && (
              <span 
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded bg-[#022618]/30 border border-primary/10 text-primary w-fit inline-block"
              >
                {post.category.name}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-light text-slate-100 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 border-y border-primary/10 py-4">
              <span className="flex items-center gap-2">
                <BiUser className="text-primary text-base" />
                <span>Wephco Executive Desk</span>
              </span>

              <span className="flex items-center gap-2 border-l border-primary/10 pl-6">
                <BiCalendar className="text-primary text-base" />
                <time>
                  {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
                </time>
              </span>

              {post.readTime && (
                <span className="flex items-center gap-2 border-l border-primary/10 pl-6">
                  <BiTimeFive className="text-primary text-base" />
                  <span>{post.readTime} min read</span>
                </span>
              )}

              <span className="flex items-center gap-2 border-l border-primary/10 pl-6">
                <BiShow className="text-primary text-base" />
                <span>{post.views || 0} views</span>
              </span>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-primary/10 shadow-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-invert max-w-none text-slate-300 leading-loose text-base space-y-6 font-light">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, '<br />'),
              }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-primary/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-neutral-dark/10 border border-primary/10 px-3 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
        </article>
      </main>
    </div>
  );
}
