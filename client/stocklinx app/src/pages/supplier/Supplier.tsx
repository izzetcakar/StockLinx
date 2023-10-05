import { ISupplier } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { supplierActions } from "../../redux/supplier/actions";
import { locationActions } from "../../redux/location/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";

const Supplier = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(locationActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<ISupplier>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Consumable", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<ISupplier>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Consumable", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<ISupplier>) => {
    datagridRequest(e, `Consumable/${e.data.id}`, "delete");
  };

  return (
    <BaseDataGrid
      title="Supplier"
      data={suppliers}
      columns={useColumns().devColumns}
      formItems={useColumns().formItems}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
      refreshData={refreshData}
    />
  );
};

export default Supplier;
