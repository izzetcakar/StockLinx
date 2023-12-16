import uuid4 from "uuid4";
import { IProductStatus, ProductStatusType } from "../../interfaces/interfaces";

export const useInitial = (
  productStatus?: IProductStatus,
  create?: boolean
) => {
  let isCreate = create || false;

  let initialValues: IProductStatus = {
    id: uuid4(),
    type: ProductStatusType.AVAILABLE,
    name: "",
  };

  if (productStatus) {
    initialValues = { ...productStatus };
    isCreate = false;
  }
  if (productStatus && create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
