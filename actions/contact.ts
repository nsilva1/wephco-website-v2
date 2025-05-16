import { IContactUs } from "@/interfaces/userInterface";
import axios from 'axios'

const API_URL = '/api/contacts'

export const createContactRequest = async (contactData: IContactUs): Promise<IContactUs> => {

    const response = await axios.post(API_URL, contactData)

    return response.data
}

export const getAllContactRequests = async (): Promise<IContactUs[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Failed to fetch requests')
    }

    const data = await response.json()
    return data
}