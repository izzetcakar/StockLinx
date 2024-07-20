import { IDepartment } from "@interfaces/serverInterfaces";
import { useLocation, useCompany } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import DepartmentForm from "@/forms/department/DepartmentForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: locationLK,
    isRefetching: locationLoading,
    refetch: getLocationLK,
  } = useLocation.Lookup();

  const columns: MRT_ColumnDef<IDepartment>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "companyId",
      header: "Company",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Company(row.original.companyId),
      mantineFilterMultiSelectProps: () => ({
        data: companyLoading ? [] : companyLK,
        rightSection: companyLoading ? null : <Loader size={16} />,
        onDropdownOpen: getCompanyLK,
      }),
    },
    {
      accessorKey: "locationId",
      header: "Location",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Location(row.original.locationId),
      mantineFilterMultiSelectProps: () => ({
        data: locationLoading ? [] : locationLK,
        rightSection: locationLoading ? null : <Loader size={16} />,
        onDropdownOpen: getLocationLK,
      }),
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (department: IDepartment) => {
        return <div>Name : {department.name}</div>;
      },
      renderData: (e) => <DepartmentForm department={e as IDepartment} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
