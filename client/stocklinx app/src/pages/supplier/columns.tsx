import { DataColumn } from "@interfaces/gridTableInterfaces";
import { ISupplier } from "@interfaces/serverInterfaces";
import { useLocation } from "@/hooks/query/location";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import SupplierForm from "@/forms/supplier/SupplierForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const { refetch: getLocationLK } = useLocation.Lookup();

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
      renderComponent: (e) => EntityCells.Location((e as ISupplier).locationId),
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
      dataType: "string",
    },
    {
      dataField: "contactEmail",
      caption: "Contact Email",
      dataType: "string",
    },
    {
      dataField: "contactPhone",
      caption: "Contact Phone",
      dataType: "string",
    },
    {
      dataField: "website",
      caption: "Website",
      dataType: "string",
    },
    {
      dataField: "fax",
      caption: "Fax",
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
