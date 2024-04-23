import uuid4 from "uuid4";
import { IModel } from "../../interfaces/serverInterfaces";
import { getImage } from "../../functions/Image";

export const useInitial = (model?: IModel, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: IModel = {
    id: uuid4(),
    name: "",
    categoryId: "",
    fieldSetId: null,
    manufacturerId: null,
    modelNo: null,
    imagePath: null,
    modelFieldData: [],
    notes: null,
  };

  if (model) {
    initialValues = { ...model };
    initialValues.imagePath = getImage(model.imagePath);
    isCreate = false;
  }
  if (!model || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
