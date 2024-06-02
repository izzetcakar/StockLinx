import { useContext } from "react";
import { IAccessory } from "@interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { accessoryActions } from "../../redux/accessory/actions";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { locationActions } from "../../redux/location/actions";
import { branchActions } from "../../redux/branch/actions";
import Gridtable from "../../components/gridTable/GridTable";
import { openAccessoryModal } from "../../modals/modals";
import { userActions } from "../../redux/user/actions";
import { categoryActions } from "../../redux/category/actions";
import GenericContext from "../../context/GenericContext";
import { productStatusActions } from "../../redux/productStatus/actions";

const Accessory = () => {
  const dispatch = useDispatch();
  const accessories = useSelector(
    (state: RootState) => state.accessory.accessories
  );
  const { drawerBadge } = useContext(GenericContext);

  const refreshData = () => {
    dispatch(accessoryActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(supplierActions.getAll());
    dispatch(accessoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(userActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Accessories</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={accessories}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(accessory) => openAccessoryModal(accessory as IAccessory)}
        onRowInsert={() => openAccessoryModal()}
        onRowRemove={(id) => dispatch(accessoryActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(accessoryActions.removeRange({ ids: ids }))
        }
        onApplyFilters={(filters) => dispatch(accessoryActions.filter(filters))}
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Accessory;
