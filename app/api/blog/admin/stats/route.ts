import { NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"

// GET /api/blog/admin/stats - Get blog statistics (admin only)
export async function GET() {
  try {
    // TODO: Add admin authentication check here

    const [totalPosts, publishedPosts, draftPosts, totalCategories, totalViews, recentPosts] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.category.count(),
      prisma.post.aggregate({
        _sum: { views: true },
      }),
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          views: true,
        },
      }),
    ])

    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalViews: totalViews._sum.views || 0,
      recentPosts,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching blog stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
