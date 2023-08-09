
import { IManufacturer } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ManufacturerForm from "../../components/form/manufacturer/ManufacturerForm";

export const closeModal = (modal: string) => modals.close(modal);
export const openManufacturerModal = (
    manufacturer?: IManufacturer,
) =>
    modals.open({
        modalId: "manufacturer-modal",
        title: "Update",
        children: <ManufacturerForm manufacturer={manufacturer} />,
        xOffset: "auto",
    });

