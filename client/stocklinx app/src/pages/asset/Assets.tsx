import { useNavigate } from "react-router-dom";
import { IAsset, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "@/utils/modalUtils";
import PageHeader from "@/components/generic/PageHeader";

const Asset = () => {
  const navigate = useNavigate();

  const navigateDetail = (assetDetails: IAsset[]) => {
    if (!assetDetails || assetDetails.length === 0) return;
    navigate("/asset", { state: { assets: assetDetails } });
  };

  const checkIn = (asset: IAsset) => {
    openAssetCheckInModal({
      employeeId: "",
      assetId: asset.id,
      assaignDate: new Date(),
      notes: asset.notes,
      productStatusId: asset.productStatusId,
    });
  };

  const checkOut = (asset: IAsset, employeeProduct: IEmployeeProduct) => {
    openAssetCheckOutModal({
      employeeProductId: employeeProduct.id,
      productStatusId: asset.productStatusId,
      notes: employeeProduct.notes,
    });
  };

  return (
    <>
      <PageHeader title="Assets" />
    </>
  );
};

export default Asset;
