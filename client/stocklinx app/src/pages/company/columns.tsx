import { useSelector } from "react-redux";
import {
  BaseColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import { RootState } from "../../redux/rootReducer";
import { Anchor, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ICompany } from "@interfaces/serverInterfaces";
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
        data: locations.map((location) => ({
          value: location.id,
          label: location.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/location/${(e as ICompany)?.locationId}`)}
            target="_blank"
            underline="always"
          >
            {
              locations.find(
                (location) => location.id === (e as ICompany)?.locationId
              )?.name
            }
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
