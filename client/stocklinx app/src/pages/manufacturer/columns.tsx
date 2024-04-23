import { useNavigate } from "react-router-dom";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { IManufacturer } from "../../interfaces/serverInterfaces";
import { Anchor, Image } from "@mantine/core";
import { getImage } from "../../functions/Image";

export const useColumns = () => {
  const navigate = useNavigate();

  const columns: BaseColumn[] = [
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
            underline="always"
          >
            {(e as IManufacturer).name}
          </Anchor>
        );
      },
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "action",
      renderComponent(e) {
        const image = getImage((e as IManufacturer).imagePath);
        if (!image) return null;
        return (
          <Image
            src={image}
            height={50}
            radius="md"
            width="fit-content"
            fit="contain"
          />
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
