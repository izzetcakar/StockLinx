import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IDepartment } from "@interfaces/serverInterfaces";
import { useLocation } from "@/hooks/query/location";
import { useUser } from "@/hooks/query/user";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import DepartmentForm from "@/forms/department/DepartmentForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const { refetch: getLocationLK } = useLocation.Lookup();
  const { refetch: getUserLK } = useUser.Lookup();

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
      renderComponent: (e) =>
        EntityCells.Location((e as IDepartment).locationId),
    },
    {
      dataField: "managerId",
      caption: "Manager",
      dataType: "string",
      lookup: {
        dataSource: getUserLK,
      },
      renderComponent: (e) => EntityCells.User((e as IDepartment).managerId),
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
