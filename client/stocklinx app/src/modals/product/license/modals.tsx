import LicenseForm from "../../../forms/product/license/LicenseForm";
import { ILicense } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openLicenseModal = (
    license?: ILicense,
) =>
    modals.open({
        modalId: "license-modal",
        title: license ? "Edit License" : "Create License",
        children: <LicenseForm license={license} />,
        xOffset: "auto",
    });

