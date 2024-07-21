import { ProductStatusType } from "@interfaces/enums";
import { createDataFromEnum } from "../../utils/enumUtils";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { IProductStatus } from "@/interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import ProductStatusForm from "@/forms/productStatus/ProductStatusForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

const productStatusData = createDataFromEnum(ProductStatusType).map((e) => ({
  value: e.value.toString(),
  label: e.label,
}));

export const useColumns = () => {
  const columns: MRT_ColumnDef<IProductStatus>[] = [
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
        return productStatusData.find((e) => e.value === cell.getValue())
          ?.label;
      },
      mantineFilterMultiSelectProps: () => ({
        data: productStatusData,
      }),
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (productStatus: IProductStatus) => {
        return <div>Name : {productStatus.name}</div>;
      },
      renderData: (e) => (
        <ProductStatusForm productStatus={e as IProductStatus} />
      ),
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
