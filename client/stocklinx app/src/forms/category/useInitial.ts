import { CategoryType, ICategory } from "@interfaces/serverInterfaces";

export const useInitial = (category?: ICategory) => {
  let initialValues: ICategory = {
    id: "",
    type: CategoryType.ASSET,
    name: "",
  };

  if (category) {
    initialValues = { ...category };
  }
  return initialValues;
};
