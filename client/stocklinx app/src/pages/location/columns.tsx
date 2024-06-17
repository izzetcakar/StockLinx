import { DataColumn } from "@interfaces/gridTableInterfaces";
export const useColumns = () => {
  const columns: DataColumn[] = [
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

  return { columns };
};
