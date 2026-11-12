// Server-only: who is emailed when something happens on an event.
//
// The addresses live in their own collection, keyed by event id, instead of on
// the event document. Event documents are read directly by the public event
// pages, so anything stored on them is visible to every visitor.
//
// This file is deliberately not a 'use server' module: nothing here should be
// callable from the browser.

import React from 'react';
import { db } from '@/firebase/firebaseConfig';
import { sendEmail } from '@/actions/email';
import {
  EventReservationEmail,
  EventReservationEmailProps,
} from '@/emails/EventReservationEmail';
import { parseNotificationEmails } from '@/lib/notificationEmails';

const COLLECTION_NAME = 'eventNotificationSettings';

/** The saved addresses for an event as a comma-separated string, or '' if none. */
export const getEventNotificationEmail = async (eventId: string): Promise<string> => {
  const doc = await db.collection(COLLECTION_NAME).doc(eventId).get();
  const emails = doc.data()?.emails;
  return Array.isArray(emails) ? emails.join(', ') : '';
};

/** Saves the addresses for an event. An empty value removes them. */
export const saveEventNotificationEmail = async (
  eventId: string,
  value: string | null | undefined
): Promise<void> => {
  const { valid } = parseNotificationEmails(value);
  const ref = db.collection(COLLECTION_NAME).doc(eventId);

  if (valid.length === 0) {
    await ref.delete();
    return;
  }

  await ref.set({ emails: valid, updatedAt: new Date() });
};

export const deleteEventNotificationEmail = async (eventId: string): Promise<void> => {
  await db.collection(COLLECTION_NAME).doc(eventId).delete();
};

/**
 * Sends an email about an event to the addresses saved for it. Does nothing
 * when the event has none. Never throws: a failed notification must not undo
 * the action that triggered it.
 *
 * New kinds of event update should add their own template and a small
 * function like `notifyEventReservation` below that calls this.
 */
const sendEventNotification = async ({
  eventId,
  subject,
  react,
  text,
  replyTo,
}: {
  eventId: string;
  subject: string;
  react: React.ReactNode;
  /** Plain-text version for mail clients that do not show HTML */
  text: string;
  replyTo?: string;
}): Promise<void> => {
  try {
    const recipients = parseNotificationEmails(await getEventNotificationEmail(eventId)).valid;
    if (recipients.length === 0) return;

    const result = await sendEmail({ to: recipients, subject, react, text, replyTo });

    if (result.success) {
      console.log(`Event notification for ${eventId} sent to ${recipients.length} address(es). Message ID: ${result.messageId}`);
    } else {
      console.error(`Event notification for ${eventId} was not sent:`, result.error);
    }
  } catch (error) {
    console.error(`Error sending event notification for ${eventId}:`, error);
  }
};

/** Tells an event's notification address(es) that someone has reserved seats. */
export const notifyEventReservation = async (
  eventId: string,
  details: Omit<EventReservationEmailProps, 'eventId' | 'companyName' | 'companyWebsite'> &
    Required<Pick<EventReservationEmailProps, 'eventTitle' | 'attendeeName' | 'attendeeEmail' | 'seatsReserved'>>
): Promise<void> => {
  const seats = `${details.seatsReserved} seat${details.seatsReserved === 1 ? '' : 's'}`;
  const hasSeatLimit = details.seatsRemaining !== null && details.seatsRemaining !== undefined;

  const text = [
    'New seat reservation',
    '',
    `${details.attendeeName} has reserved ${seats} for ${details.eventTitle}.`,
    '',
    `Event: ${details.eventTitle}`,
    [details.eventDate, details.eventTime].filter(Boolean).join(', ') || undefined,
    details.eventLocation || undefined,
    '',
    `Name: ${details.attendeeName}`,
    `Email: ${details.attendeeEmail}`,
    details.attendeePhone ? `Phone: ${details.attendeePhone}` : undefined,
    `Seats reserved: ${details.seatsReserved}`,
    `Seats remaining: ${hasSeatLimit ? details.seatsRemaining : 'No limit'}`,
    details.investmentTier ? `Target portfolio: ${details.investmentTier}` : undefined,
    details.preferences ? `Special preferences: ${details.preferences}` : undefined,
  ]
    .filter((line): line is string => line !== undefined)
    .join('\n');

  await sendEventNotification({
    eventId,
    subject: `New reservation: ${details.eventTitle} (${seats})`,
    react: React.createElement(EventReservationEmail, { ...details, eventId }),
    text,
    // Replying to the notification goes straight to the person who reserved
    replyTo: details.attendeeEmail,
  });
};
