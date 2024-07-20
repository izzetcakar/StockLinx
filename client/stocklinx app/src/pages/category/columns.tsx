import { ICategory } from "@interfaces/serverInterfaces";
import { createDataFromEnum } from "../../utils/enumUtils";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { CategoryType } from "@/interfaces/enums";
import { MRT_ColumnDef } from "mantine-react-table";
import CategoryForm from "@/forms/category/CategoryForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

const categoryData = createDataFromEnum(CategoryType).map((e) => ({
  value: e.value.toString(),
  label: e.label,
}));

export const useColumns = () => {
  const columns: MRT_ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
      filterVariant: "multi-select",
      accessorFn: ({ type }) => {
        return type !== null ? type.toString() : "";
      },
      Cell: ({ cell }) => {
        return categoryData.find((e) => e.value === cell.getValue())?.label;
      },
      mantineFilterMultiSelectProps: () => ({
        data: categoryData,
      }),
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
