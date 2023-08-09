import AssetForm from "../../../forms/product/asset/AssetForm";
import { IAsset } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openAssetModal = (
    asset?: IAsset,
) =>
    modals.open({
        modalId: "asset-modal",
        title: "Update",
        children: <AssetForm asset={asset} />,
        xOffset: "auto",
    });

