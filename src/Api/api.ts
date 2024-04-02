import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const healthCheck = async () => {
    try {
        const response = await instance.get('');
        return response.data;
    } catch (error: any) {
        return { error: error.message || 'Unknown error' };
    }
}

export default instance;
