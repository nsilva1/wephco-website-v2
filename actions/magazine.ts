'use server';

import { createDocument, getAllDocuments, updateDocument, getDocument, deleteDocument } from "@/firebase/firebaseConfig";
import { serializeDoc } from "@/lib/utils";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants";

const COLLECTION_NAME = FIRESTORE_COLLECTIONS.MAGAZINES;

export interface IMagazineSubscription {
  id?: string;
  type: 'Physical' | 'Online';
  name: string;
  email: string;
  deliveryAddress?: string;
  fee: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt?: Date | string;
}

export const createMagazineSubscription = async (data: Omit<IMagazineSubscription, 'id' | 'status' | 'createdAt'>): Promise<IMagazineSubscription> => {
  try {
    const payload = {
      type: data.type,
      name: data.name,
      email: data.email,
      deliveryAddress: data.deliveryAddress || "",
      fee: data.fee,
      status: 'pending' as const,
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
