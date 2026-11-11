'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchPostById } from '@/actions/blog';
import { PostEditor } from '@/components/blog/admin/post-editor';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { IBlogPost } from '@/interfaces/blogInterface';

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchPostById(id)
      .then((result) => {
        if (!cancelled) setPost(result);
      })
      .catch((error) => {
        console.error('Failed to load post:', error);
        if (!cancelled) toast.error('Failed to load post');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16 space-y-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="text-muted-foreground">
          This post does not exist or could not be loaded.
        </p>
        <Link href="/blog/admin/posts">
          <Button variant="outline">Back to posts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <p className="text-muted-foreground">Make changes to your blog post</p>
      </div>

      {/* The author is kept from the original post, so no userId is needed */}
      <PostEditor key={post.id} userId={post.authorId} post={post} />
    </div>
  );
}
