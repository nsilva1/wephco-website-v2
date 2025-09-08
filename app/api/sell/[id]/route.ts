import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

// Get a single enquiry by ID
export async function GET(request: Request) {
  const id = request.url.split('/').pop() || ''; // Extracting ID from the URL

  try {
    const enquiry = await prisma.sellEnquiry.findUnique({
      where: { id },
    });
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json(enquiry, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch enquiry' },
      { status: 500 }
    );
  }
}
