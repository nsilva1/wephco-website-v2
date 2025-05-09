import { NextResponse } from "next/server";
import { IContactUs } from "@/interfaces/userInterface";
import { prisma } from "@/prisma/prisma";

// Get all contact requests
export async function GET() {
  try {
    const contactRequests = await prisma.contact.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })
    return NextResponse.json(contactRequests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact requests" }, { status: 500 });
  }
}

// Create a new contact request
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const body = await request.json()
        const { name, email, phoneNumber, status, message } = body
        
        // Validate required fields
        if (!name || !email || !phoneNumber || !status || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }


        // create contact request data
        const contactData: Omit<IContactUs, 'id' | 'createdAt'> = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            message: formData.get("message") as string,
            status: formData.get("status") as unknown as boolean,
        }

        // create contact request in database
        const newContactRequest = await prisma.contact.create({
            data: contactData,
        });

        return NextResponse.json(newContactRequest, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
    }
}