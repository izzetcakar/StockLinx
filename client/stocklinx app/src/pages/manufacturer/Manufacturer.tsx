import GridTable from "../../components/gridTable/GridTable";
import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { openManufacturerModal } from "../../modals/manufacturer/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={manufacturers}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <BaseDataGrid
        title="Manufacturer"
        data={manufacturers}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Manufacturer;
