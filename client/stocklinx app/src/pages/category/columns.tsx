import { CategoryType } from "../../interfaces/interfaces";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const productTypes = [
    { id: CategoryType.ASSET, name: "Asset" },
    { id: CategoryType.LICENSE, name: "License" },
    { id: CategoryType.ACCESSORY, name: "Accessory" },
    { id: CategoryType.CONSUMABLE, name: "Consumable" },
    { id: CategoryType.COMPONENT, name: "Component" },
  ];

  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: productTypes,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "number",
    },
  ];
  const excelColumns: ExcelColumn[] = [
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Type",
    },
  ];

  return { columns, excelColumns };
};
