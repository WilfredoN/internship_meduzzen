import axios from 'axios';
import { resetUser } from '../Store/userSlice';
const apiUrl = process.env.REACT_APP_API_URL;

// Create instance for /auth/login/
export const login = async (user_email: string, user_password: string) => {
    try {
        const response = await axios.post(`${apiUrl}auth/login/`, {
            user_email,
            user_password
        });
        console.log(response);
        localStorage.setItem('access_token', response.data.result.access_token);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return { error: 'User not found' };
        }
        return { error: error.message || 'Unknown error' };
    }
};

// Create instance for /user/
export const createUser = async (userData: {
    user_password: string;
    user_password_repeat: string;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
}) => {
    try {
        const response = await axios.post(`${apiUrl}user/`, userData);
        console.log(response);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.log(error);
            return { error: 'Endpoint not found' };
        }
        return { error: error.message || 'Unknown error' };
    }
};

// Instance for /auth/me/
export const getUser = async () => {
    // console.log(localStorage.getItem('access_token'));
    try {
        const response = await axios.get(`${apiUrl}auth/me/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        // console.log(response.data.result);
        return response.data.result;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
            resetUser();
        }
        return { error: error.message };
    }
};