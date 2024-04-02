import instance from "./api";

const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("access_token");

export const info = {
    getCompanies: async (page: number, pageSize: number) => {
        try {
            const response = await instance.get(`${apiUrl}companies/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    page: page,
                    page_size: pageSize,
                }
            });
            return response.data;
        } catch (error: any) {
            return { error: error.message };
        }
    },
}