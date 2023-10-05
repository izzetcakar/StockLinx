import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";

const Manufacturer = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );

  const refreshData = () => {
    dispatch(manufacturerActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IManufacturer>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Consumable", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IManufacturer>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Consumable", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IManufacturer>) => {
    datagridRequest(e, `Consumable/${e.data.id}`, "delete");
  };

  return (
    <BaseDataGrid
      title="Manufacturer"
      data={manufacturers}
      columns={useColumns().devColumns}
      formItems={useColumns().formItems}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
      refreshData={refreshData}
    />
  );
};

export default Manufacturer;
