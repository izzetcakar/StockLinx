import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { ILocation } from "@/interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import LocationForm from "@/forms/location/LocationForm";

export const useColumns = () => {
  const columns: MRT_ColumnDef<ILocation>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "address2",
      header: "Address2",
    },
    {
      accessorKey: "zipCode",
      header: "Zip Code",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (location: ILocation) => {
        return <div>Name : {location.name}</div>;
      },
      renderData: (e) => <LocationForm location={e as ILocation} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
