import { DataColumn } from "@/interfaces/gridTableInterfaces";
import { EntityCells } from "../Entity";
import { IUserProduct } from "@/interfaces/serverInterfaces";
import { openUserProductCheckOutModal } from "@/utils/modalUtils";
import CheckOutButton from "../CheckOutBtnCell";
import { UserProductCheckOutDto } from "@/interfaces/dtos";

export const userSeatColumns = (
  userCheckOut: (data: UserProductCheckOutDto) => void
) => {
  const columns: DataColumn[] = [
    {
      caption: "Seat",
      dataField: "id",
      dataType: "action",
      renderComponent: (_, index) => {
        return "Seat " + (index + 1);
      },
    },
    {
      caption: "User",
      dataField: "userId",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IUserProduct;
        return EntityCells.User((checked as IUserProduct).userId);
      },
    },
    {
      caption: "Quantity",
      dataField: "quantity",
      dataType: "number",
    },
    {
      caption: "Check Out",
      dataField: "id",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IUserProduct;
        return (
          <CheckOutButton
            checkOut={openUserProductCheckOutModal(
              {
                userProductId: checked.id,
                quantity: checked.quantity,
                notes: checked.notes,
                userId: checked.userId,
              },
              userCheckOut
            )}
          />
        );
      },
    },
  ];
  return { columns };
};
