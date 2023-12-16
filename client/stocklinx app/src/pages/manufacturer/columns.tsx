import { useNavigate } from "react-router-dom";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { IManufacturer } from "../../interfaces/interfaces";
import { Anchor } from "@mantine/core";

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
            onClick={() =>
              navigate(`/manufacturer/${(e as IManufacturer)?.id}`)
            }
            target="_blank"
            underline={true}
          >
            {(e as IManufacturer).name}
          </Anchor>
        );
      },
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
    // INVISIBLE COLUMNS
    {
      dataField: "imagePath",
      caption: "Image",
      dataType: "string",
      visible: false,
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      visible: false,
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
      caption: "URL",
    },
    {
      caption: "Support URL",
    },
    {
      caption: "Support Phone",
    },
    {
      caption: "Support Email",
    },
    {
      caption: "Image",
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
