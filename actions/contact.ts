'use server';

import { IContactUs } from "@/interfaces/userInterface";
import { createDocument, getAllDocuments } from "@/firebase/firebaseConfig";
import { serializeDoc } from "@/lib/utils";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants";

const COLLECTION_NAME = FIRESTORE_COLLECTIONS.INQUIRY;

export const createContactRequest = async (contactData: IContactUs): Promise<IContactUs> => {
    const data = {
        name: contactData.name,
        email: contactData.email,
        phoneNumber: contactData.phoneNumber,
        status: false,
        createdAt: new Date(),
    };
    
    const id = await createDocument(COLLECTION_NAME, data);
    
    return {
        id,
        ...data,
        createdAt: data.createdAt,
    } as IContactUs;
}

export const getAllContactRequests = async (): Promise<IContactUs[]> => {
    const docs = await getAllDocuments(COLLECTION_NAME);
    
    return docs.map(doc => ({
        id: doc.id,
        ...serializeDoc(doc)
    })) as unknown as IContactUs[];
}


