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
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        status: body.status,
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

