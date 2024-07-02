import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IUser } from "@interfaces/serverInterfaces";
import { useDepartment } from "@/hooks/query/department";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import UserForm from "@/forms/user/UserForm";
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
      renderComponent: (e) => EntityCells.Department((e as IUser).departmentId),
    },
    {
      dataField: "firstName",
      dataType: "action",
      caption: "Name",
      renderComponent(e) {
        const user = e as IUser;
        return user?.firstName + user?.lastName;
      },
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
      title: (user: IUser) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {user.employeeNo}</div>
            <div>
              Name : {user.firstName} + + {user.lastName}
            </div>
          </div>
        );
      },
      renderData: (e) => <UserForm user={e as IUser} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
