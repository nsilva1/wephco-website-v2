'use server';

import { Resend } from 'resend';
import { BookingConfirmationEmail, BookingConfirmationEmailProps } from '@/emails/BookingConfirmationEmail';

const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_DEV_API_KEY;

// Initialize Resend client
const resend = new Resend(resendApiKey);

// Default sender email (Use onboard@resend.dev during testing or custom domain when verified)
const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'WEPHCO <onboarding@resend.dev>';

export interface SendBookingEmailParams {
  toEmail: string;
  props: BookingConfirmationEmailProps;
  subject?: string;
  fromEmail?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Server Action to send a Booking Confirmation Email via Resend.
 */
export async function sendBookingConfirmationEmail({
  toEmail,
  props,
  subject,
  fromEmail,
}: SendBookingEmailParams): Promise<SendEmailResult> {
  try {
    if (!resendApiKey) {
      console.error('Resend API key is missing. Please check RESEND_API_KEY or RESEND_DEV_API_KEY in .env');
      return {
        success: false,
        error: 'Email service configuration error: Missing Resend API key',
      };
    }

    if (!toEmail) {
      return {
        success: false,
        error: 'Recipient email (toEmail) is required.',
      };
    }

    const emailSubject =
      subject ||
      `Booking Confirmation - ${props.bookingId || props.serviceName || 'WEPHCO Consultation'}`;

    const sender = fromEmail || DEFAULT_FROM_EMAIL;

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [toEmail],
      subject: emailSubject,
      react: BookingConfirmationEmail(props),
    });

    if (error) {
      console.error('Error sending booking confirmation email via Resend:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email via Resend',
      };
    }

    console.log(`Booking confirmation email sent successfully to ${toEmail}. Message ID: ${data?.id}`);
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err: any) {
    console.error('Unexpected error in sendBookingConfirmationEmail:', err);
    return {
      success: false,
      error: err?.message || 'An unexpected error occurred while sending email',
    };
  }
}

export interface GenericSendEmailParams {
  to: string | string[];
  subject: string;
  react?: React.ReactNode;
  html?: string;
  text?: string;
  from?: string;
}

/**
 * Generic Server Action to send any email via Resend.
 */
export async function sendEmail({
  to,
  subject,
  react,
  html,
  text,
  from,
}: GenericSendEmailParams): Promise<SendEmailResult> {
  try {
    if (!resendApiKey) {
      return {
        success: false,
        error: 'Email service configuration error: Missing Resend API key',
      };
    }

    const recipient = Array.isArray(to) ? to : [to];
    const sender = from || DEFAULT_FROM_EMAIL;

    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      subject,
      ...(react ? { react } : {}),
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    } as Parameters<typeof resend.emails.send>[0]);

    if (error) {
      console.error('Error sending email via Resend:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err: any) {
    console.error('Unexpected error in sendEmail action:', err);
    return {
      success: false,
      error: err?.message || 'Failed to send email',
    };
  }
}
