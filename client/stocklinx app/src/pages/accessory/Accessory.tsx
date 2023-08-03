import "./accessory.scss";
import { modals } from '@mantine/modals';
import AccessoryForm from "../../components/form/product/accessory/AccessoryForm";
import GridTable from "../../components/gridTable/GridTable";
import { IAccessory } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearAccessory, createAccessory, getAccessoryById, getAllAccessories, removeAccessory, setAccessory, updateAccessory } from "../../redux/accessoryReducer";
import { RootState } from "../../redux/store";
import {
  CategoryNameComponent,
  CompanyNameComponent,
  LocationNameComponent,
  ManufacturerNameComponent,
  StatusNameComponent,
  SupplierNameComponent
} from "../../components/customComponents/TableComponents";
import { getAllManufacturers } from "../../redux/manufacturerReducer";
import { getAllSuppliers } from "../../redux/supplierReducer";
import { getAllCategories } from "../../redux/categoryReducer";
import { getAllLocations } from "../../redux/locationReducer";
import { getAllCompanies } from "../../redux/companyReducer";
import { getAllProductStatuses } from "../../redux/productStatusReducer";

const Accessory = () => {
  const dispatch = useAppDispatch();
  const accessory = useAppSelector((state: RootState) => state.accessory.accessory);
  const accessories = useAppSelector((state: RootState) => state.accessory.accessories);

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
  const onStartEdit = async (row: object) => {
    const id = (row as IAccessory).id;
    await dispatch(getAccessoryById(id as string));
    openAccessoryModal(accessory as IAccessory);
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
  const onRowRemove = async (row: object) => {
    const id = (row as IAccessory).id;
    await dispatch(removeAccessory(id as string));
    await dispatch(getAllAccessories());
  };
  const handleUpdate = async (data: object) => {
    const id = (data as IAccessory).id;
    console.log(id);
    id ? await dispatch(updateAccessory(data as IAccessory)) : await dispatch(createAccessory(data as IAccessory));
    await dispatch(getAllAccessories());
  };

  const openAccessoryModal = (accessory?: IAccessory) => modals.open({
    modalId: 'accessory-modal',
    title: 'Update',
    children: (
      <AccessoryForm accessory={accessory} submitFunc={handleUpdate} />
    ),
    xOffset: "auto",
  });
  const refreshData = async () => {
    await dispatch(getAllAccessories());
    await dispatch(getAllManufacturers());
    await dispatch(getAllSuppliers());
    await dispatch(getAllCategories());
    await dispatch(getAllLocations());
    await dispatch(getAllCompanies());
    await dispatch(getAllProductStatuses());
  };

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
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        onStartEdit={onStartEdit}
      />
      {/* <CustomPopup
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
      /> */}
    </div>
  );
};

export default Accessory;
