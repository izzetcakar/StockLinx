import uuid4 from "uuid4";
import { IBranch } from "../../interfaces/interfaces";

export const useInitial = (branch?: IBranch, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: IBranch = {
    id: uuid4(),
    companyId: "",
    name: "",
    locationId: null,
  };

  if (branch) {
    initialValues = { ...branch };
    isCreate = false;
  }
  if (branch && create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
