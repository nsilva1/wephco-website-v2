import { ISellEnquiry } from "@/interfaces/propertyInterface"

const API_URL = '/api/sell'


export const createEnquiry = async (enquiryData: FormData): Promise<ISellEnquiry> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: enquiryData,
    })

    if (!response.ok) {
        throw new Error('Failed to send enquiry')
    }

    const data = await response.json()
    return data
}


export const getAllEnquiries = async (): Promise<ISellEnquiry[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Failed to get all enquiries')
    }

    const data = await response.json()
    return data
}