import { Column } from "devextreme/ui/data_grid";
import { IProductStatus, ProductStatusType } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);

  const getFilteredBranches = (options: {
    data?: IProductStatus;
    key?: string;
  }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };

  const devColumns: Column<IProductStatus>[] = [
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
      allowSearch: true,
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: createDataFromEnum(ProductStatusType),
        valueExpr: "value",
        displayExpr: "id",
      },
      validationRules: [{ type: "required" }],
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "type" },
  ];

  return { devColumns, formItems };
};
