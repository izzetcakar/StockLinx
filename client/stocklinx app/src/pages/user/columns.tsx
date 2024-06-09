import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IUser } from "@interfaces/serverInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor } from "@mantine/core";
import { useBranch } from "@/hooks/branch";
import { useDepartment } from "@/hooks/department";

export const useColumns = () => {
  const navigate = useNavigate();
  const { data: branchLookup } = useBranch.Lookup();
  const { data: departmentLookup } = useDepartment.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      dataType: "string",
      lookup: {
        data: branchLookup || [],
      },
      renderComponent(e) {
        const user = e as IUser;
        const { data: department } = useDepartment.Get(user.departmentId);
        const branch = branchLookup?.find(
          (branch) => branch.value === department?.branchId
        );
        return (
          <Anchor
            onClick={() => navigate(`/branch/${branch?.value}`)}
            target="_blank"
            underline="always"
          >
            {branch?.label}
          </Anchor>
        );
      },
    },
    {
      dataField: "departmentId",
      caption: "Department",
      dataType: "string",
      lookup: {
        data: departmentLookup || [],
      },
      renderComponent(e) {
        const user = e as IUser;
        const { data: department } = useDepartment.Get(user.departmentId);
        return (
          <Anchor
            onClick={() => navigate(`/department/${department?.id}`)}
            target="_blank"
            underline="always"
          >
            {department?.name}
          </Anchor>
        );
      },
    },
    {
      dataField: "firstName",
      dataType: "action",
      caption: "Name",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/user/${(e as IUser)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IUser)?.firstName} {(e as IUser)?.lastName}
          </Anchor>
        );
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
