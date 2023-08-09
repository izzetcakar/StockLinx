
import CategoryForm from "../../forms/category/CategoryForm";
import { ICategory } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openCategoryModal = (
    category?: ICategory,
) =>
    modals.open({
        modalId: "category-modal",
        title: "Update",
        children: <CategoryForm category={category} />,
        xOffset: "auto",
    });

