import { Button } from "@mantine/core";
import React from "react";

interface CheckOutButtonProps {
  checkOut: any;
}

const CheckOutButton: React.FC<CheckOutButtonProps> = ({ checkOut }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={() => checkOut()}>CheckOut</Button>
    </div>
  );
};

export default CheckOutButton;
