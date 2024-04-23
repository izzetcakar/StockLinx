import { IAsset } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { companyActions } from "../../redux/company/actions";
import { categoryActions } from "../../redux/category/actions";
import { modelActions } from "../../redux/model/actions";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { assetActions } from "../../redux/asset/actions";
import { branchActions } from "../../redux/branch/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { openAssetModal } from "../../modals/modals";
import { supplierActions } from "../../redux/supplier/actions";
import { deployedProductActions } from "../../redux/deployedProduct/actions";
import { userActions } from "../../redux/user/actions";
import { useContext } from "react";
import GenericContext from "../../context/GenericContext";

const Asset = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);
  const { drawerBadge } = useContext(GenericContext);

  const refreshData = () => {
    dispatch(assetActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(productStatusActions.getAll());
    dispatch(supplierActions.getAll());
    dispatch(deployedProductActions.getAll());
    dispatch(userActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Assets</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={assets}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(asset) => openAssetModal(asset as IAsset)}
        onRowInsert={() => openAssetModal()}
        onRowRemove={(id) => dispatch(assetActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(assetActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Asset;
