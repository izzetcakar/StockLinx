import icon_barcode from "../../../assets/icon_barcode.png";
import { Column } from "../../gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: Column[] = [
    {
      dataField: "locationName",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "productCount",
      caption: "Product",
      dataType: "number",
      renderHeader: () => <img src={icon_barcode} height={16} />,
    },
    {
      dataField: "assignedCount",
      caption: "Assigned",
      dataType: "number",
    },
  ];

  return columns;
};
