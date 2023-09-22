import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";

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
  return columns;
};
