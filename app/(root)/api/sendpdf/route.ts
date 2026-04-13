import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, pdfUrl, propertyName } = await request.json();

    if (!email || !pdfUrl) {
      return NextResponse.json({ error: 'Email and PDF URL are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Property PDF Request: ${propertyName || 'Wephco Property'}`,
      text: 'Thank you for your interest! Please find attached the requested PDF.',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hello,</h2>
          <p>Thank you for your inquiry regarding <strong>${propertyName || 'our property'}</strong>.</p>
          <p>As requested, please find the property details attached as a PDF.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>Wephco Team</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: `${propertyName ? propertyName.replace(/\s+/g, '_') : 'Property_Details'}.pdf`,
          path: pdfUrl,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
