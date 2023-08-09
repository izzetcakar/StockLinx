import { IComponent } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ComponentForm from "../../../components/form/product/component/ComponentForm";

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

