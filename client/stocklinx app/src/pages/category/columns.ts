import { Column } from "devextreme/ui/data_grid";
import { ICategory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const productTypes = [
    { id: 0, name: "Asset" },
    { id: 2, name: "License" },
    { id: 3, name: "Accessory" },
    { id: 5, name: "Consumable" },
    { id: 4, name: "Component" },
  ];

  const getFilteredBranches = (options: { data?: ICategory; key?: string }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };

  const columns: MyColumn[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      renderComponent(value) {
        const branch = branches.find((b) => b.id === value);
        return branch?.name;
      },
    },
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "type",
      caption: "Type",
      renderComponent(value) {
        const type = productTypes.find((t) => t.id === value);
        return type?.name || "";
      },
    },
  ];

  const devColumns: Column<ICategory>[] = [
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
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: productTypes,
        valueExpr: "id",
        displayExpr: "name",
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

  return { columns, devColumns, formItems };
};
