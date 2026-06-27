import { Suspense } from 'react';
import { BlogPostGrid } from '@/components/blog/blog-post-grid';
import { BlogPostSkeleton } from '@/components/blog/blog-post-skeleton';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pt-28 pb-20">
      <main className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary text-xs font-bold tracking-widest uppercase block">
            Wephco Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-slate-100 leading-tight">
            Our Private{' '}
            <span className="text-primary font-extrabold italic">Blog</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Stay updated with corporate milestones, luxury real estate advisory,
            asset acquisition strategies, and investment insights from our
            executive desk.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Suspense fallback={<BlogPostSkeleton />}>
            <BlogPostGrid />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
