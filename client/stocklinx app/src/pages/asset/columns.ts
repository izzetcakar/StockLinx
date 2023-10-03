import { useSelector } from "react-redux";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";
import { Column } from "devextreme/ui/data_grid";
import { IAsset } from "../../interfaces/interfaces";

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
      dataField: "modelId",
      caption: "Model",
      renderComponent: (value: string | number | boolean | null | undefined) =>
        NameComponent(value, models),
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
    { dataField: "tagNo", caption: "Tag No" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "notes", caption: "Notes" },
  ];
  const devColumns: Column<IAsset>[] = [
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
      dataField: "modelId",
      caption: "Model",
      lookup: {
        dataSource: models,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "tagNo",
      caption: "Tag No",
    },
    {
      dataField: "warrantyDate",
      caption: "Warranty Date",
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
      dataField: "tagNo",
      caption: "Tag No",
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
    // {
    //   dataField:"checkInCounter",
    //   caption:"Check In Counter"
    // },
    // {
    //   dataField:"checkOutCounter",
    //   caption:"Check Out Counter"
    // }
  ];
  return { columns, devColumns };
};
