import { EntityCells } from "@/cells/Entity";
import { useCompany, useUser } from "@queryhooks";
import { IPermission } from "@/interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";

export const useColumns = () => {
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: userLK,
    isRefetching: userLoading,
    refetch: getUserLK,
  } = useUser.Lookup();

  const columns: MRT_ColumnDef<IPermission>[] = [
    {
      accessorKey: "companyId",
      header: "Company",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Company(row.original.companyId),
      mantineFilterMultiSelectProps: () => ({
        data: companyLoading ? [] : companyLK,
        rightSection: companyLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCompanyLK,
      }),
    },
    {
      accessorKey: "userId",
      header: "User",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.User(row.original.userId),
      mantineFilterMultiSelectProps: () => ({
        data: userLoading ? [] : userLK,
        rightSection: userLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getUserLK,
      }),
    },
    {
      accessorKey: "createdDate",
      header: "Date",
    },
  ];

  return { columns };
};
