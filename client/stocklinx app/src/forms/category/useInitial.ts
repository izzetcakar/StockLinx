import uuid4 from "uuid4";
import { CategoryType, ICategory } from "@interfaces/serverInterfaces";

export const useInitial = (category?: ICategory, create?: boolean) => {
  let isCreate = create || false;

  let initialValues: ICategory = {
    id: uuid4(),
    type: CategoryType.ASSET,
    name: "",
  };

  if (category) {
    initialValues = { ...category };
    isCreate = false;
  }
  if (!category || create) {
    initialValues.id = uuid4();
    isCreate = true;
  }
  return { initialValues, isCreate };
};
