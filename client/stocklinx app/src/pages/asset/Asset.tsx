import { IAsset } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { companyActions } from "../../redux/company/actions";
import { categoryActions } from "../../redux/category/actions";
import { modelActions } from "../../redux/model/actions";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/Gridtable";
import { openAssetModal } from "../../modals/product/asset/modals";
import { assetActions } from "../../redux/asset/actions";
import { branchActions } from "../../redux/branch/actions";
import { productStatusActions } from "../../redux/productStatus/actions";

const Asset = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);

  const refreshData = () => {
    dispatch(assetActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Assets</div>
      </div>
      <Gridtable
        data={assets}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(category) => openAssetModal(category as IAsset)}
        onRowInsert={() => openAssetModal()}
        onRowRemove={(id) => dispatch(categoryActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(categoryActions.removeRange({ ids: ids }))
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

export default Asset;
