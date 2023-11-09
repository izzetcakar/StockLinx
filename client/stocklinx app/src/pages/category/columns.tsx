import { Column } from "devextreme/ui/data_grid";
import { ICategory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const productTypes = [
    { id: 0, name: "Asset" },
    { id: 2, name: "License" },
    { id: 3, name: "Accessory" },
    { id: 5, name: "Consumable" },
    { id: 4, name: "Component" },
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

  return { columns, devColumns, formItems };
};
