import { Column } from "devextreme/ui/data_grid";
import { CategoryType, ICategory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

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
