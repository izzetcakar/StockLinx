import GridTable from "../../components/gridTable/GridTable";
import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { openManufacturerModal } from "../../modals/manufacturer/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { useColumns } from "./columns";

const Manufacturer = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );

  const onRowInsert = () => {
    openManufacturerModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IManufacturer;
    openManufacturerModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IManufacturer).id as string;
    genericConfirmModal(() => dispatch(manufacturerActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(manufacturerActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={manufacturers}
        columns={useColumns()}
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

export default Manufacturer;
