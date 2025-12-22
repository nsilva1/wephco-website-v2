import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchPosts } from '@/actions/blog';
import { BarChart3, FileText, Eye, TrendingUp } from 'lucide-react';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function BlogAdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const posts = await fetchPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your blog performance and content
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts?.length}</div>
            <p className="text-xs text-muted-foreground">
              All posts in database
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts?.length}</div>
            <p className="text-xs text-muted-foreground">Live on your blog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Unpublished posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts?.reduce((prevPost, post) => prevPost + post.views, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All time views</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts?.splice(0, 3).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.status} • {post.views} views •{' '}
                    {new Date(post.createdAt!).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'DRAFT'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
