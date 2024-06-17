import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Image } from "@mantine/core";
import { ICompany } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import { useLocation } from "@/hooks/location";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { refetch: fetchLocationLookup } = useLocation.Lookup();

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
        const image = getImage((e as ICompany).imagePath);
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
      caption: "Location",
      dataField: "locationId",
      dataType: "string",
      lookup: {
        dataSource: fetchLocationLookup,
      },
      renderComponent: (e) => EntityCells.Location((e as ICompany).locationId),
    },
    {
      dataField: "email",
      caption: "Email",
      dataType: "string",
    },
  ];

  return { columns };
};
