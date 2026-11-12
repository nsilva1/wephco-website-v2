'use server';

import { EventItem } from "@/app/(root)/events/_components/EventCard";
import { createDocument, getDocument, getAllDocuments, updateDocument, deleteDocument } from "@/firebase/firebaseConfig";
import { serializeDoc } from "@/lib/utils";
import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import { getEventTimeDisplay } from "@/lib/eventTime";
import {
    deleteEventNotificationEmail,
    notifyEventReservation,
    saveEventNotificationEmail,
} from "@/lib/eventNotifications";

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
            startsAt: data.startsAt || null,
            timezone: data.timezone || null,
            location: data.location,
            image: data.image,
            scope: data.scope,
            format: data.format,
            seatsRemaining: data.seatsRemaining !== undefined && data.seatsRemaining !== null ? Number(data.seatsRemaining) : null,
            availabilityText: data.availabilityText?.trim() || "",
            hideSeatCount: data.hideSeatCount || false,
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
        if (data.notificationEmail?.trim()) {
            await saveEventNotificationEmail(id, data.notificationEmail);
        }
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
        if (data.startsAt !== undefined) payload.startsAt = data.startsAt || null;
        if (data.timezone !== undefined) payload.timezone = data.timezone || null;
        if (data.location !== undefined) payload.location = data.location;
        if (data.image !== undefined) payload.image = data.image;
        if (data.scope !== undefined) payload.scope = data.scope;
        if (data.format !== undefined) payload.format = data.format;
        if (data.seatsRemaining !== undefined) payload.seatsRemaining = data.seatsRemaining !== null ? Number(data.seatsRemaining) : null;
        if (data.availabilityText !== undefined) payload.availabilityText = data.availabilityText.trim();
        if (data.hideSeatCount !== undefined) payload.hideSeatCount = data.hideSeatCount;
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
        if (data.notificationEmail !== undefined) {
            await saveEventNotificationEmail(id, data.notificationEmail);
        }
        return true;
    } catch (error) {
        console.error(`Error updating event ${id}:`, error);
        throw new Error("Failed to update event");
    }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
    try {
        await deleteDocument(COLLECTION_NAME, id);
        await deleteEventNotificationEmail(id);
        return true;
    } catch (error) {
        console.error(`Error deleting event ${id}:`, error);
        throw new Error("Failed to delete event");
    }
};

/**
 * Server action to reserve seats for an event and update seatsRemaining
 */
export const reserveEventSeat = async ({
    eventId,
    seatsCount = 1,
    attendeeName,
    email,
    phone,
    investmentTier,
    preferences,
}: {
    eventId: string;
    seatsCount?: number;
    attendeeName: string;
    email: string;
    phone: string;
    investmentTier?: string;
    preferences?: string;
}): Promise<{ success: boolean; error?: string; remainingSeats?: number | null }> => {
    try {
        let newSeatsRemaining: number | null = null;
        let eventTitle = 'Event';
        let eventWhen = { date: '', time: '' };
        let eventLocation = '';

        const eventDoc = await getDocument(COLLECTION_NAME, eventId);
        if (eventDoc) {
            const data = serializeDoc(eventDoc);
            eventTitle = data.title || 'Event';
            eventWhen = getEventTimeDisplay(data);
            eventLocation = data.location || '';
            
            if (data.seatsRemaining !== undefined && data.seatsRemaining !== null) {
                const currentSeats = Number(data.seatsRemaining);
                if (currentSeats < seatsCount) {
                    return {
                        success: false,
                        error: currentSeats <= 0 ? 'This event is fully reserved.' : `Only ${currentSeats} seats remaining.`,
                    };
                }
                newSeatsRemaining = Math.max(0, currentSeats - seatsCount);
                await updateDocument(COLLECTION_NAME, eventId, {
                    seatsRemaining: newSeatsRemaining,
                    updatedAt: new Date(),
                });
            }
        }

        // Create RSVP reservation record
        await createDocument('eventRSVPs', {
            eventId,
            eventTitle,
            attendeeName,
            email,
            phone,
            seatsReserved: Number(seatsCount),
            investmentTier: investmentTier || '',
            preferences: preferences || 'No special preferences requested.',
            verified: false,
            createdAt: new Date(),
        });

        // Tell whoever is set to be notified about this event
        await notifyEventReservation(eventId, {
            eventTitle,
            eventDate: eventWhen.date,
            eventTime: eventWhen.time,
            eventLocation,
            attendeeName,
            attendeeEmail: email,
            attendeePhone: phone,
            seatsReserved: Number(seatsCount),
            seatsRemaining: newSeatsRemaining,
            investmentTier: investmentTier || '',
            preferences: preferences || '',
        });

        return {
            success: true,
            remainingSeats: newSeatsRemaining,
        };
    } catch (error: any) {
        console.error("Error reserving event seat:", error);
        return {
            success: false,
            error: error.message || "Failed to reserve seat for event.",
        };
    }
};
