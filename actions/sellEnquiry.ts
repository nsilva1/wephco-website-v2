import { ISellEnquiry } from "@/interfaces/propertyInterface"
import axios from "axios"

const API_URL = '/api/sell'


export const createEnquiry = async (enquiryData: Omit<ISellEnquiry, 'id' | 'createdAt'>): Promise<ISellEnquiry> => {
    const response = await axios.post(API_URL, enquiryData)

    if (response.status !== 201) {
        throw new Error('Failed to create Sell Enquiry')
    }

    return response.data
}


export const getAllEnquiries = async (): Promise<ISellEnquiry[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Failed to get all enquiries')
    }

    const data = await response.json()
    return data
}