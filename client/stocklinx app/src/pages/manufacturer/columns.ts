import { Column } from "devextreme/ui/data_grid";
import { IManufacturer } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);

  const getFilteredBranches = (options: {
    data?: IManufacturer;
    key?: string;
  }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };

  const devColumns: Column<IManufacturer>[] = [
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
      visible: false,
    },
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "url",
      caption: "URL",
    },
    {
      dataField: "supportURL",
      caption: "Support URL",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "url" },
    { dataField: "supportURL" },
    { dataField: "supportPhone" },
    { dataField: "supportEmail" },
  ];
  return { devColumns, formItems };
};
