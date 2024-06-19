import { IAsset } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import { useContext } from "react";
import GenericContext from "@/context/GenericContext";
import uuid4 from "uuid4";

export const useInitial = (asset?: IAsset, create?: boolean) => {
  const { company } = useContext(GenericContext);
  let isCreate = create || false;

  let initialValues: IAsset = {
    id: uuid4(),
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
    isCreate = false;
  }
  if (!asset || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
