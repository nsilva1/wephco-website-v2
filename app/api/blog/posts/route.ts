import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"
import { validateCreatePost } from "@/lib/blogValidation"
import { PostStatus } from "@/lib/generated/prisma"

// GET /api/blog/posts - List published posts with pagination and filtering
export async function GET() {
  try {
    
    const posts = await prisma.post.findMany({
      where: { status: PostStatus.PUBLISHED },
      include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true,
            },
          },
        },
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    })
    

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST /api/blog/posts - Create new post (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = validateCreatePost(body)

    if (!validation.isValid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    const validatedData = validation.data!

    // TODO: Add authentication check here
    // For now, we'll use a default author ID
    // const defaultAuthorId = "default-author-id" // Replace with actual auth logic

    // Generate slug from title if not provided
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = validatedData.content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    const post = await prisma.post.create({
      data: {
        ...validatedData,
        slug,
        readTime,
        authorId: body.authorId,
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
