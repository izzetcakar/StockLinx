import React from "react";
import { useEmployee, useEmployeeProduct } from "@queryhooks";
import { IAsset } from "@/interfaces/serverInterfaces";
import { Button } from "@mantine/core";
import { useIsMutating } from "react-query";

interface EmployeeCheckInOutCellProps {
  asset: IAsset;
  checkIn: any;
  checkOut: any;
}

const EmployeeCheckInOutCell: React.FC<EmployeeCheckInOutCellProps> = ({
  asset,
  checkIn,
  checkOut,
}) => {
  const { data: employeeProducts } = useEmployeeProduct.GetAll();
  const { data: employeeLK } = useEmployee.Lookup();
  const employeeProduct = employeeProducts?.find(
    (employeeProduct) => employeeProduct?.assetId === asset.id
  );
  const employee = employeeLK?.find(
    (employee) => employee.value === employeeProduct?.employeeId
  );
 const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        color={employee ? "red" : "green"}
        variant="filled"
        size="xs"
        onClick={() => {
          employeeProduct ? checkOut(asset, employeeProduct) : checkIn(asset);
        }}
        loading={isMutating}
      >
        {employeeProduct ? "Check Out" : "Check In"}
      </Button>
    </div>
  );
};

export default EmployeeCheckInOutCell;
