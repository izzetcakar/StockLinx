import AssetForm from "../../../forms/product/asset/AssetForm";
import { IAsset } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openAssetModal = (asset?: IAsset) =>
  modals.open({
    modalId: "asset-modal",
    title: asset ? "Update Asset" : "Create Asset",
    children: <AssetForm asset={asset} />,
    xOffset: "auto",
    size: "auto",
  });
