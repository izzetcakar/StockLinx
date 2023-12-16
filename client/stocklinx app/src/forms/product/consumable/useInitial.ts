import uuid4 from "uuid4";
import { IConsumable } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";

export const useInitial = (consumable?: IConsumable, create?: boolean) => {
  const branch = useSelector((state: RootState) => state.branch.branch);
  let isCreate = create || false;

  let initialValues: IConsumable = {
    id: uuid4(),
    branchId: branch?.id || "",
    name: "",
    imagePath: null,
    categoryId: "",
    manufacturerId: null,
    supplierId: null,
    itemNo: null,
    modelNo: null,
    orderNo: null,
    purchaseCost: null,
    purchaseDate: null,
    quantity: 1,
    notes: null,
  };

  if (consumable) {
    initialValues = { ...consumable };
    isCreate = false;
  }
  if (consumable && create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
