import GridTable from "../../components/gridTable/GridTable";
import { ILicense } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { licenseActions } from "../../redux/license/actions";
import { openLicenseModal } from "../../modals/product/license/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { NameComponent } from "../../components/customComponents/TableComponents";

const License = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state: RootState) => state.license.licenses);
  const categories = useSelector((state: RootState) => state.category.categories);
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, categories),
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, locations),
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, companies),
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, suppliers),
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, productStatuses),
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    { dataField: "licenseKey", caption: "License Key", dataType: "string" },
    { dataField: "licenseEmail", caption: "License Email", dataType: "string" },
    { dataField: "maintained", caption: "Maintained", dataType: "boolean" },
    { dataField: "reassignable", caption: "Reassignable", dataType: "boolean" },
    { dataField: "serialNo", caption: "Serial No", dataType: "string" },
    { dataField: "orderNo", caption: "Order No", dataType: "string" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
      dataType: "number",
    },
    { dataField: "purchaseDate", caption: "Purchase Date", dataType: "date" },
    { dataField: "expirationData", caption: "Expiration Date", dataType: "date" },
    { dataField: "terminationDate", caption: "Termination Date", dataType: "date" },
    { dataField: "notes", caption: "Notes", dataType: "string" },
  ];

  const onRowInsert = () => {
    openLicenseModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ILicense;
    openLicenseModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ILicense).id as string;
    genericConfirmModal(() => dispatch(licenseActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(licenseActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={licenses}
        columns={columns}
        hasColumnLines={false}
        pageSizes={[1, 2, 5]}
        enableEdit={true}
        showPageSize={true}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
    </div>
  );
};

export default License;
