import uuid4 from "uuid4";
import { IComponent } from "@interfaces/serverInterfaces";
import { useContext } from "react";
import GenericContext from "@/context/GenericContext";

export const useInitial = (component?: IComponent, create?: boolean) => {
  const { company } = useContext(GenericContext);
  let isCreate = create || false;

  let initialValues: IComponent = {
    id: uuid4(),
    companyId: company?.id || "",
    tag: "",
    name: "",
    serialNo: null,
    orderNo: null,
    purchaseCost: null,
    purchaseDate: null,
    quantity: 1,
    categoryId: "",
    supplierId: null,
    notes: null,
  };

  if (component) {
    initialValues = { ...component };
    isCreate = false;
  }
  if (!component || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
