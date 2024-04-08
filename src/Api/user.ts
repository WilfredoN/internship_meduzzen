import User from '../Types/User';
import { UserCreate } from '../Types/UserCreate';
import UserUpdate from '../Types/UserUpdate';
import instance from './api';

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
            });
            console.log(response.data.result);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
    deleteUser: async (id: number) => {
        try {
            const response = await instance.delete(`user/${id}/`, {

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
    updateInfo: async (userData: UserUpdate, user_id: number) => {
        try {
            const response = await instance.put(`user/${user_id}/update_info/`, userData, {
            });
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error);
        }
    },
    updatePassword: async (user_password: string, user_password_repeat: string, userData: User) => {
        try {
            const response = await instance.put(`user/${userData.user_id}/update_password/`, { user_password, user_password_repeat }, {
            });
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error);
        }

    },
    updateAvatar: async (avatar: File, userData: User) => {
        try {
            const formData = new FormData();
            formData.append('user_avatar', avatar);
            const response = await instance.put(`user/${userData.user_id}/update_avatar/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
            const response = await instance.get(`users/`, {
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
            const response = await instance.get(`user/${id}/`,);
            console.log(response.data.result);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
    getUserCompany: async (id: number) => {
        try {
            const response = await instance.get(`user/${id}/companies_list/`,);
            console.log(response.data.result.companies);
            return response.data.result.companies;
        } catch (error: any) {
            return { error: error.message };
        }
    },
};