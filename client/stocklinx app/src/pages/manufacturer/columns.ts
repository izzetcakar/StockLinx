import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { IManufacturer } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
    },
    {
      dataField: "website",
      caption: "Website",
    },
  ];
  const devColumns: Column<IManufacturer>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
    },
    {
      dataField: "website",
      caption: "Website",
    },
  ];
  const formItems: IFormItem[] = [
    {
      dataField: "name",
    },
    {
      dataField: "supportPhone",
    },
    {
      dataField: "supportEmail",
    },
    {
      dataField: "website",
    },
  ];
  return { columns, devColumns, formItems };
};
