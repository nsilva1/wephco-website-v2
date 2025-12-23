import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';


export async function DELETE(
  request: NextRequest,
  context: any
) {
  try {
    // TODO: Add admin authentication check here

    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await prisma.post.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
