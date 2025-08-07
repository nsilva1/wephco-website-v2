import { IAffiliate } from "@/interfaces/userInterface";
import axios from "axios";

const API_URL = "/api/affiliates";

export const getAffiliates = async (): Promise<IAffiliate[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching affiliates:", error);
        throw error;
    }
};


