import GridTable from "../../components/gridTable/GridTable";
import { IConsumable } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { consumableActions } from "../../redux/consumable/actions";
import { openConsumableModal } from "../../modals/product/consumable/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import { RowRemovingEvent, RowUpdatingEvent } from "devextreme/ui/data_grid";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Consumable = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const dispatch = useDispatch();
  const consumables = useSelector(
    (state: RootState) => state.consumable.consumables
  );

  const onRowInsert = () => {
    refreshData();
    openConsumableModal();
  };
  const onRowUpdate = (row: object) => {
    refreshData();
    const data = row as IConsumable;
    openConsumableModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IConsumable).id as string;
    genericConfirmModal(() => dispatch(consumableActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(consumableActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
  };

  const onRowUpdating = (e: RowUpdatingEvent<IConsumable>) => {
    console.log(e);
    e.cancel = true;
  };
  const onRowRemoving = (e: RowRemovingEvent<IConsumable>) => {
    console.log(e);
    e.cancel = true;
  };
  const companyOptions = {
    items: companies,
    valueExpr: "id",
    displayExpr: "name",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey={"id"}
        data={consumables}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <BaseDataGrid
        title="Consumable"
        data={consumables}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Consumable;
