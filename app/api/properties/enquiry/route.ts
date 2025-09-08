import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { IPropertyEnquiry } from '@/interfaces/propertyInterface';

// Get all enquiries
export async function GET() {
  try {
    const properties = await prisma.propertyEnquiry.findMany({
      orderBy: {
        createdAt: 'desc', // Order properties by creation date, newest first
      },
    });
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// Create a new property enquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, propertyId } = body;

    // Validate required fields
    if (!name || !email || !phone || !propertyId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // create property enquiry data
    const propertyData: Omit<
      IPropertyEnquiry,
      'id' | 'createdAt' | 'propertyId'
    > = {
      name,
      email,
      phone,
    };

    // create property in database
    const newPropertyEnquiry = await prisma.propertyEnquiry.create({
      data: {
        ...propertyData,
        property: {
          connect: {
            id: propertyId,
          },
        },
      },
    });

    return NextResponse.json(newPropertyEnquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
