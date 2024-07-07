import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IEmployee } from "@interfaces/serverInterfaces";
import { useDepartment } from "@/hooks/query/department";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import EmployeeForm from "@/forms/employee/EmployeeForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const { refetch: getDepartmentLK } = useDepartment.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "departmentId",
      caption: "Department",
      dataType: "string",
      lookup: {
        dataSource: getDepartmentLK,
      },
      renderComponent: (e) =>
        EntityCells.Department((e as IEmployee).departmentId),
    },
    {
      dataField: "firstName",
      dataType: "string",
      caption: "First Name",
    },
    {
      dataField: "lastName",
      dataType: "string",
      caption: "Last Name",
    },
    {
      caption: "Title",
      dataField: "jobTitle",
      dataType: "string",
    },
    {
      dataField: "email",
      caption: "Email",
      dataType: "string",
    },
    {
      dataField: "phoneNo",
      caption: "Phone",
      dataType: "string",
    },
    {
      dataField: "startDate",
      caption: "Start Date",
      dataType: "date",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (employee: IEmployee) => {
        return (
          <div>
            Name : {employee.firstName} + + {employee.lastName}
          </div>
        );
      },
      renderData: (e) => <EmployeeForm employee={e as IEmployee} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
