import CategoryForm from "../../forms/category/CategoryForm";
import { ICategory } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import CategoryExcel from "../../pages/category/CategoryExcel";

export const openCategoryModal = (category?: ICategory) =>
  modals.open({
    modalId: "category-modal",
    title: category ? "Edit Category" : "Create Category",
    children: <CategoryForm category={category} />,
    xOffset: "auto",
    size: "auto",
  });
export const openCategoryExcelModal = (categories: ICategory[]) =>
  modals.open({
    modalId: "category-modal",
    children: <CategoryExcel categories={categories} />,
    xOffset: "auto",
    size: "auto",
  });
