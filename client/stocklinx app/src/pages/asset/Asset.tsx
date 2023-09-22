import GridTable from "../../components/gridTable/GridTable";
import { IAsset } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { assetActions } from "../../redux/asset/actions";
import { useDispatch } from "react-redux";
import { openAssetModal } from "../../modals/product/asset/modals";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { modelActions } from "../../redux/model/actions";
import { genericConfirmModal } from '../../modals/generic/GenericModals';
import { useColumns } from "./Columns";

const Asset = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);

  const onRowInsert = () => {
    openAssetModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IAsset;
    openAssetModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IAsset).id;
    genericConfirmModal(() => dispatch(assetActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(assetActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={assets}
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

export default Asset;
