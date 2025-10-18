import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"
import { validateCreateCategory } from "@/lib/blogValidation"

// GET /api/blog/categories - List all categories with post counts
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        posts: true
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error();
  }
}

// export async function GET() {
//   try {
//     const categories = await prisma.category.findMany({
//       include: {
//         _count: {
//           select: {
//             posts: {
//               where: {
//                 status: "PUBLISHED",
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         name: "asc",
//       },
//     })

//     return NextResponse.json(categories)
//   } catch (error) {
//     console.error("Error fetching categories:", error)
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
//   }
// }

// POST /api/blog/categories - Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = validateCreateCategory(body)

    if (!validation.isValid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    const validatedData = validation.data!

    // TODO: Add admin authentication check here

    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const category = await prisma.category.create({
      data: {
        ...validatedData,
        slug,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

