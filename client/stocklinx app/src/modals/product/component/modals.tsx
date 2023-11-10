import ComponentForm from "../../../forms/product/component/ComponentForm";
import { IComponent } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openComponentModal = (component?: IComponent) =>
  modals.open({
    modalId: "component-modal",
    title: component ? "Update Component" : "Create Component",
    children: <ComponentForm component={component} />,
    xOffset: "auto",
    size: "auto",
  });
