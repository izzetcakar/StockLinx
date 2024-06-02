import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BaseColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { IDepartment } from "@interfaces/serverInterfaces";
import { Anchor } from "@mantine/core";

export const useColumns = () => {
  const navigate = useNavigate();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);
  const users = useSelector((state: RootState) => state.user.users);

  const columns: BaseColumn[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      dataType: "string",
      lookup: {
        data: branches.map((branch) => ({
          value: branch.id,
          label: branch.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/branch/${(e as IDepartment)?.branchId}`)}
            target="_blank"
            underline="always"
          >
            {
              branches.find(
                (branch) => branch.id === (e as IDepartment)?.branchId
              )?.name
            }
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
        data: locations.map((location) => ({
          value: location.id,
          label: location.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() =>
              navigate(`/location/${(e as IDepartment)?.locationId}`)
            }
            target="_blank"
            underline="always"
          >
            {
              locations.find(
                (location) => location.id === (e as IDepartment)?.locationId
              )?.name
            }
          </Anchor>
        );
      },
    },
    {
      dataField: "managerId",
      caption: "Manager",
      dataType: "string",
      lookup: {
        data: users.map((user) => ({
          value: user.id,
          label: user.firstName + " " + user.lastName,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/user/${(e as IDepartment)?.managerId}`)}
            target="_blank"
            underline="always"
          >
            {
              users.find((user) => user.id === (e as IDepartment)?.managerId)
                ?.firstName
            }
          </Anchor>
        );
      },
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      visible: false,
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
