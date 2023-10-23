import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ISupplier } from "../../interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);

  const getFilteredBranches = (options: { data?: ISupplier; key?: string }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };

  const devColumns: Column<ISupplier>[] = [
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
      dataField: "locationId",
      caption: "Location",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
    },
    {
      dataField: "contactEmail",
      caption: "Email",
    },
    {
      dataField: "contactPhone",
      caption: "Phone",
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "locationId" },
    { dataField: "contactName" },
    { dataField: "contactPhone" },
    { dataField: "contactEmail" },
    { dataField: "website" },
    { dataField: "fax" },
    { dataField: "notes" },
  ];

  return { devColumns, formItems };
};
