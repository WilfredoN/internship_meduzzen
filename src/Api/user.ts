import axios from 'axios';
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
    user_avatar?: string;
}) => {
    try {
        const response = await axios.post(`${apiUrl}user/`, userData);
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

// Instance for /auth/me/
export const getUser = async () => {
    const token = localStorage.getItem('access_token');
    // console.log(token);
    try {
        const response = await axios.get(`${apiUrl}auth/me/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data.result);
        return response.data.result;
    } catch (error: any) {
        return { error: error.message };
    }
};