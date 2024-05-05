import uuid4 from "uuid4";
import { IAccessory } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getImage } from "../../functions/Image";

export const useInitial = (accessory?: IAccessory, create?: boolean) => {
  const branch = useSelector((state: RootState) => state.branch.branch);
  let isCreate = create || false;

  let initialValues: IAccessory = {
    id: uuid4(),
    branchId: branch?.id || "",
    tag: "",
    name: "",
    manufacturerId: null,
    supplierId: null,
    categoryId: null,
    modelNo: "",
    quantity: 1,
    orderNo: null,
    purchaseCost: null,
    purchaseDate: null,
    notes: null,
    imagePath: null,
  };

  if (accessory) {
    initialValues = { ...accessory };
    initialValues.imagePath = getImage(accessory.imagePath);
    isCreate = false;
  }
  if (!accessory || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
