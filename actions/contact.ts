import { IContactUs } from "@/interfaces/userInterface";

const API_URL = '/api/contacts'

export const createContactRequest = async (contactData: FormData): Promise<IContactUs> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: contactData,
    })

    if (!response.ok) {
        throw new Error('Failed to create property')
    }

    const data = await response.json()
    return data
}

export const getAllContactRequests = async (): Promise<IContactUs[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Failed to fetch requests')
    }

    const data = await response.json()
    return data
}