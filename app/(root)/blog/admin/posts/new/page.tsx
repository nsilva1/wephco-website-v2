'use client';

import { PostEditor } from '@/components/blog/admin/post-editor';
import { useAuth } from '@/context/AuthContext';

export default function NewPostPage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <PostEditor userId={currentUser?.uid} />
    </div>
  );
}
