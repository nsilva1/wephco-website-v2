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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white dark:bg-gray-800 font-outfit">
          <BlogHeader />
          <main className="container mx-auto">
            <div className="">
              {/* Main Content */}
              <div className="">
                <Suspense fallback={<BlogPostSkeleton />}>{children}</Suspense>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
