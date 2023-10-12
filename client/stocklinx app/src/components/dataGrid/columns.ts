import { Column } from "devextreme/ui/data_grid";
import { ILocationCounts } from "../../interfaces/interfaces";

export const useColumns = () => {
  const columns: Column<ILocationCounts>[] = [
    {
      dataField: "locationName",
      caption: "Name",
    },
    {
      dataField: "assignedCount",
      caption: "Assigned",
      dataType: "number",
      alignment: "center",
    },
    {
      dataField: "productCount",
      caption: "Product",
      dataType: "number",
      alignment: "center",
    },
    {
      dataField: "userCount",
      caption: "User",
      dataType: "number",
      alignment: "center",
    },
  ];

  return columns;
};
