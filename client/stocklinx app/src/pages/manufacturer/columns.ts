import { Column } from "devextreme/ui/data_grid";
import { IManufacturer } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "url",
      caption: "URL",
      dataType: "string",
    },
    {
      dataField: "supportURL",
      caption: "Support URL",
      dataType: "string",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
      dataType: "string",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
      dataType: "string",
    },
  ];

  const devColumns: Column<IManufacturer>[] = [
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "url",
      caption: "URL",
    },
    {
      dataField: "supportURL",
      caption: "Support URL",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "url" },
    { dataField: "supportURL" },
    { dataField: "supportPhone" },
    { dataField: "supportEmail" },
  ];
  return { columns, devColumns, formItems };
};
