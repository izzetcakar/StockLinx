import { useSelector } from "react-redux";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";
import { Column } from "devextreme/ui/data_grid";
import { IAsset, ProductStatus } from "../../interfaces/interfaces";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
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
  const models = useSelector((state: RootState) => state.model.models);

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
      dataField: "modelId",
      caption: "Model",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, models),
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
    { dataField: "tagNo", caption: "Tag No" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "notes", caption: "Notes" },
  ];
  //
  const devColumns: Column<IAsset>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    //ADD IMAGE
    {
      dataField: "tagNo",
      caption: "Tag No",
    },
    {
      dataField: "serialNo",
      caption: "Serial No",
    },
    {
      dataField: "modelId",
      caption: "Model",
      lookup: {
        dataSource: models,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
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
      dataField: "productStatus",
      caption: "Status",
      lookup: {
        dataSource: createDataFromEnum(ProductStatus),
        valueExpr: "id",
        displayExpr: "value",
      },
    },
    // ADD ASSIGNED USER
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
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
    // {
    //   dataField: "manufacturerId",
    //   caption: "Manufacturer",
    //   lookup: {
    //     dataSource: manufacturers,
    //     valueExpr: "id",
    //     displayExpr: "name",
    //   },
    // },
    // {
    //   dataField: "warrantyDate",
    //   caption: "Warranty Date",
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
    //   dataField: "orderNo",
    //   caption: "Order No",
    // },
    // {
    //   dataField: "purchaseDate",
    //   caption: "Purchase Date",
    // },
    // {
    //   dataField: "notes",
    //   caption: "Notes",
    // },
    // {
    //   dataField:"checkInCounter",
    //   caption:"Check In Counter"
    // },
    // {
    //   dataField:"checkOutCounter",
    //   caption:"Check Out Counter"
    // }
  ];
  const formItems: IFormItem[] = [
    { dataField: "name" },
    { dataField: "manufacturerId" },
    { dataField: "modelId" },
    { dataField: "tagNo" },
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
