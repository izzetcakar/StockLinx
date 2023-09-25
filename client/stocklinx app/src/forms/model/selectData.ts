import { UseFormReturnType } from "@mantine/form";
import { IModel } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { IMantinSelectProps } from "../interfaces/interfaces";

export const useSelectData = (form: UseFormReturnType<IModel>) => {
  const categorySelectData = useSelector(
    (state: RootState) => state.category.selectData
  );
  const manufacturerSelectData = useSelector(
    (state: RootState) => state.manufacturer.selectData
  );
  const selectComponentData: IMantinSelectProps<IModel>[] = [
    {
      data: categorySelectData,
      value: form.values.categoryId || "",
      label: "Category",
      propTag: "categoryId",
    },
    {
      data: manufacturerSelectData,
      value: form.values.manufacturerId || "",
      label: "Manufacturer",
      propTag: "manufacturerId",
    },
  ];
  return selectComponentData;
};
