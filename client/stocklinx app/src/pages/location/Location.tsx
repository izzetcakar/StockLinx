import GridTable from "../../components/gridTable/GridTable";
import { ILocation } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { locationActions } from "../../redux/location/actions";
import { openLocationModal } from "../../modals/location/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Location = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);

  const onRowInsert = () => {
    openLocationModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ILocation;
    openLocationModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ILocation).id as string;
    genericConfirmModal(() => dispatch(locationActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(locationActions.getAll());
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={locations}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <BaseDataGrid
        title="Location"
        data={locations}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Location;
