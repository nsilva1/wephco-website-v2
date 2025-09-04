import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "./generated/prisma/runtime/library";

type RouteHandler = (request: Request) => Promise<NextResponse>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
    return async (request: Request) => {
        try {
            return await handler(request);
        } catch (error) {
            console.error("API Error:", error);

            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2025':
                        return NextResponse.json({ error: "Record not found" }, { status: 404 });
                    case 'P2002':
                        const targetFields = error.meta?.target as string[] || ["unknown field"];
                        return NextResponse.json(
                            { error: `Unique constraint violation on ${targetFields.join(', ')}` },
                            { status: 409 } // Conflict
                        );
                    case 'P2003':
                        return NextResponse.json({ error: "Foreign key constraint violation" }, { status: 409 });
                    default:
                        return NextResponse.json({ error: "Database error occurred" }, { status: 500 });
                }
            } else if (error instanceof SyntaxError && error.message.includes("JSON")) {
                return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
            }
            // Handle other types of errors
            return NextResponse.json(
                { error: "An unexpected error occurred." },
                { status: 500 }
            );
        }
    };
}