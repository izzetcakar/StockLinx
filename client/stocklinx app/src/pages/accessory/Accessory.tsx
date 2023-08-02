import { useState } from "react";
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
import {
  CategoryNameComponent,
  CompanyNameComponent,
  LocationNameComponent,
  ManufacturerNameComponent,
  StatusNameComponent,
  SupplierNameComponent
} from "../../components/customComponents/TableComponents";

const Accessory = () => {
  const dispatch = useAppDispatch();
  const accessories = useAppSelector((state: RootState) => state.accessory.accessories);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const columns = [
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
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      renderComponent: ManufacturerNameComponent,
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
