import ConsumableForm from "../../../forms/product/consumable/ConsumableForm";
import { IConsumable } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openConsumableModal = (
    consumable?: IConsumable,
) =>
    modals.open({
        modalId: "consumable-modal",
        title: consumable ? "Edit Consumable" : "Create Consumable",
        children: <ConsumableForm consumable={consumable} />,
        xOffset: "auto",
    });

