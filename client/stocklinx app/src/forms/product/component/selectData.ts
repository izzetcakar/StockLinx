import { UseFormReturnType } from "@mantine/form";
import { IComponent } from "../../../interfaces/interfaces";
import { IMantinSelectProps } from "../../interfaces/interfaces";
import { RootState } from "../../../redux/rootReducer";
import { useSelector } from "react-redux";

export const useSelectData = (form: UseFormReturnType<IComponent>) => {
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

  const selectComponentData: IMantinSelectProps[] = [
    {
      data: categorySelectData,
      value: form.values.categoryId || "",
      label: "Category",
      propTag: "categoryId",
    },
    {
      data: locationSelectData,
      value: form.values.locationId || "",
      label: "Location",
      propTag: "locationId",
    },
    {
      data: companySelectData,
      value: form.values.companyId || "",
      label: "Company",
      propTag: "companyId",
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