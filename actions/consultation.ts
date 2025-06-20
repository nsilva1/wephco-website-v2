import { IConsultation } from "@/interfaces/userInterface";
import axios from "axios";

const API_URL = "/api/consultations";

export const getConsultations = async (): Promise<IConsultation[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching consultations:", error);
        throw error;
    }
};

export const createConsultation = async (data: IConsultation): Promise<IConsultation> => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating consultation:", error);
        throw error;
    }
};
