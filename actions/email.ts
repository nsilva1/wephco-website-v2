'use server';

import React from 'react';
import { Resend } from 'resend';
import { BookingConfirmationEmailProps } from '@/emails/BookingConfirmationEmail';
import { WaitlistConfirmationEmail, WaitlistConfirmationEmailProps } from '@/emails/WaitlistConfirmationEmail';
import { EMAIL_TEMPLATE_IDS } from '@/lib/constants';

const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_DEV_API_KEY;

// Initialize Resend client
const resend = new Resend(resendApiKey);

// Default sender email (Use onboard@resend.dev during testing or custom domain when verified)
const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'WEPHCO <support@wephco.com>';

export interface SendBookingEmailParams {
  toEmail: string;
  props: BookingConfirmationEmailProps;
  subject?: string;
  fromEmail?: string;
}

export interface SendWaitlistEmailParams {
  toEmail: string;
  props: WaitlistConfirmationEmailProps;
  subject?: string;
  fromEmail?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface SendPropertyInquiryEmailParams {
  toEmail: string;
  username: string;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  property?: any;
  propertyLink?: string;
}

/**
 * Server Action to send a Booking Confirmation Email via Resend.
 */
export async function sendBookingConfirmationEmail({
  toEmail,
  props
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

    console.log('Sending Email...');

    const { data, error } = await resend.emails.send({
      to: toEmail,
      template: {
        id: '997873ab-0faf-4d49-b2c2-a3532434a668',
        variables: {
          customerName: props.customerName as string,
          bookingID: props.bookingId as string,
          serviceName: props.serviceName as string,
          appointmentDate: props.bookingDate as string,
          appointmentTime: props.bookingTime as string,
          meetingLocation: props.meetingLocation as string,
          meetingLink: props.meetingLink as string,
          advisorName: props.consultantName as string,
          advisorRole: props.consultantRole as string,
          year: '2026',
        },
      },
    });

    console.log('Email sent:', data);

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

/**
 * Server Action to send a Project Waitlist Confirmation Email via Resend.
 */
export async function sendWaitlistEmail({
  toEmail,
  props,
  subject,
  fromEmail,
}: SendWaitlistEmailParams): Promise<SendEmailResult> {
  return sendEmail({
    to: toEmail,
    subject: subject || `VIP Waitlist Access Confirmed - ${props.projectName || 'The Canopies at Yas Point'}`,
    react: React.createElement(WaitlistConfirmationEmail, props),
    from: fromEmail,
  });
}

/**
 * Server action to send email after a user uploads a property
 */
export async function sendPropertyUploadEmail({
  toEmail,
  username
}: { toEmail: string, username: string }): Promise<SendEmailResult> {
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

    console.log('Sending Property Upload Email...');

    const { data, error } = await resend.emails.send({
      to: toEmail,
      template: {
        id: EMAIL_TEMPLATE_IDS.PROPERTY_UPLOAD,
        variables: {
          username: username,
        },
      },
    });

    console.log('Email sent:', data);

    if (error) {
      console.error('Error sending property upload email via Resend:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email via Resend',
      };
    }

    console.log(`Property Upload email sent successfully to ${toEmail}. Message ID: ${data?.id}`);
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err: any) {
    console.error('Unexpected error in sendPropertyUploadEmail:', err);
    return {
      success: false,
      error: err?.message || 'An unexpected error occurred while sending email',
    };
  }
}

/**
 * Server action to send email to people who indicate an interest to buy a property
 */
export async function sendPropertyInquiryEmail({
  toEmail,
  username,
  agentName = 'Wephco',
  agentPhone = '+234 800 WEPHCO',
  agentEmail = 'support@wephco.com',
  property,
  propertyLink,
}: SendPropertyInquiryEmailParams): Promise<SendEmailResult> {
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

    console.log('Sending Property Inquiry Email...');

    const { data, error } = await resend.emails.send({
      to: toEmail,
      template: {
        id: EMAIL_TEMPLATE_IDS.PROPERTY_INQUIRY,
        variables: {
          buyerName: username,
          agentName: agentName,
          agentPhone: agentPhone,
          agentEmail: agentEmail,
          propertyTitle: property.title,
          propertyLocation: property.location,
          propertyPrice: property.price,
          propertyImage: property.images[0],
          propertyLink: propertyLink ?? '',
        },
      },
    });

    console.log('Property inquiry email sent:', data);

    if (error) {
      console.error('Error sending property inquiry email via Resend:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email via Resend',
      };
    }

    console.log(`Property Inquiry email sent successfully to ${toEmail}. Message ID: ${data?.id}`);
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err: any) {
    console.error('Unexpected error in sendPropertyInquiryEmail:', err);
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
