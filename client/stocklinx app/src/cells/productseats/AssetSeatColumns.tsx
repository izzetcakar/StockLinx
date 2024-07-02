import { DataColumn } from "@/interfaces/gridTableInterfaces";
import { EntityCells } from "../Entity";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { openAssetProductCheckOutModal } from "@/utils/modalUtils";
import CheckOutButton from "../CheckOutBtnCell";
import { AssetProductCheckOutDto } from "@/interfaces/dtos";

export const assetSeatColumns = (
  assetCheckOut: (data: AssetProductCheckOutDto) => void
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
      caption: "Asset",
      dataField: "assetId",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IAssetProduct;
        return EntityCells.Asset((checked as IAssetProduct).assetId);
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
        const checked = e as IAssetProduct;
        return (
          <CheckOutButton
            checkOut={openAssetProductCheckOutModal(
              {
                assetProductId: checked.id,
                quantity: checked.quantity,
                notes: checked.notes,
                assetId: checked.assetId,
              },
              assetCheckOut
            )}
          />
        );
      },
    },
  ];
  return { columns };
};
