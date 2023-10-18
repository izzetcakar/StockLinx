import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { ICategory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
    },
  ];
  const devColumns: Column<ICategory>[] = [
    // ADD IMAGE
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: [
          { id: 0, name: "Asset" },
          { id: 2, name: "License" },
          { id: 3, name: "Accessory" },
          { id: 5, name: "Consumable" },
          { id: 4, name: "Component" },
        ],
        valueExpr: "id",
        displayExpr: "name",
      },
    },
  ];
  const formItems: IFormItem[] = [
    {
      dataField: "name",
    },
    {
      dataField: "type",
    },
  ];

  return { columns, devColumns, formItems };
};
