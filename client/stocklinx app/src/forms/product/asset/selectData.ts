import { useSelector } from "react-redux";
import { IMantinSelectProps } from "../../interfaces/interfaces";
import { RootState } from "../../../redux/rootReducer";
import { IAsset } from "../../../interfaces/interfaces";
import { UseFormReturnType } from "@mantine/form";

export const useSelectData = (form: UseFormReturnType<IAsset>) => {
  const manufacturerSelectData = useSelector(
    (state: RootState) => state.manufacturer.selectData
  );
  const modelSelectData = useSelector(
    (state: RootState) => state.model.selectData
  );
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
      data: manufacturerSelectData,
      value: form.values.manufacturerId || "",
      label: "Manufacturer",
      propTag: "manufacturerId",
    },
    {
      data: modelSelectData,
      value: form.values.modelId || "",
      label: "Model",
      propTag: "modelId",
    },
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
