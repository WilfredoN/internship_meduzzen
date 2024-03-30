import instance from './api';
// Create instance for /auth/login/
export const auth = {
    login: async (user_email: string, user_password: string) => {
        try {
            const response = await instance.post(`auth/login/`, { user_email, user_password });
            console.log(response);
            localStorage.setItem('access_token', response.data.result.access_token);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return { error: 'User not found' };
            }
            return { error: error.message || 'Unknown error' };
        }
    },

    getUser: async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await instance.get(`auth/me/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.result);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    }
};

// User API
export const user = {
    createUser: async (userData: {
        user_password: string;
        user_password_repeat: string;
        user_email: string;
        user_firstname: string;
        user_lastname: string;
        user_avatar?: string;
    }) => {
        try {
            const response = await instance.post(`user/`, userData);
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error);
        }
    }
};