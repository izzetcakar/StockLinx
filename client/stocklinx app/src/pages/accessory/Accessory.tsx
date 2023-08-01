import React, { useState } from "react";
import "./accessory.scss";
import { modals } from '@mantine/modals';
import TestForm from "../../components/form/TestForm";
import AccessoryForm from "../../components/form/product/accessory/AccessoryForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IAccessory } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearAccessory, setAccessory } from "../../redux/accessoryReducer";
import { RootState } from "../../redux/store";

const Accessory = () => {
  const dispatch = useAppDispatch();
  const accessories = useAppSelector((state: RootState) => state.accessory.accessories);
  const categories = useAppSelector((state: RootState) => state.category.categories);
  // const locations = useAppSelector((state: RootState) => state.location.locations);
  // const companies = useAppSelector((state: RootState) => state.company.companies);
  // const productStatuses = useAppSelector((state: RootState) => state.productStatus.productStatuses);
  // const manufacturers = useAppSelector((state: RootState) => state.manufacturer.manufacturers);
  // const models = useAppSelector((state: RootState) => state.model.models);

  const [formVisible, setFormVisible] = useState<boolean>(false);

  const getCategoryById: React.FC<{ value: string }> = ({ value }) => {
    const category = categories.find((category) => category.id === value);
    return (
      <div>
        {category?.name}
      </div>
    );
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
      dataField: "manufacturerId",
      caption: "Manufacturer",
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
    { dataField: "serialNo", caption: "Serial No", dataType: "string" },
    { dataField: "orderNo", caption: "Order No", dataType: "string" },
    { dataField: "quantity", caption: "Quantity", dataType: "number" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    { dataField: "purchaseDate", caption: "Purchase Date", dataType: "date" },
    { dataField: "warrantyDate", caption: "Warranty Date", dataType: "date" },
    { dataField: "notes", caption: "Notes", dataType: "string" },
  ];
  const handleFormVisible = () => {
    setFormVisible((prevFormVisible) => !prevFormVisible);
  };
  const onStartEdit = (row: object) => {
    dispatch(setAccessory(row as IAccessory));
  };
  const onRowInsert = () => {
    console.log("insert");
    clearAccessory();
    openAccessoryModal();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openAccessoryModal(row as IAccessory);
  };
  const onRowDelete = (row: object) => {
    console.log("delete", row);
  };
  const handleUpdate = (data: object) => {
    console.log("updateSubmit", data);
  };

  const openAccessoryModal = (accessory?: IAccessory) => modals.open({
    modalId: 'accessory-modal',
    title: 'Update',
    children: (
      <AccessoryForm accessory={accessory} submitFunc={handleUpdate} />
    ),
  });

  return (
    <div
      className="datagrid-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <GridTable
        data={accessories}
        columns={columns}
        hasColumnLines={false}
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
        renderContent={() => <TestForm submitFunc={handleUpdate} columns={columns} />}
      />
    </div>
  );
};

export default Accessory;
