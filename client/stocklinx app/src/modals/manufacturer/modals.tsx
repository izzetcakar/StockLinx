
import ManufacturerForm from "../../forms/manufacturer/ManufacturerForm";
import { IManufacturer } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

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

