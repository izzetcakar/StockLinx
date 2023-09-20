
import ManufacturerForm from "../../forms/manufacturer/ManufacturerForm";
import { IManufacturer } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openManufacturerModal = (
    manufacturer?: IManufacturer,
) =>
    modals.open({
        modalId: "manufacturer-modal",
        title: manufacturer ? "Edit Manufacturer" : "Create Manufacturer",
        children: <ManufacturerForm manufacturer={manufacturer} />,
        xOffset: "auto",
    });

