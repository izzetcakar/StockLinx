import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "devextreme/ui/data_grid";
import { IConsumable } from "../../interfaces/interfaces";

export const useColumns = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const columns: MyColumn[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, categories),
    },
    {
      dataField: "locationId",
      caption: "Location",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, locations),
    },
    {
      dataField: "companyId",
      caption: "Company",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, companies),
    },
    {
      dataField: "statusId",
      caption: "Status",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, productStatuses),
    },
    {
      dataField: "name",
      caption: "Name",
    },
    { dataField: "serialNo", caption: "Serial No" },
    { dataField: "orderNo", caption: "Order No" },
    {
      dataField: "modelNo",
      caption: "Model No",
    },
    {
      dataField: "itemNo",
      caption: "Item No",
    },
    { dataField: "tagNo", caption: "Tag No" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
    },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "notes", caption: "Notes" },
  ];
  const devColumns: Column<IConsumable>[] = [
    { dataField: "id", visible: false },
    {
      dataField: "quantity",
      dataType: "number",
      caption: "Quantity",
    },
    { dataField: "itemNo", caption: "Item No" },
    { dataField: "modelNo", caption: "Model No" },
    { dataField: "categoryId", caption: "Category" },
    {
      dataField: "locationId",
      caption: "Location",
      calculateDisplayValue: (rowData: IConsumable) => {
        const location = locations.find((l) => l.id === rowData.locationId);
        return location ? location.name : "";
      },
    },
    {
      dataField: "companyId",
      caption: "Company",
      calculateDisplayValue: (rowData: IConsumable) => {
        const company = companies.find((c) => c.id === rowData.companyId);
        return company ? company.name : "";
      },
    },
    { dataField: "name", caption: "Name" },
    { dataField: "serialNo", caption: "Serial No" },
    { dataField: "orderNo", caption: "Order No" },
    { dataField: "purchaseCost", caption: "Purchase Cost" },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "note", caption: "Note" },
  ];
  return { columns, devColumns };
};
