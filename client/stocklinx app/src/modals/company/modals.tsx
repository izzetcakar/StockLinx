
import { ICompany } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import CompanyForm from "../../components/form/company/CompanyForm";

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

