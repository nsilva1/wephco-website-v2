import React, { Suspense } from 'react';
import '../globals.css';
import { Metadata } from 'next';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { BlogPostSkeleton } from '@/components/blog/blog-post-skeleton';
import { BlogHeader } from '@/components/blog/blog-header';

export const metadata: Metadata = {
  title: 'Wephco - Buy, Sell Luxury Homes',
  description: 'Your Gateway to Prime Global Real Estate',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background">
              <BlogHeader />
        
              <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-3">
                    <Suspense fallback={<BlogPostSkeleton />}>
                      {children}
                    </Suspense>
                  </div>
        
                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <BlogSidebar />
                  </div>
                </div>
              </main>
            </div>
      </body>
    </html>
  );
}
