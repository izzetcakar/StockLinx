import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { BaseColumn } from "../../components/gridTable/interfaces/interfaces";
import { IUser } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { Anchor } from "@mantine/core";

export const useColumns = () => {
  const navigate = useNavigate();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  const columns: BaseColumn[] = [
    {
      caption: "Company",
      dataField: "companyId",
      dataType: "string",
      lookup: {
        defaultData: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/company/${(e as IUser)?.companyId}`)}
            target="_blank"
            underline={true}
          >
            {
              companies.find(
                (company) => company.id === (e as IUser)?.companyId
              )?.name
            }
          </Anchor>
        );
      },
    },
    {
      dataField: "branchId",
      caption: "Branch",
      dataType: "string",
      lookup: {
        defaultData: branches,
        valueExpr: "id",
        displayExpr: "name",
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
            underline={true}
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
        defaultData: departments,
        valueExpr: "id",
        displayExpr: "name",
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
            underline={true}
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
            underline={true}
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
