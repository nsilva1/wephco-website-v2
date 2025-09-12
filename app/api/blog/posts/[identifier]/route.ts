import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { validateUpdatePost } from "@/lib/blogValidation";

// helper to detect if string is UUID
function looksLikeId(str: string) {
  // change to your actual ID format check (uuid, cuid, etc.)
  return /^[0-9a-fA-F-]{24,}$/.test(str); // works for MongoDB ObjectId-like or UUID
}

// GET /api/blog/posts/[identifier] - Get post by slug or id
export async function GET(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const { identifier } = params;

    let post;

    if (looksLikeId(identifier)) {
      // fetch by id
      post = await prisma.post.findUnique({
        where: { id: identifier, status: "PUBLISHED" },
        include: {
          author: { select: { id: true, name: true } },
          category: { select: { id: true, name: true, slug: true, color: true } },
        },
      });
    } else {
      // fetch by slug
      post = await prisma.post.findUnique({
        where: { slug: identifier, status: "PUBLISHED" },
        include: {
          author: { select: { id: true, name: true } },
          category: { select: { id: true, name: true, slug: true, color: true } },
        },
      });
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // increment views only for GET
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT /api/blog/posts/[identifier] - Update post (id only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const { identifier: id } = params;

    const body = await request.json();
    const validation = validateUpdatePost(body);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const validatedData = validation.data!;

    const updateData: any = { ...validatedData };

    if (validatedData.title) {
      updateData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    if (validatedData.status === "PUBLISHED") {
      const existingPost = await prisma.post.findUnique({
        where: { id },
        select: { status: true, publishedAt: true },
      });

      if (existingPost?.status !== "PUBLISHED" && !existingPost?.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    if (validatedData.content) {
      const wordCount = validatedData.content.split(/\s+/).length;
      updateData.readTime = Math.ceil(wordCount / 200);
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true, color: true } },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/blog/posts/[identifier] - Delete post (id only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const { identifier: id } = params;

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
