import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { IProperty } from "@/interfaces/propertyInterface";


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

        // image file uploads
        // const imageFiles = formData.getAll("images") as File[];
        // const imageUrls: string[] = [];

        // for (const file of imageFiles) {
        //     if(file.size > 0) {
        //         const filepath = `images/property/${nanoid()}-${file.name}`;
        //         const blob = await put(filepath, file, {
        //             access: 'public',
        //             contentType: file.type,
        //         })
        //         imageUrls.push(blob.url)
        //     }
        // }

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
        return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
    }
}