import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IDepartment } from "@interfaces/serverInterfaces";
import { useLocation } from "@/hooks/location";
import { useUser } from "@/hooks/user";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { refetch: getLocationLK } = useLocation.Lookup();
  const { refetch: getUserLK } = useUser.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: {
        dataSource: getLocationLK,
      },
      renderComponent: (e) =>
        EntityCells.Location((e as IDepartment).locationId),
    },
    {
      dataField: "managerId",
      caption: "Manager",
      dataType: "string",
      lookup: {
        dataSource: getUserLK,
      },
      renderComponent: (e) => EntityCells.User((e as IDepartment).managerId),
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      allowVisible: false,
    },
  ];

  return { columns };
};
