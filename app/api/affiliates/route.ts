import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { Role } from "@/interfaces/userInterface";


// Get all affiliates
export async function GET() {
    try {
        const affiliates = await prisma.user.findMany({
            where: {
                role: {
                    notIn: [Role.ADMIN, Role.SUPERADMIN, Role.SUPPORT],
                }
            },
            orderBy: {
                createdAt: "desc",
        },
        });
        return NextResponse.json(affiliates);
    } catch (error) {
        return NextResponse.error();
    }
}
