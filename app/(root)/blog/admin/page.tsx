'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchPosts } from '@/actions/blog';
import { BarChart3, FileText, Eye, TrendingUp } from 'lucide-react';
import { useSessionUser } from '@/hooks/useSessionUser';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loader } from '@/components/Loader';

export default function BlogAdminPage() {
  const router = useRouter();
  const { user: currentUser, loading: sessionLoading } = useSessionUser();
  const { role, loading: authLoading } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch admin stats posts:', error);
      toast.error('Failed to load blog dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sessionLoading && !authLoading) {
      if (!currentUser) {
        toast.error('Please login to access the blog admin dashboard');
        router.push('/auth/login');
      } else {
        loadData();
      }
    }
  }, [currentUser, sessionLoading, authLoading, router, loadData]);

  if (sessionLoading || authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-dark">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto min-h-screen bg-background-dark text-slate-100 pt-28">
      <div>
        <h1 className="text-3xl font-light">
          Blog <span className="font-extrabold text-primary">Dashboard</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Overview of your blog performance and content
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#022618]/15 border-primary/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts?.length || 0}</div>
            <p className="text-xs text-slate-400">All posts in database</p>
          </CardContent>
        </Card>

        <Card className="bg-[#022618]/15 border-primary/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts?.filter((p) => p.status === 'PUBLISHED').length || 0}
            </div>
            <p className="text-xs text-slate-400">Live on your blog</p>
          </CardContent>
        </Card>

        <Card className="bg-[#022618]/15 border-primary/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts?.filter((p) => p.status === 'DRAFT').length || 0}
            </div>
            <p className="text-xs text-slate-400">Unpublished posts</p>
          </CardContent>
        </Card>

        <Card className="bg-[#022618]/15 border-primary/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts?.reduce(
                (prevPost, post) => prevPost + (post.views || 0),
                0
              )}
            </div>
            <p className="text-xs text-slate-400">All time views</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="bg-[#022618]/15 border-primary/10 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts?.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border border-primary/15 rounded-lg bg-neutral-dark/10">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {post.status} • {post.views || 0} views •{' '}
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md ${
                      post.status === 'PUBLISHED'
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                    }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-center py-6 text-slate-400 text-sm font-light">
                No posts found in database.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
