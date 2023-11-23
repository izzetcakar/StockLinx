import { IConsumable } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import { categoryActions } from "../../redux/category/actions";
import { consumableActions } from "../../redux/consumable/actions";
import { locationActions } from "../../redux/location/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { branchActions } from "../../redux/branch/actions";
import Gridtable from "../../components/gridTable/GridTable";
import { openConsumableModal } from "../../modals/modals";

const Consumable = () => {
  const dispatch = useDispatch();
  const consumables = useSelector(
    (state: RootState) => state.consumable.consumables
  );

  const refreshData = () => {
    dispatch(consumableActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(productStatusActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Consumables</div>
      </div>
      <Gridtable
        data={consumables}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(consumable) =>
          openConsumableModal(consumable as IConsumable)
        }
        onRowInsert={() => openConsumableModal()}
        onRowRemove={(id) => dispatch(consumableActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(consumableActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableExcelActions
        enableSelectActions
      />
    </>
  );
};

export default Consumable;
