import { Anchor } from "@mantine/core";
import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { IBranch } from "@interfaces/serverInterfaces";
import { useCompany } from "@/hooks/company";
import { useLocation } from "@/hooks/location";

export const useColumns = () => {
  const navigate = useNavigate();
  const { data: companyLookup } = useCompany.Lookup();
  const { data: locationLookup } = useLocation.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "action",
      lookup: {
        data: companyLookup || [],
      },
      renderComponent(e) {
        const { data: company } = useCompany.Get((e as IBranch)?.companyId);
        return (
          <Anchor
            onClick={() => navigate(`/company/${(e as IBranch)?.companyId}`)}
            target="_blank"
            underline="always"
          >
            {company?.name || ""}
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
            underline="always"
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
      lookup: { data: locationLookup || [] },
      renderComponent(e) {
        const { data: location } = useLocation.Get(
          (e as IBranch)?.locationId || ""
        );
        return (
          <Anchor
            onClick={() => navigate(`/location/${(e as IBranch)?.locationId}`)}
            target="_blank"
            underline="always"
          >
            {location?.name || ""}
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
