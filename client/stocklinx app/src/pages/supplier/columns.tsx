import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor, Image } from "@mantine/core";
import { ISupplier } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/Image";
import { useLocation } from "@/hooks/location";

export const useColumns = () => {
  const navigate = useNavigate();
  const { data: locationLookup } = useLocation.Lookup();

  const columns: DataColumn[] = [
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
        data: locationLookup || [],
      },
      renderComponent(e) {
        const supplier = e as ISupplier;
        const { data: location } = useLocation.Get(supplier.locationId || "");
        return (
          <Anchor
            onClick={() =>
              navigate(`/location/${(e as ISupplier)?.locationId}`)
            }
            target="_blank"
            underline="always"
          >
            {location?.name}
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
      allowVisible: false,
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
