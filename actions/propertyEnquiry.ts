import { IPropertyEnquiry } from "@/interfaces/propertyInterface";
import axios from "axios";
import { handleError } from "@/lib/helperFunctions";

const API_URL = '/api/properties/enquiry'


export const createPropertyEnquiryRequest = async (data: IPropertyEnquiry): Promise<IPropertyEnquiry> => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error) {
        var errorMessage = handleError(error)
        throw new Error(errorMessage);
    }
        
}


export const getAllPropertyEnquiryRequests = async (): Promise<IPropertyEnquiry[]> => {
    try {
        const response = await axios.get(API_URL)
        return response.data;
    } catch (error) {
        var errorMessage = handleError(error)
        throw new Error(errorMessage);
    }
        
}