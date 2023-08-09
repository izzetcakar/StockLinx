import { ILicense } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import LicenseForm from "../../../components/form/product/license/LicenseForm";

export const closeModal = (modal: string) => modals.close(modal);
export const openLicenseModal = (
    license?: ILicense,
) =>
    modals.open({
        modalId: "license-modal",
        title: "Update",
        children: <LicenseForm license={license} />,
        xOffset: "auto",
    });

