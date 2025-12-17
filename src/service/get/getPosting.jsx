import { searchAPI } from "../api";

const getPosting = async () => {
    try {
        const response = await searchAPI.getAllItems();
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export default getPosting;