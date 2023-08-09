import { IAccessory } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import AccessoryForm from "../../../components/form/product/accessory/AccessoryForm";

export const closeModal = (modal: string) => modals.close(modal);
export const openAccessoryModal = (
  accessory?: IAccessory,
) =>
  modals.open({
    modalId: "accessory-modal",
    title: "Update",
    children: <AccessoryForm accessory={accessory} />,
    xOffset: "auto",
  });

