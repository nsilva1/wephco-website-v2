import { format } from "date-fns"
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchPosts } from "@/actions/blog"



export async function AdminPostsTable() {
  

  const posts = await fetchPosts()

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{post.title}</div>
                  {post.featured && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={post.status === "PUBLISHED" ? "default" : post.status === "DRAFT" ? "secondary" : "outline"}
                >
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>
                {post.category ? (
                  <Badge
                    variant="outline"
                    style={{ backgroundColor: post.category.color + "20", color: 'blanchedalmond' }}
                  >
                    {post.category.name}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">No category</span>
                )}
              </TableCell>
              <TableCell>{post.author?.name}</TableCell>
              <TableCell>{post.views}</TableCell>
              <TableCell>{format(new Date(post.createdAt!), "MMM d, yyyy")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/blog/${post.slug}`} className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/blog/admin/posts/${post.id}/edit`} className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
