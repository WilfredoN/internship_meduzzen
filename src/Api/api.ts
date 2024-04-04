import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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
