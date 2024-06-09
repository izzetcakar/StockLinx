import { IAsset } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openAssetModal } from "../../modals/modals";
import { useContext } from "react";
import { useAsset } from "@/hooks/asset";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Asset = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useAsset.Filter();
  const { mutate: remove } = useAsset.Remove();
  const { mutate: removeRange } = useAsset.RemoveRange();
  const { data: assets, refetch: fetch } = useAsset.GetAll();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Assets</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={assets || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => fetch()}
        onRowUpdate={(asset) => openAssetModal(asset as IAsset)}
        onRowInsert={() => openAssetModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        excelColumns={useColumns().excelColumns}
        onApplyFilters={(filters) => filter(filters)}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Asset;
