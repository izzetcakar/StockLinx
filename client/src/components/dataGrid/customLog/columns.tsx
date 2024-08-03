import { ICustomLog } from "../../../interfaces/serverInterfaces";
import { Loader } from "@mantine/core";
import { useUser } from "@queryhooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { EntityCells } from "@/cells/Entity";
import icon_delete from "@assets/customLog/Delete.png";
import icon_update from "@assets/customLog/Update.png";
import icon_create from "@assets/customLog/Create.png";
import icon_checkIn from "@assets/customLog/CheckIn.png";
import icon_checkOut from "@assets/customLog/CheckOut.png";

const getActionIcon = (action: string) => {
  switch (action) {
    case "Create":
      return icon_create;
    case "Update":
      return icon_update;
    case "Delete":
      return icon_delete;
    case "CheckIn":
      return icon_checkIn;
    case "CheckOut":
      return icon_checkOut;
    default:
      return icon_create;
  }
};
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
      filterVariant: "multi-select",
      Cell: ({ row }) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={getActionIcon(row.original.action)}
              height={16}
              width={16}
            />
          </div>
        );
      },
      mantineFilterMultiSelectProps: () => ({
        data: [
          { value: "Create", label: "Create" },
          { value: "Update", label: "Update" },
          { value: "Delete", label: "Delete" },
          { value: "CheckIn", label: "CheckIn" },
          { value: "CheckOut", label: "CheckOut" },
        ],
      }),
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
      Cell: ({ cell }) =>
        cell.getValue() !== ""
          ? cell.getValue<Date>().toLocaleDateString()
          : "",
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
  ];

  return { columns };
};
