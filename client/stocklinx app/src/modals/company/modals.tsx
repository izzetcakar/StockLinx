
import CompanyForm from "../../forms/company/CompanyForm";
import { ICompany } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openCompanyModal = (
    company?: ICompany,
) =>
    modals.open({
        modalId: "company-modal",
        title: "Update",
        children: <CompanyForm company={company} />,
        xOffset: "auto",
    });

