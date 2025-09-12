import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"
import { validateCreatePost } from "@/lib/blogValidation"
import { PostStatus } from "@/lib/generated/prisma"

// GET /api/blog/posts - List published posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured") === "true"

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: PostStatus.PUBLISHED,
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (tag) {
      where.tags = {
        has: tag,
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ]
    }

    if (featured) {
      where.featured = true
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
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
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
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
    const defaultAuthorId = "default-author-id" // Replace with actual auth logic

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
        authorId: defaultAuthorId,
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
      },
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
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
