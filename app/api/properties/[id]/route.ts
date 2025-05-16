import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";


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
