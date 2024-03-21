import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Create instance for /auth/login/
export const login = async (user_email: string, user_password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login/`, {
            user_email,
            user_password
        });
        return response.data;
    } catch (error) {
        throw new Error(error as string);
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
        const response = await axios.post(`${apiUrl}/user/`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error as string);
    }
};