import { DataColumn } from "@interfaces/gridTableInterfaces";
import { ICompany } from "@interfaces/serverInterfaces";
import { useLocation } from "@/hooks/query/location";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { refetch: fetchLocationLK } = useLocation.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      caption: "Location",
      dataField: "locationId",
      dataType: "string",
      lookup: {
        dataSource: fetchLocationLK,
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
