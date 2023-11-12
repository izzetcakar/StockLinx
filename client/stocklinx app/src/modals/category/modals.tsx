import CategoryForm from "../../forms/category/CategoryForm";
import { ICategory } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ExcelTable from "../../pages/category/ExcelTable";
import { Column } from "../../components/gridTable/interfaces/interfaces";

export const openCategoryModal = (category?: ICategory) =>
  modals.open({
    modalId: "category-modal",
    title: category ? "Edit Category" : "Create Category",
    children: <CategoryForm category={category} />,
    xOffset: "auto",
    size: "auto",
  });
export const openExcelModal = (data: object[], columns: Column[]) =>
  modals.open({
    modalId: "excel__modal",
    children: <ExcelTable data={data} columns={columns} />,
    xOffset: "auto",
    style: { maxWidth: "90%" },
  });
