import uuid4 from "uuid4";
import { ILicense } from "@interfaces/serverInterfaces";
import { useContext } from "react";
import GenericContext from "@/context/GenericContext";

export const useInitial = (license?: ILicense, create?: boolean) => {
  const { branch } = useContext(GenericContext);
  let isCreate = create || false;

  let initialValues: ILicense = {
    id: uuid4(),
    branchId: branch?.id || "",
    categoryId: "",
    tag: "",
    name: "",
    orderNo: null,
    purchaseCost: null,
    purchaseDate: null,
    notes: null,
    manufacturerId: null,
    supplierId: null,
    licenseKey: "",
    licenseEmail: null,
    licensedTo: null,
    maintained: false,
    reassignable: false,
    expirationDate: null,
    terminationDate: null,
    quantity: 1,
  };

  if (license) {
    initialValues = { ...license };
    isCreate = false;
  }
  if (!license || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
