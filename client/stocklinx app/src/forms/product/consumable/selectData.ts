import { UseFormReturnType } from "@mantine/form";
import { IConsumable } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { IMantinSelectProps } from "../../interfaces/interfaces";

export const useSelectData = (form: UseFormReturnType<IConsumable>) => {
  const categorySelectData = useSelector(
    (state: RootState) => state.category.selectData
  );
  const locationSelectData = useSelector(
    (state: RootState) => state.location.selectData
  );
  const companySelectData = useSelector(
    (state: RootState) => state.company.selectData
  );
  const productStatusSelectData = useSelector(
    (state: RootState) => state.productStatus.selectData
  );
  const selectComponentData: IMantinSelectProps<IConsumable>[] = [
    {
      data: categorySelectData,
      value: form.values.categoryId || "",
      label: "Category",
      propTag: "categoryId",
    },
    {
      data: companySelectData,
      value: form.values.companyId || "",
      label: "Company",
      propTag: "companyId",
      clearable: false,
    },
    {
      data: locationSelectData,
      value: form.values.locationId || "",
      label: "Location",
      propTag: "locationId",
    },
    {
      data: productStatusSelectData,
      value: form.values.statusId || "",
      label: "Status",
      propTag: "statusId",
    },
  ];
  return selectComponentData;
};
