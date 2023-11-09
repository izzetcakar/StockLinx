import { Column } from "devextreme/ui/data_grid";
import { ILocation } from "../../interfaces/interfaces";
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
      dataField: "country",
      caption: "Country",
      dataType: "string",
    },
    {
      dataField: "state",
      caption: "State",
      dataType: "string",
    },
    {
      dataField: "city",
      caption: "City",
      dataType: "string",
    },
    {
      dataField: "address",
      caption: "Address",
      dataType: "string",
    },
    {
      dataField: "address2",
      caption: "Address2",
      dataType: "string",
    },
    {
      dataField: "zipCode",
      caption: "Zip Code",
      dataType: "string",
    },
    {
      dataField: "currency",
      caption: "Currency",
      dataType: "string",
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
    },
  ];
  const devColumns: Column<ILocation>[] = [
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "state",
      caption: "State",
    },
    {
      dataField: "country",
      caption: "Country",
    },
    {
      dataField: "city",
      caption: "City",
    },
    //VISIBLE : FALSE
    {
      dataField: "address",
      caption: "Address",
      visible: false,
    },
    {
      dataField: "address2",
      caption: "Address2",
      visible: false,
    },
    {
      dataField: "currency",
      caption: "Currency",
      visible: false,
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "name" },
    { dataField: "country" },
    { dataField: "state" },
    { dataField: "city" },
    { dataField: "address" },
    { dataField: "address2" },
    { dataField: "zipCode" },
    { dataField: "currency" },
    { dataField: "notes" },
  ];

  return { columns, devColumns, formItems };
};
