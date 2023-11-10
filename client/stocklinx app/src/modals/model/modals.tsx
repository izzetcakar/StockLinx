import ModelForm from "../../forms/model/ModelForm";
import { IModel } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openModelModal = (model?: IModel) =>
  modals.open({
    modalId: "model-modal",
    title: model ? "Edit Model" : "Create Model",
    children: <ModelForm model={model} />,
    xOffset: "auto",
    size: "auto",
  });
