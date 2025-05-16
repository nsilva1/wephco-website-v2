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

        const body = await request.json()
        const { name, email, phoneNumber, status, message } = body
        
        // Validate required fields
        if (!name || !email || !phoneNumber) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }


        // create contact request data
        const contactData: IContactUs = {
            name,
            email,
            phoneNumber,
            message,
            status
        }

        // create contact request in database
        const newContactRequest = await prisma.contact.create({
            data: contactData,
        });

        return NextResponse.json(newContactRequest, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}