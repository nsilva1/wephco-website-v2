import { NextResponse } from "next/server";
import { IConsultation } from "@/interfaces/userInterface";
import { prisma } from "@/prisma/prisma";


// Get all consultations
export async function GET() {
    try {
        const consultations = await prisma.consultation.findMany({
            orderBy: {
                createdAt: "desc",
        },
        });
        return NextResponse.json(consultations);
    } catch (error) {
        return NextResponse.error();
    }
}

// create new consultation
export async function POST(request: Request) {
    const body = await request.json();

    const consultationData: IConsultation = {
        service: body.service,
        meetingDate: body.meetingDate,
        meetingLocation: body.meetingLocation,
        phoneNumber: body.phoneNumber,
        email: body.email,
        organizationName: body.organizationName,
        name: body.name,
        details: body.details,
        preferredModeOfContact: body.preferredModeOfContact,
        status: false
    };

    try {
        const consultation = await prisma.consultation.create({
            data: consultationData,
        });
        return NextResponse.json(consultation);
    } catch (error) {
        return NextResponse.error();
    }
}

