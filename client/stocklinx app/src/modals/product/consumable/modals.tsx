import { IConsumable } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ConsumableForm from "../../../components/form/product/consumable/ConsumableForm";

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

