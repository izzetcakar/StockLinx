import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { BaseColumn } from "@interfaces/gridTableInterfaces";
import { IUser } from "../../interfaces/serverInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor } from "@mantine/core";

export const useColumns = () => {
  const navigate = useNavigate();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

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
            onClick={() =>
              navigate(
                `/branch/${
                  branches.find(
                    (branch) =>
                      branch.id ===
                      departments.find(
                        (department) =>
                          department.id === (e as IUser).departmentId
                      )?.branchId
                  )?.id
                }`
              )
            }
            target="_blank"
            underline="always"
          >
            {
              branches.find(
                (branch) =>
                  branch.id ===
                  departments.find(
                    (department) => department.id === (e as IUser).departmentId
                  )?.branchId
              )?.name
            }
          </Anchor>
        );
      },
    },
    {
      dataField: "departmentId",
      caption: "Department",
      dataType: "string",
      lookup: {
        data: departments.map((department) => ({
          value: department.id,
          label: department.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() =>
              navigate(
                `/department/${
                  departments.find(
                    (department) => department.id === (e as IUser).departmentId
                  )?.id
                }`
              )
            }
            target="_blank"
            underline="always"
          >
            {
              departments.find(
                (department) => department.id === (e as IUser).departmentId
              )?.name
            }
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
