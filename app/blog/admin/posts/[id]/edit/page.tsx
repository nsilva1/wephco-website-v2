import { notFound } from "next/navigation"
import { PostEditor } from "@/components/blog/admin/post-editor"

// This would fetch the post data in a real implementation
async function getPost(id: string) {
  // TODO: Implement post fetching by ID
  return null
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <p className="text-muted-foreground">Make changes to your blog post</p>
      </div>

      <PostEditor post={post} />
    </div>
  )
}
