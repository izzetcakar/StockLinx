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
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { useContext } from "react";
import GenericContext from "../../context/GenericContext";

const Consumable = () => {
  const dispatch = useDispatch();
  const consumables = useSelector(
    (state: RootState) => state.consumable.consumables
  );
  const { drawerBadge } = useContext(GenericContext);

  const refreshData = () => {
    dispatch(consumableActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(productStatusActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(manufacturerActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Consumables</div>
        {drawerBadge()}
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
        enableSelectActions
      />
    </>
  );
};

export default Consumable;
