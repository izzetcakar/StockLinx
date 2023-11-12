import React from "react";
import { ICategory } from "../../interfaces/interfaces";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/Gridtable";

interface CategoryExcelProps {
  categories: ICategory[];
}
const CategoryExcel: React.FC<CategoryExcelProps> = ({ categories }) => {
  console.log("categories", categories);
  return (
    <Gridtable data={categories} itemKey="id" columns={useColumns().columns} />
  );
};

export default CategoryExcel;
