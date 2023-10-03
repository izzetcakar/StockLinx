import { useSelector } from "react-redux";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IAccessory, ProductStatus } from "../../interfaces/interfaces";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
import { IFormItem } from "../../components/generic/BaseDataGrid";

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
      dataField: "productStatus",
      caption: "Status",
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
      dataField: "productStatus",
      caption: "Status",
      lookup: {
        dataSource: createDataFromEnum(ProductStatus),
        valueExpr: "id",
        displayExpr: "value",
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
  const formItems: IFormItem[] = [
    { dataField: "name" },
    { dataField: "manufacturerId" },
    { dataField: "supplierId" },
    { dataField: "quantity" },
    { dataField: "warrantyDate" },
    { dataField: "categoryId" },
    { dataField: "locationId" },
    { dataField: "companyId" },
    { dataField: "productStatus" },
    { dataField: "serialNo" },
    { dataField: "orderNo" },
    { dataField: "purchaseCost" },
    { dataField: "purchaseDate" },
    { dataField: "notes" },
  ];
  return { columns, devColumns, formItems };
};
