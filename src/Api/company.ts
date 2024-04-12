import { resolveNaptr } from 'dns';
import { Company, CompanyDetailed } from './../Types/Company';
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
    getCompanyById: async (companyId: string) => {
        try {
            const response = await instance.get(`company/${companyId}/`);
            console.log(response.data.result);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
}
export const company = {
    createCompany: async (company: Company) => {
        try {
            const response = await instance.post(`company/`, {
                company_name: company.company_name,
                company_description: company.company_description,
                is_visible: true,
            });
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
    deleteCompany: async (companyId: number) => {
        try {
            const response = await instance.delete(`company/${companyId}/`);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
    updateCompany: async (company: CompanyDetailed) => {
        try {
            const response = await instance.put(`company/${company.company_id}/update_info/`, {
                company_name: company.company_name,
                company_description: company.company_description,
                company_city: company.company_city,
                company_phone: company.company_phone,
                company_links: company.company_links,
                company_title: company.company_title,
            });
            console.log(response);
            console.log(response.data.result);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
    getCompany: async (companyId: number) => {
        try {
            const response = await instance.get(`company/${companyId}`);
            return response.data.result;
        } catch (error: any) {
            return { error: error.message };
        }
    },
}