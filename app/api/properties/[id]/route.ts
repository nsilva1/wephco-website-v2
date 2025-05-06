import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

// Get a single property by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}