import uuid4 from "uuid4";
import { useSelector } from "react-redux";
import { IDepartment } from "../../interfaces/interfaces";
import { RootState } from "../../redux/rootReducer";

export const useInitial = (department?: IDepartment, create?: boolean) => {
  const branch = useSelector((state: RootState) => state.branch.branch);
  let isCreate = create || false;

  let initialValues: IDepartment = {
    id: uuid4(),
    branchId: branch?.id || "",
    locationId: null,
    managerId: null,
    name: "",
    notes: null,
  };

  if (department) {
    initialValues = { ...department };
    isCreate = false;
  }
  if (!department || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
