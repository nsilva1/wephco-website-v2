'use client';

import { PostEditor } from '@/components/blog/admin/post-editor';
import { useSession } from 'next-auth/react';

export default async function NewPostPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <PostEditor userId={session?.user.id} />
    </div>
  );
}
