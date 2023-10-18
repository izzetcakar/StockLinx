import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "devextreme/ui/data_grid";
import { IConsumable } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import {
  alignedTemplate,
  checkInOutHeaderTemplate,
} from "../../components/dataGrid/location/customColumns";

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
      dataField: "modelNo",
      caption: "Model No",
    },
    {
      dataField: "itemNo",
      caption: "Item No",
    },
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
    { dataField: "name", caption: "Name" },
    {
      dataField: "categoryId",
      caption: "Category",
      lookup: {
        dataSource: categories,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    { dataField: "modelNo", caption: "Model No" },
    { dataField: "itemNo", caption: "Item No" },
    {
      dataField: "quantity",
      dataType: "number",
      caption: "Quantity",
      alignment: "center",
      cellTemplate: alignedTemplate,
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
    { dataField: "purchaseCost", caption: "Purchase Cost", alignment: "left" },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
    // { dataField: "id", visible: false },
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
    // { dataField: "serialNo", caption: "Serial No" },
    // { dataField: "note", caption: "Note" },
  ];
  const formItems: IFormItem[] = [
    { dataField: "quantity" },
    { dataField: "itemNo" },
    { dataField: "modelNo" },
    { dataField: "categoryId" },
    { dataField: "locationId" },
    { dataField: "companyId" },
    { dataField: "name" },
    { dataField: "productStatus" },
    { dataField: "serialNo" },
    { dataField: "orderNo" },
    { dataField: "purchaseCost" },
    { dataField: "purchaseDate" },
    { dataField: "notes" },
  ];

  return { columns, devColumns, formItems };
};
