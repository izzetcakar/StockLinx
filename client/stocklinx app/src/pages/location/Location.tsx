import { ILocation } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { locationActions } from "../../redux/location/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import Gridtable from "../../components/gridTable/Gridtable";
import { openLocationModal } from "../../modals/location/modals";

const Location = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);

  const refreshData = () => {
    dispatch(locationActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<ILocation>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Location", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<ILocation>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Location", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<ILocation>) => {
    datagridRequest(e, `Location/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Locations</div>
      </div>
      <BaseDataGrid
        title="Location"
        data={locations}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
        toolbarAddButton={true}
      />
      <div style={{ padding: "1rem 0" }} />
      <Gridtable
        data={locations}
        columns={useColumns().columns}
        itemKey="id"
        refreshData={refreshData}
        onRowUpdate={(location) => openLocationModal(location as ILocation)}
        onRowInsert={() => openLocationModal()}
      />
    </>
  );
};

export default Location;
