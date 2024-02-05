import { Anchor } from "@mantine/core";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IBranch } from "../../interfaces/interfaces";

export const useColumns = () => {
  const navigate = useNavigate();
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);
  const columns: BaseColumn[] = [
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "action",
      lookup: {
        defaultData: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/company/${(e as IBranch)?.companyId}`)}
            target="_blank"
            underline={true}
          >
            {
              companies.find(
                (company) => company.id === (e as IBranch)?.companyId
              )?.name
            }
          </Anchor>
        );
      },
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/branch/${(e as IBranch)?.id}`)}
            target="_blank"
            underline={true}
          >
            {(e as IBranch).name}
          </Anchor>
        );
      },
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: {
        defaultData: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/location/${(e as IBranch)?.locationId}`)}
            target="_blank"
            underline={true}
          >
            {
              locations.find(
                (location) => location.id === (e as IBranch)?.locationId
              )?.name
            }
          </Anchor>
        );
      },
    },
  ];
  const excelColumns: ExcelColumn[] = [
    {
      caption: "Company",
      validate(value) {
        return value !== null;
      },
      errorText: "Company is required",
    },
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
  ];

  return { columns, excelColumns };
};
