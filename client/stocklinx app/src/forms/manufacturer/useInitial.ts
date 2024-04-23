import uuid4 from "uuid4";
import { IManufacturer } from "../../interfaces/serverInterfaces";
import { getImage } from "../../functions/Image";

export const useInitial = (manufacturer?: IManufacturer, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: IManufacturer = {
    id: uuid4(),
    name: "",
    url: null,
    imagePath: null,
    supportURL: null,
    supportEmail: null,
    supportPhone: null,
    notes: null,
  };

  if (manufacturer) {
    initialValues = { ...manufacturer };
    initialValues.imagePath = getImage(manufacturer.imagePath);
    isCreate = false;
  }
  if (!manufacturer || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
