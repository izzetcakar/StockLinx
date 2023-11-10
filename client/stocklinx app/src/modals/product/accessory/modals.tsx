import { IAccessory } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import AccessoryForm from "../../../forms/product/accessory/AccessoryForm";

export const openAccessoryModal = (accessory?: IAccessory) =>
  modals.open({
    modalId: "accessory-modal",
    title: accessory ? "Update Accessory" : "Create Accessory",
    children: <AccessoryForm accessory={accessory} />,
    xOffset: "auto",
    size: "auto",
  });
