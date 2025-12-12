import axios from "axios";

const getPosting = async () => {
    async function fetchData() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/items');
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    fetchData();
};

export default getPosting;