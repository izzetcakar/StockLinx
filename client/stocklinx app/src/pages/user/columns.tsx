import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IUser } from "@interfaces/serverInterfaces";
import { useDepartment } from "@/hooks/query/department";
import { EntityCells } from "@/cells/Entity";

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

  return { columns };
};
