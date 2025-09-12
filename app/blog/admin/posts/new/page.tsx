import { PostEditor } from "@/components/blog/admin/post-editor"

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">Write and publish a new blog post</p>
      </div>

      <PostEditor />
    </div>
  )
}
