import { useUser } from "@/hooks/query/user";
import { useEmployeeProduct } from "@/hooks/query/employeeProduct";
import { IAsset } from "@/interfaces/serverInterfaces";
import { Button } from "@mantine/core";
import React from "react";

interface UserCheckInOutCellProps {
  asset: IAsset;
  checkIn: any;
  checkOut: any;
}

const UserCheckInOutCell: React.FC<UserCheckInOutCellProps> = ({
  asset,
  checkIn,
  checkOut,
}) => {
  const { data: employeeProducts } = useEmployeeProduct.GetAll();
  const { data: userLK } = useUser.Lookup();
  const employeeProduct = employeeProducts?.find(
    (employeeProduct) => employeeProduct?.assetId === asset.id
  );
  const user = userLK?.find((user) => user.value === employeeProduct?.userId);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        color={user ? "red" : "green"}
        variant="filled"
        size="xs"
        style={{ width: "60%" }}
        onClick={() => {
          employeeProduct ? checkOut(asset, employeeProduct) : checkIn(asset);
        }}
      >
        {employeeProduct ? "Check Out" : "Check In"}
      </Button>
    </div>
  );
};

export default UserCheckInOutCell;
