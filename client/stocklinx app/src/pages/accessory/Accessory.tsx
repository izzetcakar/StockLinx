import GridTable from "../../components/gridTable/GridTable";
import { IAccessory } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { accessoryActions } from "../../redux/accessory/actions";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { openAccessoryModal } from "../../modals/product/accessory/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { useColumns } from "./columns";
import "./accessory.scss";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Accessory = () => {
  const dispatch = useDispatch();
  const accessories = useSelector(
    (state: RootState) => state.accessory.accessories
  );

  const onRowInsert = () => {
    openAccessoryModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IAccessory;
    openAccessoryModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IAccessory).id;
    genericConfirmModal(() => dispatch(accessoryActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(accessoryActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(supplierActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={accessories}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <BaseDataGrid
        title="Accessory"
        data={accessories}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Accessory;
