import { ProductStatusType } from "@interfaces/enums";
import { createDataFromEnum } from "../../utils/enumUtils";
import { DataColumn } from "@interfaces/gridTableInterfaces";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { IProductStatus } from "@/interfaces/serverInterfaces";
import ProductStatusForm from "@/forms/productStatus/ProductStatusForm";
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
        data: createDataFromEnum(ProductStatusType),
      },
      dataType: "number",
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
