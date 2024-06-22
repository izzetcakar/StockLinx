import { IAsset } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openAssetModal } from "@/utils/modalUtils";
import { useAsset } from "@/hooks/query/asset";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";
import { useNavigate } from "react-router-dom";

const Asset = () => {
  const navigate = useNavigate();
  const { data: assets } = useAsset.Filter([]);
  const { mutate: filter } = useAsset.ApplyFilters();
  const { mutate: remove } = useAsset.Remove();
  const { mutate: removeRange } = useAsset.RemoveRange();

  const navigateDetail = (assetDetails: IAsset[]) => {
    if (!assetDetails.length) return;
    navigate("/asset", { state: { assets: assetDetails } });
  };

  return (
    <>
      <PageHeader title="Assets" enableCompanyDrawer />
      <Gridtable
        data={assets || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(asset) => openAssetModal(asset as IAsset)}
        onRowInsert={() => openAssetModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        onApplyFilters={(filters) => filter(filters)}
        onRowDetail={(assets) => navigateDetail(assets as IAsset[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Asset;
