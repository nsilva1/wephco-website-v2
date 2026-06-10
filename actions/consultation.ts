'use server';

import { IConsultation } from "@/interfaces/userInterface";
import { createDocument, getAllDocuments } from "@/firebase/firebaseConfig";
import { serializeDoc } from "@/lib/utils";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants";

const COLLECTION_NAME = FIRESTORE_COLLECTIONS.CONSULTATIONS;

export const getConsultations = async (): Promise<IConsultation[]> => {
    try {
        const docs = await getAllDocuments(COLLECTION_NAME);
        return docs.map(doc => ({
            id: doc.id,
            ...serializeDoc(doc)
        })) as unknown as IConsultation[];
    } catch (error) {
        console.error("Error fetching consultations:", error);
        throw new Error("Failed to fetch consultations");
    }
};

export const createConsultation = async (data: IConsultation): Promise<IConsultation> => {
    try {
        const payload = {
            service: data.service,
            meetingDate: data.meetingDate instanceof Date ? data.meetingDate : new Date(data.meetingDate),
            meetingLocation: data.meetingLocation || "",
            phoneNumber: data.phoneNumber,
            email: data.email,
            organizationName: data.organizationName || "",
            name: data.name,
            details: data.details || "",
            preferredModeOfContact: data.preferredModeOfContact || "",
            status: data.status || false,
            createdAt: new Date(),
        };

        const id = await createDocument(COLLECTION_NAME, payload);

        return {
            id,
            ...payload,
        } as unknown as IConsultation;
    } catch (error) {
        console.error("Error creating consultation:", error);
        throw new Error("Failed to create consultation");
    }
};
