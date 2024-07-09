import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IUser } from "@interfaces/serverInterfaces";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import UserForm from "@/forms/user/UserForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const columns: DataColumn[] = [
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
          <div>
            Name : {user.firstName} {user.lastName}
          </div>
        );
      },
      renderData: (e) => <UserForm user={e as IUser} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs userId={(e as IUser).id} />,
    },
  ];

  return { columns, cardColumns };
};
