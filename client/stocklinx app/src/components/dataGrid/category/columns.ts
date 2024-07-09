import { DataColumn } from "@interfaces/gridTableInterfaces";

export const useColumns = () => {
  const columns: DataColumn[] = [
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
