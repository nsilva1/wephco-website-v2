'use server';

import { EventItem } from "@/app/(root)/events/_components/EventCard";
import { createDocument, getDocument, getAllDocuments, updateDocument, deleteDocument } from "@/firebase/firebaseConfig";
import { serializeDoc } from "@/lib/utils";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants";

const COLLECTION_NAME = FIRESTORE_COLLECTIONS.EVENTS || 'events';

export const getEvents = async (): Promise<EventItem[]> => {
    try {
        const docs = await getAllDocuments(COLLECTION_NAME);
        return docs.map(doc => ({
            id: doc.id,
            ...serializeDoc(doc)
        })) as unknown as EventItem[];
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events");
    }
};

export const getEvent = async (id: string): Promise<EventItem | null> => {
    try {
        const doc = await getDocument(COLLECTION_NAME, id);
        if (!doc) return null;
        return {
            id: doc.id,
            ...serializeDoc(doc)
        } as unknown as EventItem;
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        throw new Error("Failed to fetch event details");
    }
};

export const createEvent = async (data: EventItem): Promise<string> => {
    try {
        const payload = {
            title: data.title,
            description: data.description,
            longDescription: data.longDescription || "",
            date: data.date,
            time: data.time,
            location: data.location,
            image: data.image,
            scope: data.scope,
            format: data.format,
            seatsRemaining: data.seatsRemaining !== undefined ? Number(data.seatsRemaining) : null,
            isPast: data.isPast || false,
            agenda: data.agenda || [],
            hosts: data.hosts || [],
            highlights: data.highlights || [],
            galleryImages: data.galleryImages || [],
            hasGallery: data.hasGallery || false,
            createdAt: data.createdAt ? (data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt)) : new Date(),
            updatedAt: data.updatedAt ? (data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt)) : new Date(),
        };

        const id = await createDocument(COLLECTION_NAME, payload);
        return id;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Failed to create event");
    }
};

export const updateEvent = async (id: string, data: Partial<EventItem>): Promise<boolean> => {
    try {
        const payload: any = {};
        if (data.title !== undefined) payload.title = data.title;
        if (data.description !== undefined) payload.description = data.description;
        if (data.longDescription !== undefined) payload.longDescription = data.longDescription;
        if (data.date !== undefined) payload.date = data.date;
        if (data.time !== undefined) payload.time = data.time;
        if (data.location !== undefined) payload.location = data.location;
        if (data.image !== undefined) payload.image = data.image;
        if (data.scope !== undefined) payload.scope = data.scope;
        if (data.format !== undefined) payload.format = data.format;
        if (data.seatsRemaining !== undefined) payload.seatsRemaining = data.seatsRemaining !== null ? Number(data.seatsRemaining) : null;
        if (data.isPast !== undefined) payload.isPast = data.isPast;
        if (data.agenda !== undefined) payload.agenda = data.agenda;
        if (data.hosts !== undefined) payload.hosts = data.hosts;
        if (data.highlights !== undefined) payload.highlights = data.highlights;
        if (data.galleryImages !== undefined) payload.galleryImages = data.galleryImages;
        if (data.hasGallery !== undefined) payload.hasGallery = data.hasGallery;
        
        payload.updatedAt = data.updatedAt ? (data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt)) : new Date();
        if (data.createdAt !== undefined) {
            payload.createdAt = data.createdAt ? (data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt)) : null;
        }

        await updateDocument(COLLECTION_NAME, id, payload);
        return true;
    } catch (error) {
        console.error(`Error updating event ${id}:`, error);
        throw new Error("Failed to update event");
    }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
    try {
        await deleteDocument(COLLECTION_NAME, id);
        return true;
    } catch (error) {
        console.error(`Error deleting event ${id}:`, error);
        throw new Error("Failed to delete event");
    }
};
