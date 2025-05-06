import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { put } from '@vercel/blob'
import { IProperty } from "@/interfaces/propertyInterface";
import { nanoid } from "nanoid";

// Get all properties
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        agent: {
            select: {
                id: true,
                name: true,
                email: true,
            },
        }
      },
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
        const formData = await request.formData();
        const body = await request.json()
        const { name, description, country, city, address, price } = body
        
        // Validate required fields
        if (!name || !description || !country || !city || !address || !price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // image file uploads
        const imageFiles = formData.getAll("images") as File[];
        const imageUrls: string[] = [];

        for (const file of imageFiles) {
            if(file.size > 0) {
                const filepath = `images/property/${nanoid()}-${file.name}`;
                const blob = await put(filepath, file, {
                    access: 'public',
                    contentType: file.type,
                })
                imageUrls.push(blob.url)
            }
        }

        // create property data
        const propertyData: Omit<IProperty, 'id' | 'createdAt' | 'agent' | 'agentId'> = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            country: formData.get("country") as string,
            city: formData.get("city") as string,
            address: formData.get("address") as string,
            images: imageUrls,
            price: parseFloat(formData.get("price") as string),
            location: formData.get("location") as string,
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