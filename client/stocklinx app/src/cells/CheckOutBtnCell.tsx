import { queryClient } from "@/main";
import { Button } from "@mantine/core";
import React from "react";

interface CheckOutButtonProps {
  checkOut: any;
}

const CheckOutButton: React.FC<CheckOutButtonProps> = ({ checkOut }) => {
  const isMutating = queryClient.isMutating() > 0;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={() => checkOut()} type="submit" loading={isMutating}>
        CheckOut
      </Button>
    </div>
  );
};

export default CheckOutButton;
