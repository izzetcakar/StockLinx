import React, { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import LicenseForm from "../../components/form/product/license/LicenseForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ILicense } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearLicense, setLicense } from "../../redux/licenseReducer";
import { RootState } from "../../redux/store";

const License = () => {
  const dispatch = useAppDispatch();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const licenses = useAppSelector(
    (state: RootState) => state.license.licenses
  );
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );

  const getCategoryById: React.FC<{ value: string }> = ({ value }) => {
    const category = categories.find((category) => category.id === value);
    return <div>{category?.name}</div>;
  };
  const columns = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: getCategoryById,
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      dataType: "string",
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
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
    dispatch(setLicense(row as ILicense));
  };
  const onRowInsert = () => {
    console.log("insert");
    clearLicense();
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
    <div
      className="datagrid-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
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
        onRowDelete={onRowDelete}
        onStartEdit={onStartEdit}
      />
      <CustomPopup
        visible={formVisible}
        title="Custom Form"
        showTitle={true}
        showCloseButton={true}
        dragEnabled={false}
        height={"fit-content"}
        width={300}
        hideOnOutsideClick={false}
        handleClose={handleFormVisible}
        renderContent={() => (
          <TestForm submitFunc={handleUpdate} columns={columns} />
        )}
      />
    </div>
  );
};

export default License;
