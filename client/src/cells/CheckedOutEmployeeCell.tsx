import { useEmployeeProduct, useEmployee } from "@queryhooks";

const CheckedOutEmployeeCell = (assetId: string) => {
  const { data: employeeProducts } = useEmployeeProduct.GetAll();
  const { data: employees } = useEmployee.GetAll();
  const employeeProduct = employeeProducts?.find(
    (employeeProduct) => employeeProduct?.assetId === assetId
  );
  if (!employeeProduct) return "";
  const employee = employees?.find(
    (employee) => employee?.id === employeeProduct.employeeId
  );
  return employee ? employee.firstName + " " + employee.lastName : "";
};

export default CheckedOutEmployeeCell;
