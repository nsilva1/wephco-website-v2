import { NextResponse } from "next/server";
import { ISellEnquiry } from "@/interfaces/propertyInterface";
import { prisma } from "@/prisma/prisma";
import { format } from "path";

// Get all enquiries
export async function GET() {
  try {
    const enquiries = await prisma.sellEnquiry.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })
    return NextResponse.json(enquiries, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 });
  }
}

// Create a new sell enquiry
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const body = await request.json()
        const { name, email, phone, address, timeline } = body
        
        // Validate required fields
        if (!name || !email || !phone || !address || !timeline) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }


        // create contact request data
        const enquiryData: Omit<ISellEnquiry, 'id' | 'createdAt'> = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
            timeline: formData.get("timeline") as string,
            status: formData.get("status") as unknown as boolean,
        }

        // create contact request in database
        const newEnquiry = await prisma.sellEnquiry.create({
            data: enquiryData,
        });

        return NextResponse.json(newEnquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
    }
}