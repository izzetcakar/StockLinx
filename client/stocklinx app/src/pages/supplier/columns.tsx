import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Image } from "@mantine/core";
import { ISupplier } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import { useLocation } from "@/hooks/query/location";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { refetch: getLocationLK } = useLocation.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
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
        dataSource: getLocationLK,
      },
      renderComponent: (e) => EntityCells.Location((e as ISupplier).locationId),
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

  return { columns };
};
