import { useSelector } from "react-redux";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";
import { Column } from "../../components/gridTable/interfaces/interfaces";

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

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      renderComponent: (value: string) => NameComponent(value, categories),
    },
    {
      dataField: "locationId",
      caption: "Location",
      renderComponent: (value: string) => NameComponent(value, locations),
    },
    {
      dataField: "companyId",
      caption: "Company",
      renderComponent: (value: string) => NameComponent(value, companies),
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      renderComponent: (value: string) => NameComponent(value, manufacturers),
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      renderComponent: (value: string) => NameComponent(value, suppliers),
    },
    {
      dataField: "statusId",
      caption: "Status",
      renderComponent: (value: string) => NameComponent(value, productStatuses),
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
  return columns;
};
