'use server';

import { db } from '@/firebase/firebaseConfig';
import { ISupportTicket, IUserInfo } from '@/interfaces/userInterface';
import { serializeDoc } from '@/lib/utils';

export async function getSupportTickets() {
  const ticketsSnapshot = await db.collection('support_tickets').get();

  const tickets = ticketsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data()!)
  })) as ISupportTicket[];

  // Fetch associated users
  const ticketsWithUsers = await Promise.all(tickets.map(async (ticket) => {
    try {
      const userDoc = await db.collection('users').doc(ticket.userId).get();
      return {
        ...ticket,
        user: userDoc.exists
          ? { id: userDoc.id, ...serializeDoc(userDoc.data()!) } as IUserInfo
          : undefined
      };
    } catch {
      return { ...ticket, user: undefined };
    }
  }));

  return ticketsWithUsers;
}

export async function getSupportTicketById(id: string) {
  const docRef = await db.collection('support_tickets').doc(id).get();
  if (!docRef.exists) return null;

  const ticket = {
    id: docRef.id,
    ...serializeDoc(docRef.data()!)
  } as ISupportTicket;

  // Fetch user
  try {
    const userDoc = await db.collection('users').doc(ticket.userId).get();
    if (userDoc.exists) {
      ticket.user = { id: userDoc.id, ...serializeDoc(userDoc.data()!) } as IUserInfo;
    }
  } catch {
    // user not found, leave undefined
  }

  return ticket;
}

export async function resolveTicket(ticketId: string, adminId: string, responseNotes: string) {
  const ticketRef = db.collection('support_tickets').doc(ticketId);
  const ticketDoc = await ticketRef.get();

  if (!ticketDoc.exists) {
    throw new Error('Ticket not found');
  }

  const ticketData = ticketDoc.data() as ISupportTicket;

  if (ticketData.status === 'resolved') {
    throw new Error('Ticket is already resolved');
  }

  await ticketRef.update({
    status: 'resolved',
    responseNotes,
    resolvedAt: new Date().toISOString(),
    resolvedBy: adminId,
  });

  return { success: true };
}

export async function reopenTicket(ticketId: string) {
  const ticketRef = db.collection('support_tickets').doc(ticketId);
  const ticketDoc = await ticketRef.get();

  if (!ticketDoc.exists) {
    throw new Error('Ticket not found');
  }

  await ticketRef.update({
    status: 'open',
    responseNotes: '',
    resolvedAt: '',
    resolvedBy: '',
  });

  return { success: true };
}
