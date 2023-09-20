import GridTable from "../../components/gridTable/GridTable";
import { IAccessory } from "../../interfaces/interfaces";
import {
  NameComponent,
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
import { openAccessoryModal } from "../../modals/product/accessory/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import "./accessory.scss";

const Accessory = () => {
  const dispatch = useDispatch();
  const accessories = useSelector((state: RootState) => state.accessory.accessories);
  const companies = useSelector((state: RootState) => state.company.companies);
  const categories = useSelector((state: RootState) => state.category.categories);
  const locations = useSelector((state: RootState) => state.location.locations);
  const manufacturers = useSelector((state: RootState) => state.manufacturer.manufacturers);
  const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

  const columns = [
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
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, manufacturers),
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
  const onRowInsert = () => {
    openAccessoryModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IAccessory;
    openAccessoryModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IAccessory).id;
    genericConfirmModal(() => dispatch(accessoryActions.remove({ id: id })));
  };

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
    <div>
      <GridTable
        data={accessories}
        columns={columns}
        hasColumnLines={false}
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

export default Accessory;
