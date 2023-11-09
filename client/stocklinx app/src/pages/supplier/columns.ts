import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ISupplier } from "../../interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "locationId",
      caption: "Location",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
      dataType: "string",
    },
    {
      dataField: "contactEmail",
      caption: "Email",
      dataType: "string",
    },
    {
      dataField: "contactPhone",
      caption: "Phone",
      dataType: "string",
    },
    {
      dataField: "website",
      caption: "Website",
      dataType: "string",
    },
    {
      dataField: "fax",
      caption: "Fax",
      dataType: "string",
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
    },
  ];

  const devColumns: Column<ISupplier>[] = [
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

  return { columns, devColumns, formItems };
};
