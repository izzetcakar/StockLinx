import uuid4 from "uuid4";
import { IAsset } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getImage } from "../../functions/Image";

export const useInitial = (asset?: IAsset, create?: boolean) => {
  const branch = useSelector((state: RootState) => state.branch.branch);
  let isCreate = create || false;

  let initialValues: IAsset = {
    id: uuid4(),
    branchId: branch?.id || "",
    name: "",
    imagePath: null,
    serialNo: null,
    orderNo: null,
    purchaseCost: null,
    purchaseDate: null,
    notes: null,
    modelId: null,
    tagNo: null,
    overageAssets: [],
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
