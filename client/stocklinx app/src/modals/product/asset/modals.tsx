import { IAsset } from "../../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import AssetForm from "../../../components/form/product/asset/AssetForm";

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

