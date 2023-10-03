import { useSelector } from "react-redux";
import { IMantinSelectProps } from "../../interfaces/interfaces";
import { RootState } from "../../../redux/rootReducer";
import { UseFormReturnType } from "@mantine/form";
import { IAccessory } from "../../../interfaces/interfaces";

export const useSelectData = (form: UseFormReturnType<IAccessory>) => {
  const manufacturerSelectData = useSelector(
    (state: RootState) => state.manufacturer.selectData
  );
  const supplierSelectData = useSelector(
    (state: RootState) => state.supplier.selectData
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

  const selectComponentData: IMantinSelectProps<IAccessory>[] = [
    {
      data: manufacturerSelectData,
      value: form.values.manufacturerId || "",
      label: "Manufacturer",
      propTag: "manufacturerId",
    },
    {
      data: supplierSelectData,
      value: form.values.supplierId || "",
      label: "Supplier",
      propTag: "supplierId",
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
      clearable: false,
    },
  ];
  return selectComponentData;
};
