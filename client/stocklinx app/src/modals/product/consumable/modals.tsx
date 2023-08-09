import ConsumableForm from "../../../forms/product/consumable/ConsumableForm";
import { IConsumable } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openConsumableModal = (
    consumable?: IConsumable,
) =>
    modals.open({
        modalId: "consumable-modal",
        title: "Update",
        children: <ConsumableForm consumable={consumable} />,
        xOffset: "auto",
    });

