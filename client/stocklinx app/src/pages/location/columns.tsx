import { Anchor } from "@mantine/core";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { ILocation } from "../../interfaces/interfaces";

export const useColumns = () => {
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/location/${(e as ILocation)?.id}`)}
            target="_blank"
            underline={true}
          >
            {(e as ILocation).name}
          </Anchor>
        );
      },
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
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Country",
    },
    {
      caption: "State",
    },
    {
      caption: "City",
    },
    {
      caption: "Address",
    },
    {
      caption: "Address2",
    },
    {
      caption: "Zip Code",
    },
    {
      caption: "Currency",
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
