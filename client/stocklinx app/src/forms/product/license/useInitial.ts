import uuid4 from "uuid4";
import { ILicense } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";

export const useInitial = (license?: ILicense, create?: boolean) => {
  const branch = useSelector((state: RootState) => state.branch.branch);
  let isCreate = create || false;

  let initialValues: ILicense = {
    id: uuid4(),
    branchId: branch?.id || "",
    categoryId: "",
    name: "",
    imagePath: null,
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
  if (license && create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
