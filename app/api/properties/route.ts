import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { IProperty } from "@/interfaces/propertyInterface";
import { PrismaClientKnownRequestError } from "@/lib/generated/prisma/runtime/library";


// Get all properties
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
        orderBy: {
            createdAt: "desc", // Order properties by creation date, newest first
        },
    });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

// Create a new property
export async function POST(request: Request) {
    try {
        
        const body = await request.json()
        const { name, description, country, city, images, pdfUrl } = body
        
        // Validate required fields
        if (!name || !description || !country || !city || !images || !pdfUrl) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }


        // create property data
        const propertyData: Omit<IProperty, 'id' | 'createdAt' | 'updatedAt' > = {
            name,
            description,
            country,
            city,
            images,
            pdfUrl
        }

        // create property in database
        const newProperty = await prisma.property.create({
            data: propertyData
        })

        return NextResponse.json(newProperty, { status: 201 });
    } catch (error) {
        console.error("Failed to create property:", error); // Log the actual error

        if (error instanceof PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            if (error.code === 'P2002') { // Unique constraint violation
                // `error.meta.target` can tell you which field caused it
                const targetFields = error.meta?.target as string[] || ["unknown field"];
                return NextResponse.json(
                    { error: `A property with this ${targetFields.join(', ')} already exists.` },
                    { status: 409 } // Conflict
                );
            }
            // Add more specific Prisma error codes as needed
        } else if (error instanceof SyntaxError && error.message.includes("JSON")) {
            return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
        }
        
        // Generic error for other cases
        return NextResponse.json(
            { error: "An unexpected error occurred. Failed to create property." },
            { status: 500 }
        );
    }
}