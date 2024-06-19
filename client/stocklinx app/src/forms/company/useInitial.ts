import uuid4 from "uuid4";
import { ICompany } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";

export const useInitial = (company?: ICompany, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: ICompany = {
    id: uuid4(),
    tag: "",
    name: "",
    email: null,
    locationId: null,
    imagePath: null,
  };

  if (company) {
    initialValues = { ...company };
    initialValues.imagePath = getImage(company.imagePath);
    isCreate = false;
  }
  if (!company || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
