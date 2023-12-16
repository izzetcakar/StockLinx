import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { IUser } from "../../interfaces/interfaces";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );
  const columns: Column[] = [
    {
      caption: "Company",
      dataField: "companyId",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "branchId",
      caption: "Branch",
      lookup: {
        dataSource: branches,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "departmentId",
      caption: "Department",
      lookup: {
        dataSource: departments,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "name",
      caption: "Name",
      renderComponent(e) {
        const value = (e as IUser).firstName + " " + (e as IUser).lastName;
        return <div>{value}</div>;
      },
      dataType: "action",
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
