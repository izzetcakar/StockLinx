import { useUser } from "@/hooks/query/user";
import { useUserProduct } from "@/hooks/query/userProduct";
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
  const { data: userProducts } = useUserProduct.GetAll();
  const { data: userLK } = useUser.Lookup();
  const userProduct = userProducts?.find(
    (userProduct) => userProduct?.assetId === asset.id
  );
  const user = userLK?.find((user) => user.value === userProduct?.userId);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        color={user ? "red" : "green"}
        variant="filled"
        size="xs"
        style={{ width: "60%" }}
        onClick={() => {
          userProduct ? checkOut(asset, userProduct) : checkIn(asset);
        }}
      >
        {userProduct ? "Check Out" : "Check In"}
      </Button>
    </div>
  );
};

export default UserCheckInOutCell;
