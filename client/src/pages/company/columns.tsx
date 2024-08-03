import { ICompany } from "@interfaces/serverInterfaces";
import { useLocation } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import CompanyForm from "@/forms/company/CompanyForm";

export const useColumns = () => {
  const {
    data: locationLK,
    isRefetching: locationLoading,
    refetch: getLocationLK,
  } = useLocation.Lookup();

  const columns: MRT_ColumnDef<ICompany>[] = [
    {
      accessorKey: "tag",
      header: "Tag",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      accessorKey: "locationId",
      header: "Location",
      Cell: ({ row }) => EntityCells.Location(row.original.locationId),
      mantineFilterMultiSelectProps: () => ({
        data: locationLoading ? [] : locationLK,
        rightSection: locationLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getLocationLK,
      }),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (company: ICompany) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {company.tag}</div>
            <div>Name : {company.name}</div>
          </div>
        );
      },
      renderData: (e) => <CompanyForm company={e as ICompany} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
