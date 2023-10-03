import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { ILicense } from "../../interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";

export const useColumns = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
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
    { dataField: "licenseKey", caption: "License Key" },
    { dataField: "licenseEmail", caption: "License Email" },
    { dataField: "maintained", caption: "Maintained" },
    { dataField: "reassignable", caption: "Reassignable" },
    { dataField: "serialNo", caption: "Serial No" },
    { dataField: "orderNo", caption: "Order No" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
    },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "expirationData", caption: "Expiration Date" },
    { dataField: "terminationDate", caption: "Termination Date" },
    { dataField: "notes", caption: "Notes" },
  ];
  const devColumns: Column<ILicense>[] = [
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
      dataField: "licenseKey",
      caption: "License Key",
    },
    {
      dataField: "licenseEmail",
      caption: "License Email",
    },
    {
      dataField: "maintained",
      caption: "Maintained",
    },
    {
      dataField: "reassignable",
      caption: "Reassignable",
    },
    {
      dataField: "expirationDate",
      caption: "Expiration Date",
    },
    { dataField: "terminationDate", caption: "Termination Date" },
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
    {
      dataField: "serialNo",
      caption: "Serial No",
    },
    {
      dataField: "orderNo",
      caption: "Order No",
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
  ];

  return { columns, devColumns };
};
