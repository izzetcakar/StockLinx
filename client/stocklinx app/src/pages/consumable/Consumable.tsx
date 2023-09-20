import GridTable from "../../components/gridTable/GridTable";
import { IConsumable } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { consumableActions } from "../../redux/consumable/actions";
import { openConsumableModal } from "../../modals/product/consumable/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { NameComponent } from "../../components/customComponents/TableComponents";

const Consumable = () => {
  const dispatch = useDispatch();
  const consumables = useSelector((state: RootState) => state.consumable.consumables);
  const categories = useSelector((state: RootState) => state.category.categories);
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
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
    {
      dataField: "modelNo",
      caption: "Model No",
      dataType: "string",
    },
    {
      dataField: "itemNo",
      caption: "Item No",
      dataType: "string",
    },
    { dataField: "tagNo", caption: "Tag No", dataType: "string" },
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
    { dataField: "notes", caption: "Notes", dataType: "string" },
  ];

  const onRowInsert = () => {
    openConsumableModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IConsumable;
    openConsumableModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IConsumable).id as string;
    genericConfirmModal(() => dispatch(consumableActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(consumableActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={consumables}
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

export default Consumable;
