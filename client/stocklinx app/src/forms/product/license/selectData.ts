import { UseFormReturnType } from "@mantine/form";
import { ILicense } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { IMantinSelectProps } from "../../interfaces/interfaces";

export const useSelectData = (form: UseFormReturnType<ILicense>) => {
  const categorySelectData = useSelector(
    (state: RootState) => state.category.selectData
  );
  const companySelectData = useSelector(
    (state: RootState) => state.company.selectData
  );
  const supplierSelectData = useSelector(
    (state: RootState) => state.supplier.selectData
  );
  const locationSelectData = useSelector(
    (state: RootState) => state.location.selectData
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
      data: companySelectData,
      value: form.values.companyId || "",
      label: "Company",
      propTag: "companyId",
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
    {
      data: supplierSelectData,
      value: form.values.supplierId || "",
      label: "Supplier",
      propTag: "supplierId",
    },
  ];
  return selectComponentData;
};
