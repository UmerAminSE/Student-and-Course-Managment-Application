import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const apiService = {
    get: async (path) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${path}`);
            return response;
        } catch (error) {
            return error.response; // Ensure the error is in the expected format
        }
    },

    post: async (path, object) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${path}`, object, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            return error.response; // Ensure the error is in the expected format
        }
    },

    put: async (path, objectId, object) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${path}/${objectId}`, object, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            return error.response; // Ensure the error is in the expected format
        }
    },

    delete: async (path, objectId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${path}/${objectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            return error.response; // Ensure the error is in the expected format
        }
    }
};

export default apiService;
