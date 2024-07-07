import { DataColumn } from "@interfaces/gridTableInterfaces";

export const useColumns = () => {
  const columns: DataColumn[] = [
    {
      dataField: "productType",
      caption: "Product Type",
      dataType: "string",
    },
    {
      dataField: "productTag",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
      dataType: "number",
    },
    {
      dataField: "assignDate",
      caption: "Assigned Date",
      dataType: "date",
    },
  ];

  return columns;
};
