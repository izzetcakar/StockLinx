import LicenseForm from "../../../forms/product/license/LicenseForm";
import { ILicense } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

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

