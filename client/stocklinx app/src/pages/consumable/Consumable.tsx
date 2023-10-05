import { IConsumable } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { consumableActions } from "../../redux/consumable/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import { datagridRequest } from "../../functions/datagridRequest";

const Consumable = () => {
  const dispatch = useDispatch();
  const consumables = useSelector(
    (state: RootState) => state.consumable.consumables
  );

  const refreshData = () => {
    dispatch(consumableActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
  };

  const onRowInserting = async (e: RowInsertingEvent<IConsumable>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Consumable", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IConsumable>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Consumable", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IConsumable>) => {
    datagridRequest(e, `Consumable/${e.data.id}`, "delete");
  };

  return (
    <BaseDataGrid
      title="Consumable"
      data={consumables}
      columns={useColumns().devColumns}
      formItems={useColumns().formItems}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
      refreshData={refreshData}
    />
  );
};

export default Consumable;
