import ComponentForm from "../../../forms/product/component/ComponentForm";
import { IComponent } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openComponentModal = (
    component?: IComponent,
) =>
    modals.open({
        modalId: "component-modal",
        title: "Update",
        children: <ComponentForm component={component} />,
        xOffset: "auto",
    });

