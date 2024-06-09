import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { IDepartment } from "@interfaces/serverInterfaces";
import { Anchor } from "@mantine/core";
import { useBranch } from "@/hooks/branch";
import { useLocation } from "@/hooks/location";
import { useUser } from "@/hooks/user";

export const useColumns = () => {
  const navigate = useNavigate();
  const { data: branchLookup } = useBranch.Lookup();
  const { data: locationLookup } = useLocation.Lookup();
  const { data: userLookup } = useUser.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      dataType: "string",
      lookup: {
        data: branchLookup || [],
      },
      renderComponent(e) {
        const department = e as IDepartment;
        const { data: branch } = useBranch.Get(department.branchId);
        return (
          <Anchor
            onClick={() => navigate(`/branch/${(e as IDepartment)?.branchId}`)}
            target="_blank"
            underline="always"
          >
            {branch?.name}
          </Anchor>
        );
      },
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/department/${(e as IDepartment)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IDepartment).name}
          </Anchor>
        );
      },
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: {
        data: locationLookup || [],
      },
      renderComponent(e) {
        const department = e as IDepartment;
        const { data: location } = useLocation.Get(department.locationId || "");
        return (
          <Anchor
            onClick={() =>
              navigate(`/location/${(e as IDepartment)?.locationId}`)
            }
            target="_blank"
            underline="always"
          >
            {location?.name}
          </Anchor>
        );
      },
    },
    {
      dataField: "managerId",
      caption: "Manager",
      dataType: "string",
      lookup: {
        data: userLookup || [],
      },
      renderComponent(e) {
        const department = e as IDepartment;
        const { data: user } = useUser.Get(department.managerId || "");
        return (
          <Anchor
            onClick={() => navigate(`/user/${(e as IDepartment)?.managerId}`)}
            target="_blank"
            underline="always"
          >
            {user?.firstName + " " + user?.lastName}
          </Anchor>
        );
      },
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      allowVisible: false,
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      caption: "Branch",
      validate(value) {
        return value !== null;
      },
      errorText: "Branch is required",
    },
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Location",
      nullable: true,
    },
    {
      caption: "Manager",
      nullable: true,
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
