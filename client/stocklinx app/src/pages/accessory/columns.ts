import { useSelector } from "react-redux";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IAccessory } from "../../interfaces/interfaces";

export const useColumns = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
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
      dataField: "manufacturerId",
      caption: "Manufacturer",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, manufacturers),
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, suppliers),
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
    { dataField: "quantity", caption: "Quantity" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "warrantyDate", caption: "Warranty Date" },
    { dataField: "notes", caption: "Notes" },
  ];
  const devColumns: Column<IAccessory>[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      lookup: {
        dataSource: categories,
        valueExpr: "id",
        displayExpr: "name",
      },
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
      dataField: "companyId",
      caption: "Company",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      lookup: {
        dataSource: manufacturers,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      lookup: {
        dataSource: suppliers,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "statusId",
      caption: "Status",
      lookup: {
        dataSource: productStatuses,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "name",
      caption: "Name",
    },
    { dataField: "serialNo", caption: "Serial No" },
    { dataField: "orderNo", caption: "Order No" },
    { dataField: "quantity", caption: "Quantity" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "warrantyDate", caption: "Warranty Date" },
    { dataField: "notes", caption: "Notes" },
    // { dataField: "checkInCounter", caption: "Check In" },
    // { dataField: "checkOutCounter", caption: "Check Out" },
  ];
  return { columns, devColumns };
};
