
import CompanyForm from "../../forms/company/CompanyForm";
import { ICompany } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openCompanyModal = (
    company?: ICompany,
) =>
    modals.open({
        modalId: "company-modal",
        title: company ? "Update Company" : "Create Company",
        children: <CompanyForm company={company} />,
        xOffset: "auto",
    });

