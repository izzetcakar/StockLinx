import { IAsset } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openAssetModal } from "@/utils/modalUtils";
import { useAsset } from "@/hooks/query/asset";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";
import { useNavigate } from "react-router-dom";
import { openSubmissionModal } from "@/utils/submissionUtils";

const Asset = () => {
  const navigate = useNavigate();
  const { data: assets } = useAsset.Filter();
  const { mutate: filter } = useAsset.ApplyFilters();
  const { mutate: remove } = useAsset.Remove();
  const { mutate: removeRange } = useAsset.RemoveRange();

  const navigateDetail = (assetDetails: IAsset[]) => {
    if (!assetDetails.length) return;
    navigate("/asset", { state: { assets: assetDetails } });
  };

  return (
    <>
      <button
        onClick={() =>
          openSubmissionModal({
            userFullName: "İzzet Çakar",
            companyName: "Bilge Adam",
            department: "Yazılım",
            userStartDate: "2021-05-05",
            userTitle: "Yazılım Uzmanı",
            products: [
              {
                category: "Bilgisayar",
                title: "Lenovo",
                description:
                  "Lenovo ThinkpadÇakarrrrrrrrrrrrrrrrrrrrrrrrÇakarrrrrrrrrrrrrrrrrrrrrrrr",
              },
              {
                category: "Bilgisayar",
                title: "Lenovo",
                description: "Lenovo Thinkpad",
              },
            ],
            assignDate: "2023-12-23T18:24:45.061183Z",
            delivererFullName:
              "Teslimat İzzet ÇakarrrrrrrrrrrrrrrrrrrrrrrrÇakarrrrrrrrrrrrrrrrrrrrrrrr",
          })
        }
      >
        show
      </button>
      <PageHeader title="Assets" />
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
