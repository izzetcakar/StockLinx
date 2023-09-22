import { Column } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: Column[] = [
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
  return columns;
};
