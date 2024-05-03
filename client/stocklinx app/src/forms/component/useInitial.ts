import uuid4 from "uuid4";
import { IComponent } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

export const useInitial = (component?: IComponent, create?: boolean) => {
  const branch = useSelector((state: RootState) => state.branch.branch);
  let isCreate = create || false;

  let initialValues: IComponent = {
    id: uuid4(),
    branchId: branch?.id || "",
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
