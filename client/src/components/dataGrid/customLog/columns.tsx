import { ICustomLog } from "../../../interfaces/serverInterfaces";
import { Loader } from "@mantine/core";
import { useUser } from "@queryhooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { EntityCells } from "@/cells/Entity";
import { formatDate } from "@/utils/dateUtils";

export const useColumns = () => {
  const {
    data: userLK,
    isRefetching: userLoading,
    refetch: getUserLK,
  } = useUser.Lookup();

  const columns: MRT_ColumnDef<ICustomLog>[] = [
    {
      accessorKey: "action",
      header: "Action",
    },
    {
      accessorKey: "userId",
      header: "User",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.User(row.original.userId),
      mantineFilterSelectProps: () => ({
        data: userLoading ? [] : userLK,
        rightSection: userLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getUserLK,
      }),
    },
    {
      accessorKey: "date",
      header: "Date",
      filterVariant: "date-range",
      accessorFn: (originalRow) =>
        originalRow.date ? new Date(originalRow.date) : "",
      Cell: ({ row }) => formatDate(row.original.date),
    },
    {
      accessorKey: "itemController",
      header: "Item Controller",
    },
    {
      accessorKey: "item",
      header: "Item",
    },
    {
      accessorKey: "targetController",
      header: "Target Controller",
    },
    {
      accessorKey: "target",
      header: "Target",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  return { columns };
};
