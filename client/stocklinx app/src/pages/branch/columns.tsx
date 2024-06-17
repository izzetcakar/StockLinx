import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IBranch } from "@interfaces/serverInterfaces";
import { useCompany } from "@/hooks/company";
import { useLocation } from "@/hooks/location";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { refetch: fetchCompanyLookup } = useCompany.Lookup();
  const { refetch: fetchLocationLookup } = useLocation.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "action",
      lookup: {
        dataSource: fetchCompanyLookup,
      },
      renderComponent: (e) => EntityCells.Company((e as IBranch).companyId),
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: { dataSource: fetchLocationLookup },
      renderComponent: (e) => EntityCells.Location((e as IBranch).locationId),
    },
  ];

  return { columns };
};
