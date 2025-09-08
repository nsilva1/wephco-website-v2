import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

// Get all affiliates
export async function GET() {
  try {
    const affiliates = await prisma.affiliate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(affiliates);
  } catch (error) {
    return NextResponse.error();
  }
}

// Create new affiliate
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, location } = body;

    if (!name || !email || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newAffiliate = await prisma.affiliate.create({
      data: {
        name,
        email,
        location,
      },
    });

    return NextResponse.json(newAffiliate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register affiliate' },
      { status: 500 }
    );
  }
}
