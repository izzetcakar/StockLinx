import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: Column[] = [
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
  const excelColumns: ExcelColumn[] = [
    {
      dataField: "name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
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

  return { columns, excelColumns };
};
