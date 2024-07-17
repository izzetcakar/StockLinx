import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IDepartment } from "@interfaces/serverInterfaces";
import { useLocation, useCompany } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import DepartmentForm from "@/forms/department/DepartmentForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const { refetch: getLocationLK } = useLocation.Lookup();
  const { refetch: getCompanyLK } = useCompany.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      lookup: {
        dataSource: getCompanyLK,
      },
      renderComponent: (e) => EntityCells.Company((e as IDepartment).companyId),
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: {
        dataSource: getLocationLK,
      },
      renderComponent: (e) =>
        EntityCells.Location((e as IDepartment).locationId),
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
