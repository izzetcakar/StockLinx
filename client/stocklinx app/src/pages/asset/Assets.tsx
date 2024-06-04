import { IAsset } from "../../interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { useColumns } from "./columns";
import { assetActions } from "../../redux/asset/actions";
import { openAssetModal } from "../../modals/modals";
import { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { assetRequests } from "@/redux/asset/requests";
import Gridtable from "../../components/gridTable/GridTable";
import GenericContext from "../../context/GenericContext";
import { useAssets, useFilterAssets } from "@/queryhooks/asset";

const Asset = () => {
  const dispatch = useDispatch();
  const { drawerBadge } = useContext(GenericContext);
  const { data, refetch } = useAssets();
  const ref = useRef<any>(null);

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Assets</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refetch}
        onRowUpdate={(asset) => openAssetModal(asset as IAsset)}
        onRowInsert={() => openAssetModal()}
        onRowRemove={(id) => dispatch(assetActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(assetActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        onApplyFilters={() => console.log(ref.current || "ref is null")}
        ref={ref}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Asset;
