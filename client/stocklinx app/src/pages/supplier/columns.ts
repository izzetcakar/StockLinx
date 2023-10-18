import { useSelector } from "react-redux";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";
import { ISupplier } from "../../interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: MyColumn[] = [
    {
      dataField: "locationId",
      caption: "Location",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, locations),
    },
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
    },
    {
      dataField: "contactPhone",
      caption: "Contact Phone",
    },
    {
      dataField: "contactEmail",
      caption: "Contact Email",
    },
    {
      dataField: "website",
      caption: "Website",
    },
    {
      dataField: "fax",
      caption: "Fax",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
  ];
  const devColumns: Column<ISupplier>[] = [
    {
      dataField: "name",
      caption: "Name",
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
    {
      dataField: "name",
    },
    {
      dataField: "locationId",
    },
    {
      dataField: "contactName",
    },
    {
      dataField: "contactPhone",
    },
    {
      dataField: "contactEmail",
    },
    {
      dataField: "website",
    },
    {
      dataField: "fax",
    },
    {
      dataField: "notes",
    },
  ];

  return { columns, devColumns, formItems };
};
