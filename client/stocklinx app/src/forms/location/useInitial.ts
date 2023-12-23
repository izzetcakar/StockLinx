import uuid4 from "uuid4";
import { ILocation } from "../../interfaces/interfaces";

export const useInitial = (location?: ILocation, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: ILocation = {
    id: "",
    name: "",
    country: null,
    state: null,
    city: null,
    address: null,
    address2: null,
    currency: null,
    zipCode: null,
    notes: null,
  };

  if (location) {
    initialValues = { ...location };
    isCreate = false;
  }
  if (!location || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
