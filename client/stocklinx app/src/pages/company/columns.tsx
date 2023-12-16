import { useSelector } from "react-redux";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { RootState } from "../../redux/rootReducer";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ICompany } from "../../interfaces/interfaces";

export const useColumns = () => {
  const navigate = useNavigate();
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/company/${(e as ICompany)?.id}`)}
            target="_blank"
            underline={true}
          >
            {(e as ICompany).name}
          </Anchor>
        );
      },
    },
    {
      caption: "Location",
      dataField: "locationId",
      dataType: "string",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/location/${(e as ICompany)?.locationId}`)}
            target="_blank"
            underline={true}
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
      caption: "Email",
    },
    {
      caption: "Image",
    },
  ];

  return { columns, excelColumns };
};
