import "./accessory.scss";
import { modals } from '@mantine/modals';
import AccessoryForm from "../../components/form/product/accessory/AccessoryForm";
import GridTable from "../../components/gridTable/GridTable";
import { IAccessory } from "../../interfaces/interfaces";
import {
  CategoryNameComponent,
  CompanyNameComponent,
  LocationNameComponent,
  ManufacturerNameComponent,
  StatusNameComponent,
  SupplierNameComponent
} from "../../components/customComponents/TableComponents";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { accessoryActions } from "../../redux/accessory/actions";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";

const Accessory = () => {
  const dispatch = useDispatch();
  const accessory = useSelector((state: RootState) => state.accessory.accessory);
  const accessories = useSelector((state: RootState) => state.accessory.accessories);

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
  const onStartEdit = (row: object) => {
    // const id = (row as IAccessory).id;
    // dispatch(accessoryActions.get({ id: id as string }));
    openAccessoryModal(row as IAccessory);
  };
  const onRowInsert = () => {
    console.log("insert");
    dispatch(accessoryActions.clearAccessory());
    openAccessoryModal();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openAccessoryModal(row as IAccessory);
  };
  const onRowRemove = (row: object) => {
    const id = (row as IAccessory).id;
    dispatch(accessoryActions.remove({ id: id as string }));
    dispatch(accessoryActions.getAll());
  };
  const handleUpdate = (data: object) => {
    const id = (data as IAccessory).id;
    console.log(id);
    id ? dispatch(accessoryActions.update({ accessory: data as IAccessory })) : dispatch(accessoryActions.create({ accessory: data as IAccessory }));
    dispatch(accessoryActions.getAll());
  };

  const openAccessoryModal = (accessory?: IAccessory) => modals.open({
    modalId: 'accessory-modal',
    title: 'Update',
    children: (
      <AccessoryForm accessory={accessory} submitFunc={handleUpdate} />
    ),
    xOffset: "auto",
  });
  const refreshData = () => {
    dispatch(accessoryActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(supplierActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
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
