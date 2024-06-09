import uuid4 from "uuid4";
import { IAccessory } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/Image";
import { useContext } from "react";
import GenericContext from "@/context/GenericContext";

export const useInitial = (accessory?: IAccessory, create?: boolean) => {
  const { branch } = useContext(GenericContext);
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
