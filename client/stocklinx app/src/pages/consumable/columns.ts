import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "devextreme/ui/data_grid";
import { IConsumable, ProductStatus } from "../../interfaces/interfaces";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
import { IFormItem } from "../../components/generic/BaseDataGrid";

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
    { dataField: "name", caption: "Name" },
    {
      dataField: "productStatus",
      caption: "Status",
      lookup: {
        dataSource: createDataFromEnum(ProductStatus),
        valueExpr: "id",
        displayExpr: "value",
      },
    },
    { dataField: "serialNo", caption: "Serial No" },
    { dataField: "orderNo", caption: "Order No" },
    { dataField: "purchaseCost", caption: "Purchase Cost" },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "note", caption: "Note" },
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
