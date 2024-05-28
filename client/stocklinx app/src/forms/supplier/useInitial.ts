import uuid4 from "uuid4";
import { ISupplier } from "../../interfaces/serverInterfaces";
import { getImage } from "../../utils/Image";

export const useInitial = (supplier?: ISupplier, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: ISupplier = {
    id: uuid4(),
    locationId: null,
    name: "",
    imagePath: null,
    contactName: null,
    contactPhone: null,
    contactEmail: null,
    website: null,
    fax: null,
    notes: null,
  };

  if (supplier) {
    initialValues = { ...supplier };
    initialValues.imagePath = getImage(supplier.imagePath);
    isCreate = false;
  }
  if (!supplier || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
