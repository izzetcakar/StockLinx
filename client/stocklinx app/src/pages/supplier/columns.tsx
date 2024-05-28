import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BaseColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor, Image } from "@mantine/core";
import { ISupplier } from "../../interfaces/serverInterfaces";
import { getImage } from "../../utils/Image";

export const useColumns = () => {
  const navigate = useNavigate();
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: BaseColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/supplier/${(e as ISupplier)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as ISupplier).name}
          </Anchor>
        );
      },
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "action",
      renderComponent(e) {
        const image = getImage((e as ISupplier).imagePath);
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
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: {
        data: locations.map((location) => ({
          value: location.id,
          label: location.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() =>
              navigate(`/location/${(e as ISupplier)?.locationId}`)
            }
            target="_blank"
            underline="always"
          >
            {
              locations.find(
                (location) => location.id === (e as ISupplier)?.locationId
              )?.name
            }
          </Anchor>
        );
      },
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
      dataType: "string",
    },
    {
      dataField: "contactEmail",
      caption: "Contact Email",
      dataType: "string",
    },
    {
      dataField: "contactPhone",
      caption: "Contact Phone",
      dataType: "string",
    },
    {
      dataField: "website",
      caption: "Website",
      dataType: "string",
    },
    {
      dataField: "fax",
      caption: "Fax",
      dataType: "string",
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
    },
    // INVISIBLE COLUMNS
    {
      dataField: "imagePath",
      caption: "Image",
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
      caption: "Location",
      nullable: true,
    },
    {
      caption: "Contact Name",
    },
    {
      caption: "Contact Email",
    },
    {
      caption: "Contact Phone",
    },
    {
      caption: "Website",
    },
    {
      caption: "Fax",
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
