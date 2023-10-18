import { Column } from "devextreme/ui/data_grid";
import { ILocationCounts } from "../../../interfaces/interfaces";
import { barcodeHeaderTemplate, userHeaderTemplate } from "./customColumns";

export const useColumns = () => {
  const columns: Column<ILocationCounts>[] = [
    {
      dataField: "locationName",
      caption: "Name",
    },
    {
      dataField: "productCount",
      caption: "Product",
      dataType: "number",
      alignment: "center",
      headerCellTemplate: barcodeHeaderTemplate,
    },
    {
      dataField: "assignedCount",
      caption: "Assigned",
      dataType: "number",
      alignment: "center",
    },
    {
      dataField: "userCount",
      caption: "User",
      dataType: "number",
      alignment: "center",
      headerCellTemplate: userHeaderTemplate,
    },
  ];

  return columns;
};
