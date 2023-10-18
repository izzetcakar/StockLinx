import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { ILocation } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "country",
      caption: "Country",
    },
    {
      dataField: "state",
      caption: "State",
    },
    {
      dataField: "city",
      caption: "City",
    },
    {
      dataField: "address",
      caption: "Address",
    },
    {
      dataField: "address2",
      caption: "Address2",
    },
    {
      dataField: "zipCode",
      caption: "Zip Code",
    },
    {
      dataField: "currency",
      caption: "Currency",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
  ];
  const devColumns: Column<ILocation>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "country",
      caption: "Country",
    },
    {
      dataField: "city",
      caption: "City",
    },
    {
      dataField: "address",
      caption: "Address",
    },
    {
      dataField: "currency",
      caption: "Currency",
    },
    {
      dataField: "state",
      caption: "State",
    },
  ];
  const formItems: IFormItem[] = [
    {
      dataField: "name",
    },
    {
      dataField: "country",
    },
    {
      dataField: "state",
    },
    {
      dataField: "city",
    },
    {
      dataField: "address",
    },
    {
      dataField: "address2",
    },
    {
      dataField: "zipCode",
    },
    {
      dataField: "currency",
    },
    {
      dataField: "notes",
    },
  ];

  return { columns, devColumns, formItems };
};
