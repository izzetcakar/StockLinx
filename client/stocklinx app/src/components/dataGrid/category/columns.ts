import { BaseColumn } from "../../gridTable/interfaces/interfaces";
import "../customDatagrid.scss";

export const useColumns = () => {
  const columns: BaseColumn[] = [
    {
      dataField: "categoryName",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "productName",
      caption: "Name",
      dataType: "string",
      lookup: {
        data: [
          { label: "Asset", value: "Asset" },
          { label: "License", value: "License" },
          { label: "Accessory", value: "Accessory" },
          { label: "Consumable", value: "Consumable" },
          { label: "Component", value: "Component" },
        ],
      },
    },
    {
      dataField: "productCount",
      caption: "Count",
      dataType: "number",
    },
  ];

  return columns;
};
