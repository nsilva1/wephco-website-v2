import { IProperty } from "@/interfaces/propertyInterface";
import axios from "axios";

const API_URL = '/api/properties'

export const createProperty = async (propertyData: Omit<IProperty, 'createdAt' | 'updatedAt'>): Promise<IProperty> => {
    const response = await axios.post(API_URL, propertyData)
    

    if (response.status !== 201) {
        throw new Error('Failed to create property')
    }

    return response.data
}

export const getProperty = async (id: string): Promise<IProperty> => {
    const response = await axios.get(`${API_URL}/${id}`)

    if (response.status !== 200) {
        throw new Error('Failed to fetch property')
    }

    const data = response.data
    return data
}

export const getAllProperties = async (): Promise<IProperty[]> => {
    const response = await axios.get(API_URL)

    if (response.status !== 200) {
        console.log('Error: ', response.data)
        throw new Error('Failed to fetch properties')
    }

    const data = response.data
    return data
}

export const updateProperty = async (propertyData: IProperty): Promise<IProperty> => {
    const response = await axios.put(API_URL, propertyData)

    if (response.status !== 200) {
        throw new Error('Failed to update property')
    }

    return response.data
}

export const deleteProperty = async (id: string): Promise<void> => {
    const response = await axios.delete(`${API_URL}/${id}`)

    if (response.status !== 204) {
        throw new Error('Failed to delete property')
    }

    return response.data
}