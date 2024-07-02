import { ICategory } from "@interfaces/serverInterfaces";
import { DataColumn } from "@interfaces/gridTableInterfaces";
import { createDataFromEnum } from "../../utils/enumUtils";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { CategoryType } from "@/interfaces/enums";
import CategoryForm from "@/forms/category/CategoryForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

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
      title: (category: ICategory) => {
        return <div>Name : {category.name}</div>;
      },
      renderData: (e) => <CategoryForm category={e as ICategory} />,
    },
    {
      title: "History",
      renderData: (e) => {
        return <HistoryLogs id={e.id} />;
      },
    },
  ];

  return { columns, cardColumns };
};
