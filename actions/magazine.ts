'use server';

import { createDocument, getAllDocuments, updateDocument, getDocument, deleteDocument } from "@/firebase/firebaseConfig";
import { serializeDoc } from "@/lib/utils";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { fulfilMagazineSubscription, MagazineFulfilmentResult } from "@/lib/magazineFulfilment";

const COLLECTION_NAME = FIRESTORE_COLLECTIONS.MAGAZINES;

export interface IMagazineSubscription {
  id?: string;
  tierId?: string;
  tierName?: string;
  type?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  deliveryAddress?: string;
  fee: number;
  language?: 'English' | 'French';
  status: 'pending' | 'paid' | 'cancelled';
  /** Payment reference, created with the subscription and passed to the payment provider */
  txRef?: string;
  createdAt?: Date | string;
}

export const createMagazineSubscription = async (data: Omit<IMagazineSubscription, 'id' | 'status' | 'createdAt' | 'txRef'>): Promise<IMagazineSubscription> => {
  try {
    const payload = {
      type: data.type || data.tierName || 'Membership',
      tierId: data.tierId || '',
      tierName: data.tierName || '',
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber || '',
      companyName: data.companyName || '',
      deliveryAddress: data.deliveryAddress || '',
      fee: data.fee,
      language: data.language || 'English',
      status: 'pending' as const,
      // Ties the payment to this subscription, so a confirmed payment can be
      // matched back to the person and tier it was for
      txRef: `wephco-mag-${randomUUID()}`,
      createdAt: new Date(),
    };

    const id = await createDocument(COLLECTION_NAME, payload);

    return {
      id,
      ...payload,
    } as unknown as IMagazineSubscription;
  } catch (error) {
    console.error("Error creating magazine subscription:", error);
    throw new Error("Failed to create magazine subscription");
  }
};

export const getMagazineSubscriptions = async (): Promise<IMagazineSubscription[]> => {
  try {
    const docs = await getAllDocuments(COLLECTION_NAME);
    return docs.map(doc => ({
      id: doc.id,
      ...serializeDoc(doc)
    })) as unknown as IMagazineSubscription[];
  } catch (error) {
    console.error("Error fetching magazine subscriptions:", error);
    throw new Error("Failed to fetch magazine subscriptions");
  }
};

export const getMagazineSubscriptionById = async (id: string): Promise<IMagazineSubscription> => {
  try {
    const doc = await getDocument(COLLECTION_NAME, id);
    if (!doc) {
      throw new Error("Subscription not found");
    }
    return {
      id: doc.id,
      ...serializeDoc(doc)
    } as unknown as IMagazineSubscription;
  } catch (error) {
    console.error(`Error fetching magazine subscription ${id}:`, error);
    throw new Error("Failed to fetch magazine subscription");
  }
};

export const updateMagazineSubscription = async (id: string, data: Partial<IMagazineSubscription>): Promise<void> => {
  try {
    const payload = { ...data };
    delete payload.id;
    await updateDocument(COLLECTION_NAME, id, payload);
  } catch (error) {
    console.error(`Error updating magazine subscription ${id}:`, error);
    throw new Error("Failed to update magazine subscription");
  }
};

export const deleteMagazineSubscription = async (id: string): Promise<void> => {
  try {
    await deleteDocument(COLLECTION_NAME, id);
  } catch (error) {
    console.error(`Error deleting magazine subscription ${id}:`, error);
    throw new Error("Failed to delete magazine subscription");
  }
};

/**
 * Called by the payment success page. Confirms the payment with the payment
 * provider and, once confirmed, emails the subscriber the PDFs for their tier.
 * Safe to call more than once: the emails are only sent once.
 */
export const confirmMagazinePayment = async ({
  txRef,
  transactionId,
}: {
  txRef: string;
  transactionId?: string;
}): Promise<MagazineFulfilmentResult> => {
  try {
    const requestHeaders = await headers();
    const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host');
    const protocol = requestHeaders.get('x-forwarded-proto') || 'https';

    return await fulfilMagazineSubscription({
      txRef,
      transactionId,
      siteOrigin: host ? `${protocol}://${host}` : null,
    });
  } catch (error) {
    console.error(`Error confirming magazine payment ${txRef}:`, error);
    return { outcome: 'unavailable' };
  }
};
