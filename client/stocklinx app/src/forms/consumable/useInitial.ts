import uuid4 from "uuid4";
import { IConsumable } from "@interfaces/serverInterfaces";
import { useContext } from "react";
import GenericContext from "@/context/GenericContext";

export const useInitial = (consumable?: IConsumable, create?: boolean) => {
  const { branch } = useContext(GenericContext);
  let isCreate = create || false;

  let initialValues: IConsumable = {
    id: uuid4(),
    branchId: branch?.id || "",
    tag: "",
    name: "",
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
  if (!consumable || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
