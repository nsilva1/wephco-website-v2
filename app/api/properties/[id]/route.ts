import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { withErrorHandler } from "@/lib/withErrorHandler";


// Get a single property by ID
export async function GET(request: Request) {
  
  const id = request.url.split("/").pop() || ""; // Extracting ID from the URL

  if (!id) {
    return NextResponse.json({ error: "Property ID is missing" }, { status: 400 });
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

// Delete a property
export const DELETE = withErrorHandler(async (request: Request) => {
    const { id } = await request.json();

    // Validate required field
    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
    }

    // Delete property from database
        const deletedProperty = await prisma.property.delete({
            where: { id }
        });

        return NextResponse.json(deletedProperty, { status: 200 });

})