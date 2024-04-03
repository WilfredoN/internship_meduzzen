import User from '../Types/User';
import { UserCreate } from '../Types/UserCreate';
import instance from './api';
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('access_token');

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
            return { error: error.message };
        }
    },

    getUser: async () => {
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
    },
    deleteUser: async (id: number) => {
        try {
            const response = await instance.delete(`${apiUrl}user/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            return response.data;
        } catch (error: any) {
            return { error: error.message };
        }
    }
};

export const user = {
    createUser: async (userData: UserCreate) => {
        try {
            const response = await instance.post(`user/`, userData);
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error);
        }
    },
    updateUser: async (userData: User) => {
        try {
            const response = await instance.put(`${apiUrl}user/${userData.user_id}/update_info/`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error);
        }
    },
    getUsers: async (page: number, pageSize: number) => {
        try {
            const response = await instance.get(`${apiUrl}users/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: page,
                    page_size: pageSize
                }
            });
            // console.log(response.data.result);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
    getUserById: async (id: number) => {
        try {
            const response = await instance.get(`${apiUrl}user/${id}/`, {
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