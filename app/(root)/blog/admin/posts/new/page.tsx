'use client';

import { PostEditor } from '@/components/blog/admin/post-editor';
import { useSessionUser } from '@/hooks/useSessionUser';

export default function NewPostPage() {
  const { user: currentUser } = useSessionUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <PostEditor userId={currentUser?.id} />
    </div>
  );
}
