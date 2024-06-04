import { IAsset } from "../../interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { useColumns } from "./columns";
import { assetActions } from "../../redux/asset/actions";
import { openAssetModal } from "../../modals/modals";
import { useContext, useRef } from "react";
import { useFilterAssets } from "@/queryhooks/asset";
import Gridtable from "../../components/gridTable/GridTable";
import GenericContext from "../../context/GenericContext";

const Asset = () => {
  const dispatch = useDispatch();
  const { drawerBadge } = useContext(GenericContext);
  const ref = useRef<any>(null);
  const { data, mutate: filterAssets } = useFilterAssets();

  const applyFilters = () => {
    filterAssets(ref.current?.queryFilters);
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Assets</div>
        {drawerBadge()}
      </div>
      <button onClick={() => console.log(ref.current)}>show</button>
      <Gridtable
        ref={ref}
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => applyFilters()}
        onRowUpdate={(asset) => openAssetModal(asset as IAsset)}
        onRowInsert={() => openAssetModal()}
        onRowRemove={(id) => dispatch(assetActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(assetActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        onApplyFilters={() => applyFilters()}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Asset;
