import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { IDepartment } from "../../interfaces/interfaces";
import { Anchor } from "@mantine/core";

export const useColumns = () => {
  const navigate = useNavigate();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);
  const users = useSelector((state: RootState) => state.user.users);

  const columns: Column[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      dataType: "string",
      lookup: {
        dataSource: branches,
        valueExpr: "id",
        displayExpr: "name",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/branch/${(e as IDepartment)?.branchId}`)}
            target="_blank"
            underline={true}
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
            underline={true}
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
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() =>
              navigate(`/location/${(e as IDepartment)?.locationId}`)
            }
            target="_blank"
            underline={true}
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
        dataSource: users,
        valueExpr: "id",
        displayExpr: "firstName",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/user/${(e as IDepartment)?.managerId}`)}
            target="_blank"
            underline={true}
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
