import { useState } from "react";
import { modals } from "@mantine/modals";
import LicenseForm from "../../components/form/product/license/LicenseForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ILicense } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { CategoryNameComponent, CompanyNameComponent, LocationNameComponent, StatusNameComponent, SupplierNameComponent } from "../../components/customComponents/TableComponents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { licenseActions } from "../../redux/license/actions";

const License = () => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const licenses = useSelector((state: RootState) => state.license.licenses);

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: CategoryNameComponent,
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      renderComponent: LocationNameComponent,
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: CompanyNameComponent,
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      dataType: "string",
      renderComponent: SupplierNameComponent,
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: StatusNameComponent,
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

  const handleFormVisible = () => {
    setFormVisible((prevFormVisible) => !prevFormVisible);
  };
  const onStartEdit = (row: object) => {
    dispatch(licenseActions.setLicense(row as ILicense));
  };
  const onRowInsert = () => {
    console.log("insert");
    dispatch(licenseActions.clearLicense());
    openLicenseModal();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openLicenseModal(row as ILicense);
  };
  const onRowDelete = (row: object) => {
    console.log("delete", row);
  };
  const handleUpdate = (data: object) => {
    console.log("updateSubmit", data);
  };

  const openLicenseModal = (license?: ILicense) =>
    modals.open({
      modalId: "license-modal",
      title: "Update",
      children: (
        <LicenseForm license={license} submitFunc={handleUpdate} />
      ),
    });

  return (
    <div>
      <GridTable
        data={licenses}
        columns={columns}
        hasColumnLines={false}
        cellCssClass="testClass"
        pageSizes={[1, 2, 5]}
        enableEdit={true}
        showPageSize={true}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowDelete}
        onStartEdit={onStartEdit}
      />
    </div>
  );
};

export default License;
