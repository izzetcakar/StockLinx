import { Column } from "devextreme/ui/data_grid";
import { CategoryType, ICategory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import {
  ExcelColumn,
  Column as MyColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const productTypes = [
    { id: CategoryType.ASSET, name: "Asset" },
    { id: CategoryType.LICENSE, name: "License" },
    { id: CategoryType.ACCESSORY, name: "Accessory" },
    { id: CategoryType.CONSUMABLE, name: "Consumable" },
    { id: CategoryType.COMPONENT, name: "Component" },
  ];

  const columns: MyColumn[] = [
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
      dataField: "name",
      validate(value) {
        return value !== null && value !== undefined && value !== "";
      },
      errorText: "Name is required",
    },
    {
      dataField: "type",
    },
  ];
  const devColumns: Column<ICategory>[] = [
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: productTypes,
        valueExpr: "id",
        displayExpr: "name",
      },
      validationRules: [{ type: "required" }],
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "type" },
  ];

  return { excelColumns, columns, devColumns, formItems };
};
