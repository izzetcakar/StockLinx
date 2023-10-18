import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { ILicense } from "../../interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { checkInOutHeaderTemplate } from "../../components/dataGrid/location/customColumns";

export const useColumns = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
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
      dataField: "productStatus",
      caption: "Status",
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
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "licenseKey",
      caption: "License Key",
    },
    {
      dataField: "expirationDate",
      caption: "Expiration Date",
    },
    {
      dataField: "licenseEmail",
      caption: "License Email",
    },
    // ADD LICENSED NAME
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
      dataField: "quantity",
      caption: "Quantity",
    },
    // ADD AVAILABLE QUANTITY
    // {
    //   dataField: "maintained",
    //   caption: "Maintained",
    // },
    // {
    //   dataField: "reassignable",
    //   caption: "Reassignable",
    // },
    // { dataField: "terminationDate", caption: "Termination Date" },
    // {
    //   dataField: "categoryId",
    //   caption: "Category",
    //   lookup: {
    //     dataSource: categories,
    //     valueExpr: "id",
    //     displayExpr: "name",
    //   },
    // },
    // {
    //   dataField: "locationId",
    //   caption: "Location",
    //   lookup: {
    //     dataSource: locations,
    //     valueExpr: "id",
    //     displayExpr: "name",
    //   },
    // },
    // {
    //   dataField: "companyId",
    //   caption: "Company",
    //   lookup: {
    //     dataSource: companies,
    //     valueExpr: "id",
    //     displayExpr: "name",
    //   },
    // },
    // {
    //   dataField: "productStatus",
    //   caption: "Status",
    //   lookup: {
    //     dataSource: createDataFromEnum(ProductStatus),
    //     valueExpr: "id",
    //     displayExpr: "value",
    //   },
    // },

    // {
    //   dataField: "serialNo",
    //   caption: "Serial No",
    // },
    // {
    //   dataField: "orderNo",
    //   caption: "Order No",
    // },
    // {
    //   dataField: "purchaseCost",
    //   caption: "Purchase Cost",
    // },

    // {
    //   dataField: "purchaseDate",
    //   caption: "Purchase Date",
    // },
    // {
    //   dataField: "notes",
    //   caption: "Notes",
    // },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "manufacturerId" },
    { dataField: "licenseKey" },
    { dataField: "licenseEmail" },
    { dataField: "maintained" },
    { dataField: "reassignable" },
    { dataField: "expirationDate" },
    { dataField: "terminationDate" },
    { dataField: "categoryId" },
    { dataField: "locationId" },
    { dataField: "companyId" },
    { dataField: "productStatus" },
    { dataField: "name" },
    { dataField: "serialNo" },
    { dataField: "orderNo" },
    { dataField: "purchaseCost" },
    { dataField: "quantity" },
    { dataField: "purchaseDate" },
    { dataField: "notes" },
  ];

  return { columns, devColumns, formItems };
};
