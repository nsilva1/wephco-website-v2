import { IProperty } from "@/interfaces/propertyInterface";

const API_URL = '/api/properties'

export const createProperty = async (propertyData: FormData): Promise<IProperty> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: propertyData,
    })

    if (!response.ok) {
        throw new Error('Failed to create property')
    }

    const data = await response.json()
    return data
}

export const getProperty = async (id: string): Promise<IProperty> => {
    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch property')
    }

    const data = await response.json()
    return data
}

export const getAllProperties = async (): Promise<IProperty[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Failed to fetch properties')
    }

    const data = await response.json()
    return data
}