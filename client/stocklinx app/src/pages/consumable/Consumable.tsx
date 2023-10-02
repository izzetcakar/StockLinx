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
import { productStatusActions } from "../../redux/productStatus/actions";
import { useColumns } from "./columns";

const Consumable = () => {
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
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        itemKey={"id"}
        data={consumables}
        columns={useColumns()}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
    </div>
  );
};

export default Consumable;
