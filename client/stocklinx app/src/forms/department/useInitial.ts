import uuid4 from "uuid4";
import { IDepartment } from "@interfaces/serverInterfaces";
import GenericContext from "@/context/GenericContext";
import { useContext } from "react";

export const useInitial = (department?: IDepartment, create?: boolean) => {
  const { branch } = useContext(GenericContext);
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
