import { UseFormReturnType } from "@mantine/form";
import { IDepartment } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { IMantinSelectProps } from "../interfaces/interfaces";

export const useSelectData = (form: UseFormReturnType<IDepartment>) => {
  const companySelectData = useSelector(
    (state: RootState) => state.company.selectData
  );
  const locationSelectData = useSelector(
    (state: RootState) => state.location.selectData
  );
  const selectComponentData: IMantinSelectProps[] = [
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
  ];
  return selectComponentData;
};
