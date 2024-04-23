import { ILocation } from "../../interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { locationActions } from "../../redux/location/actions";
import { openLocationModal } from "../../modals/modals";

const Location = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);

  const refreshData = () => {
    dispatch(locationActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Locations</div>
      </div>
      <Gridtable
        data={locations}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(location) => openLocationModal(location as ILocation)}
        onRowInsert={() => openLocationModal()}
        onRowRemove={(id) => dispatch(locationActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(locationActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Location;
