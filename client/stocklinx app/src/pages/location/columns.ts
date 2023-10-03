import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { ILocation } from "../../interfaces/interfaces";

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

  return { columns, devColumns };
};
