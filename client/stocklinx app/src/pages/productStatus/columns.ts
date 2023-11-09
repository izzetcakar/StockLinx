import { Column } from "devextreme/ui/data_grid";
import { IProductStatus, ProductStatusType } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
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
        dataSource: createDataFromEnum(ProductStatusType),
        valueExpr: "value",
        displayExpr: "id",
      },
      dataType: "number",
    },
  ];

  const devColumns: Column<IProductStatus>[] = [
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: createDataFromEnum(ProductStatusType),
        valueExpr: "value",
        displayExpr: "id",
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
