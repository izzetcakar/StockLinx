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
        defaultData: [
          { name: "Asset" },
          { name: "License" },
          { name: "Accessory" },
          { name: "Consumable" },
          { name: "Component" },
        ],
        valueExpr: "name",
        displayExpr: "name",
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
