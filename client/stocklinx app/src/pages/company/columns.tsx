import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import { Anchor, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ICompany } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
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
            onClick={() => navigate(`/company/${(e as ICompany)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as ICompany).name}
          </Anchor>
        );
      },
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
        data: locationLookup || [],
      },
      renderComponent(e) {
        const { data: location } = useLocation.Get(
          (e as ICompany)?.locationId || ""
        );
        return (
          <Anchor
            onClick={() => navigate(`/location/${(e as ICompany)?.locationId}`)}
            target="_blank"
            underline="always"
          >
            {location?.name || ""}
          </Anchor>
        );
      },
    },
    {
      dataField: "email",
      caption: "Email",
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
      caption: "Location",
      nullable: true,
    },
    {
      caption: "Email",
    },
    {
      caption: "Image",
    },
  ];

  return { columns, excelColumns };
};
