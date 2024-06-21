import { IAsset } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import { useContext } from "react";
import GenericContext from "@/context/GenericContext";

export const useInitial = (asset?: IAsset) => {
  const { company } = useContext(GenericContext);

  let initialValues: IAsset = {
    id: "",
    companyId: company?.id || "",
    productStatusId: "",
    supplierId: null,
    tag: "",
    name: "",
    imagePath: null,
    serialNo: null,
    orderNo: null,
    purchaseCost: null,
    purchaseDate: null,
    notes: null,
    modelId: null,
    overageAssets: [],
    quantity: 1,
  };

  if (asset) {
    initialValues = { ...asset };
    initialValues.imagePath = getImage(asset.imagePath);
  }

  return initialValues;
};
