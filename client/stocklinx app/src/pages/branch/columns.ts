import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { IBranch } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);
  const columns: MyColumn[] = [
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
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
    },
  ];
  const devColumns: Column<IBranch>[] = [
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "companyId",
      caption: "Company",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
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
  ];
  const formItems: IFormItem[] = [
    { dataField: "name" },
    { dataField: "companyId" },
    { dataField: "locationId" },
  ];

  return { columns, devColumns, formItems };
};
