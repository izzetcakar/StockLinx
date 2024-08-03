import { IUser } from "@interfaces/serverInterfaces";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import UserForm from "@/forms/user/UserForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const columns: MRT_ColumnDef<IUser>[] = [
    {
      header: "Full Name",
      Cell: ({ row }) => row.original.firstName + " " + row.original.lastName,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "jobTitle",
      header: "Title",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNo",
      header: "Phone",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
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
