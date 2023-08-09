
import { IModel } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ModelForm from "../../components/form/model/ModelForm";

export const closeModal = (modal: string) => modals.close(modal);
export const openModelModal = (
    model?: IModel,
) =>
    modals.open({
        modalId: "model-modal",
        title: "Update",
        children: <ModelForm model={model} />,
        xOffset: "auto",
    });

