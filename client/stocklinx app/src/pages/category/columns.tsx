import { ICategory } from "@interfaces/serverInterfaces";
import { DataColumn } from "@interfaces/gridTableInterfaces";
import { createDataFromEnum } from "../../utils/enumUtils";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import CategoryForm from "@/forms/category/CategoryForm";
import { CategoryType } from "@/interfaces/enums";

export const useColumns = () => {
  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        data: createDataFromEnum(CategoryType),
      },
      dataType: "number",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: "Title",
      renderData: (e) => {
        const category = e as ICategory;
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Name : {category.name}</div>
          </div>
        );
      },
    },
    {
      title: "Category Details",
      renderData: (e) => <CategoryForm category={e as ICategory} />,
    },
    {
      title: "Name",
      renderData(e) {
        return (e as ICategory).name;
      },
    },
    {
      title: "Type",
      renderData: (e) => {
        return CategoryType[(e as ICategory).type];
      },
    },
  ];

  return { columns, cardColumns };
};
