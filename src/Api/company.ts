import instance from "./api";


export const info = {
    getCompanies: async (page: number, pageSize: number) => {
        try {
            const response = await instance.get(`companies/`, {
                params: {
                    page: page,
                    page_size: pageSize,
                }
            });
            return response.data.result.companies;
        } catch (error: any) {
            return { error: error.message };
        }
    },
}