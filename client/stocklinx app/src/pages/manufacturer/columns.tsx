import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { IManufacturer } from "@/interfaces/serverInterfaces";
import { DataColumn } from "@interfaces/gridTableInterfaces";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import ManufacturerForm from "@/forms/manufacturer/ManufacturerForm";

export const useColumns = () => {
  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "url",
      caption: "URL",
      dataType: "string",
    },
    {
      dataField: "supportURL",
      caption: "Support URL",
      dataType: "string",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
      dataType: "string",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
      dataType: "string",
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      allowVisible: false,
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
