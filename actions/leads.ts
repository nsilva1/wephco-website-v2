'use server';

import { db } from '@/firebase/firebaseConfig';
import { ILead } from '@/interfaces/leadInterface';
import { IUserInfo } from '@/interfaces/userInterface';
import { IProperty } from '@/interfaces/propertyInterface';
import { serializeDoc } from '@/lib/utils';

export interface ILeadWithRelations extends Omit<ILead, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  agent?: { id: string; name: string; email: string };
  property?: { id: string; title: string; location: string };
}

export async function getLeads(): Promise<ILeadWithRelations[]> {
  const leadsSnapshot = await db.collection('leads').get();

  const leads = leadsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data()!)
  })) as ILeadWithRelations[];

  // Batch-fetch all unique users and properties to avoid N+1
  const userIds = [...new Set(leads.map(l => l.userId).filter(Boolean))];
  const propertyIds = [...new Set(leads.map(l => l.propertyId).filter(Boolean))];

  const usersMap = new Map<string, { id: string; name: string; email: string }>();
  const propertiesMap = new Map<string, { id: string; title: string; location: string }>();

  // Fetch users
  await Promise.all(userIds.map(async (uid) => {
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data()!;
        usersMap.set(uid, { id: doc.id, name: data.name || '', email: data.email || '' });
      }
    } catch {}
  }));

  // Fetch properties
  await Promise.all(propertyIds.map(async (pid) => {
    try {
      const doc = await db.collection('properties').doc(pid).get();
      if (doc.exists) {
        const data = doc.data()!;
        propertiesMap.set(pid, { id: doc.id, title: data.title || '', location: data.location || '' });
      }
    } catch {}
  }));

  // Attach relations
  return leads.map(lead => ({
    ...lead,
    agent: lead.userId ? usersMap.get(lead.userId) : undefined,
    property: lead.propertyId ? propertiesMap.get(lead.propertyId) : undefined,
  }));
}

export async function getLeadById(id: string): Promise<ILeadWithRelations | null> {
  const docRef = await db.collection('leads').doc(id).get();
  if (!docRef.exists) return null;

  const lead = {
    id: docRef.id,
    ...serializeDoc(docRef.data()!)
  } as ILeadWithRelations;

  // Fetch agent
  if (lead.userId) {
    try {
      const userDoc = await db.collection('users').doc(lead.userId).get();
      if (userDoc.exists) {
        const data = userDoc.data()!;
        lead.agent = { id: userDoc.id, name: data.name || '', email: data.email || '' };
      }
    } catch {}
  }

  // Fetch property
  if (lead.propertyId) {
    try {
      const propDoc = await db.collection('properties').doc(lead.propertyId).get();
      if (propDoc.exists) {
        const data = propDoc.data()!;
        lead.property = { id: propDoc.id, title: data.title || '', location: data.location || '' };
      }
    } catch {}
  }

  return lead;
}
