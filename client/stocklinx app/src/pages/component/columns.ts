import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "devextreme/ui/data_grid";
import { IComponent } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { checkInOutHeaderTemplate } from "../../components/dataGrid/location/customColumns";

export const useColumns = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);

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
      dataField: "productStatus",
      caption: "Status",
    },
    {
      dataField: "name",
      caption: "Name",
    },
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
    { dataField: "notes", caption: "Notes" },
  ];
  const devColumns: Column<IComponent>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    { dataField: "serialNo", caption: "Serial No" },
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
      dataField: "quantity",
      caption: "Quantity",
    },
    // ADD AVAILABLE QUANTITY
    {
      dataField: "locationId",
      caption: "Location",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    { dataField: "orderNo", caption: "Order No" },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
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
    // { dataField: "notes", caption: "Notes" },
  ];
  const formItems: IFormItem[] = [
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
