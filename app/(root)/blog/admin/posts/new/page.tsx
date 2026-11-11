'use client';

import { PostEditor } from '@/components/blog/admin/post-editor';
import { useAuth } from '@/context/AuthContext';
import { useSessionUser } from '@/hooks/useSessionUser';

export default function NewPostPage() {
  const { user: sessionUser } = useSessionUser();
  const { currentUser } = useAuth();

  // The session copy of the user does not always carry an id, so fall back to
  // the signed-in Firebase user.
  const userId = sessionUser?.id ?? currentUser?.id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <PostEditor userId={userId} />
    </div>
  );
}
