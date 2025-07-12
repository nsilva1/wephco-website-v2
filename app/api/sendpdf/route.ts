import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
// import { IProperty } from "@/interfaces/propertyInterface";

export async function POST(request: Request) {
    try {
        const { email, property } = await request.json();

        // Validate input
        if (!email || !property || !property.pdfUrl) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }



        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            service: 'zoho',
            port: 587,
            secure: false,  // true for port 465, false for other ports
            auth: {
                user: "your-email@example.com",
                pass: "your-email-password",
            },
        });

        // Send the email
        await transporter.sendMail({
            from: "your-email@example.com",
            to: email,
            subject: "Property Request from Wephco",
            text: "As requested, please find attached the PDF for the property you were interested in.",
            html: "<p>Please find the attached PDF document.</p>",
            attachments: [
                {
                    filename: "document.pdf",
                    path: property.pdfUrl,
                },
            ],
        });

        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        
    }
}