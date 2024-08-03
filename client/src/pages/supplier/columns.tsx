import { ISupplier } from "@interfaces/serverInterfaces";
import { useLocation } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import SupplierForm from "@/forms/supplier/SupplierForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const {
    data: locationsLK,
    isRefetching: locationLoading,
    refetch: getLocationLK,
  } = useLocation.Lookup();

  const columns: MRT_ColumnDef<ISupplier>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "locationId",
      header: "Location",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Location(row.original.locationId),
      mantineFilterMultiSelectProps: () => ({
        data: locationLoading ? [] : locationsLK,
        rightSection: locationLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getLocationLK,
      }),
    },
    {
      accessorKey: "contactName",
      header: "Contact Name",
    },
    {
      accessorKey: "contactEmail",
      header: "Contact Email",
    },
    {
      accessorKey: "contactPhone",
      header: "Contact Phone",
    },
    {
      accessorKey: "website",
      header: "Website",
    },
    {
      accessorKey: "fax",
      header: "Fax",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (supplier: ISupplier) => {
        return <div>Name : {supplier.name}</div>;
      },
      renderData: (e) => <SupplierForm supplier={e as ISupplier} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
