import { useIsMutating } from "react-query";
import { Button } from "@mantine/core";
import React from "react";

interface CheckOutButtonProps {
  checkOut: any;
}

const CheckOutButton: React.FC<CheckOutButtonProps> = ({ checkOut }) => {
 const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={() => checkOut()} type="submit" loading={isMutating}>
        CheckOut
      </Button>
    </div>
  );
};

export default CheckOutButton;
