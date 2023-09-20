
import { ISupplier } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import SupplierForm from "../../forms/supplier/SupplierForm";

export const openSupplierModal = (
    supplier?: ISupplier,
) =>
    modals.open({
        modalId: "supplier-modal",
        title: supplier ? "Edit Supplier" : "Create Supplier",
        children: <SupplierForm supplier={supplier} />,
        xOffset: "auto",
    });

