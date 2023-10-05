import { IComponent } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { componentActions } from "../../redux/component/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";

const Component = () => {
  const dispatch = useDispatch();
  const components = useSelector(
    (state: RootState) => state.component.components
  );

  const refreshData = () => {
    dispatch(componentActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IComponent>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Consumable", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IComponent>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Consumable", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IComponent>) => {
    datagridRequest(e, `Consumable/${e.data.id}`, "delete");
  };

  return (
    <BaseDataGrid
      title="Component"
      data={components}
      columns={useColumns().devColumns}
      formItems={useColumns().formItems}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
      refreshData={refreshData}
    />
  );
};

export default Component;
