import { ProductStatusType } from "@interfaces/enums";
import { createDataFromEnum } from "../../utils/enumUtils";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { IProductStatus } from "@/interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import ProductStatusForm from "@/forms/productStatus/ProductStatusForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

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
      Cell: ({ row }) => ProductStatusType[row.original.type],
      mantineFilterMultiSelectProps: () => ({
        data: createDataFromEnum(ProductStatusType),
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
