
import CategoryForm from "../../forms/category/CategoryForm";
import { ICategory } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openCategoryModal = (
    category?: ICategory,
) =>
    modals.open({
        modalId: "category-modal",
        title: category ? "Edit Category" : "Create Category",
        children: <CategoryForm category={category} />,
        xOffset: "auto",
    });

