import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { IManufacturer } from "@/interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import ManufacturerForm from "@/forms/manufacturer/ManufacturerForm";

export const useColumns = () => {
  const columns: MRT_ColumnDef<IManufacturer>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "url",
      header: "URL",
    },
    {
      accessorKey: "supportURL",
      header: "Support URL",
    },
    {
      accessorKey: "supportPhone",
      header: "Support Phone",
    },
    {
      accessorKey: "supportEmail",
      header: "Support Email",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (manufacturer: IManufacturer) => {
        return <div>Name : {manufacturer.name}</div>;
      },
      renderData: (e) => <ManufacturerForm manufacturer={e as IManufacturer} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
