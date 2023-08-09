
import { ISupplier } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import SupplierForm from "../../forms/supplier/SupplierForm";

export const closeModal = (modal: string) => modals.close(modal);
export const openSupplierModal = (
    supplier?: ISupplier,
) =>
    modals.open({
        modalId: "supplier-modal",
        title: "Update",
        children: <SupplierForm supplier={supplier} />,
        xOffset: "auto",
    });

