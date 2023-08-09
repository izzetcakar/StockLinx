
import { ICategory } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import CategoryForm from "../../components/form/category/CategoryForm";

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

