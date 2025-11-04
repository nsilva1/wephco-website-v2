import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"

// GET /api/blog/admin/posts - List all posts including drafts (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    const skip = (page - 1) * limit

    const where: any = {}
    if (status) {
      where.status = status
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
        orderBy: {
          updatedAt: "desc",
        },
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
    console.error("Error fetching admin posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
