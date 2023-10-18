import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "devextreme/ui/data_grid";
import { IDepartment } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: MyColumn[] = [
    {
      dataField: "companyId",
      caption: "Company",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, companies),
    },
    {
      dataField: "locationId",
      caption: "Location",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, locations),
    },
    {
      dataField: "managerId",
      caption: "Manager",
    },
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
  ];
  const devColumns: Column<IDepartment>[] = [
    {
      dataField: "companyId",
      caption: "Company",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "managerId",
      caption: "Manager",
    },
  ];
  const formItems: IFormItem[] = [
    {
      dataField: "companyId",
    },
    {
      dataField: "name",
    },
    {
      dataField: "managerId",
    },
    {
      dataField: "notes",
    },
  ];

  return { columns, devColumns, formItems };
};
