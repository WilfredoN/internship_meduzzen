export type Company = {
    company_name: string;
    company_description: string;
};
export type CompanyDetailed = {
    company_id: number;
    company_name: string;
    company_description: string;
    company_city: string;
    company_phone: string;
    company_links: string[];
};
