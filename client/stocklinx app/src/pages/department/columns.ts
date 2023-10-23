import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column } from "devextreme/ui/data_grid";
import { IDepartment } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const branches = useSelector((state: RootState) => state.branch.branches);
  const companies = useSelector((state: RootState) => state.company.companies);

  // const columns: MyColumn[] = [
  //   {
  //     dataField: "locationId",
  //     caption: "Location",
  //     renderComponent: (value: string | number | boolean | null | undefined) =>
  //       NameComponent(value, locations),
  //   },
  //   {
  //     dataField: "managerId",
  //     caption: "Manager",
  //   },
  //   {
  //     dataField: "name",
  //     caption: "Name",
  //   },
  // ];

  const getFilteredBranches = (options: {
    data?: IDepartment;
    key?: string;
  }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };
  const devColumns: Column<IDepartment>[] = [
    {
      dataField: "companyId",
      caption: "Company",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
      setCellValue(newData, value) {
        newData.companyId = value;
        newData.branchId = "";
      },
      visible: false,
    },
    {
      dataField: "branchId",
      caption: "Branch",
      lookup: {
        dataSource: getFilteredBranches,
        valueExpr: "id",
        displayExpr: "name",
      },
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "managerId",
      caption: "Manager",
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "managerId" },
    { dataField: "notes" },
  ];

  return { devColumns, formItems };
};
