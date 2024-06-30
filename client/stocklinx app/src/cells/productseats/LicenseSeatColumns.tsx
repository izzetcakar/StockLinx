import { DataColumn } from "@/interfaces/gridTableInterfaces";
import { EntityCells } from "../Entity";
import { IAssetProduct, IUserProduct } from "@/interfaces/serverInterfaces";
import { useLicense } from "@/hooks/query/license";
import { Button } from "@mantine/core";
import {
  openAssetProductCheckOutModal,
  openUserProductCheckOutModal,
} from "@/utils/modalUtils";

const isUserProduct = (e: IAssetProduct | IUserProduct): e is IUserProduct => {
  return (e as IUserProduct).userId !== undefined;
};

const isAssetProduct = (
  e: IAssetProduct | IUserProduct
): e is IAssetProduct => {
  return (e as IAssetProduct).assetId !== undefined;
};

const CheckOutButton = (checkOut: () => any) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={checkOut}>CheckOut</Button>
    </div>
  );
};

export const useColumns = () => {
  const { mutate: userCheckOut } = useLicense.UserCheckOut();
  const { mutate: assetCheckOut } = useLicense.AssetCheckOut();

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
        const checked = e as IUserProduct | IAssetProduct;
        if (isUserProduct(checked)) {
          return EntityCells.User((checked as IUserProduct).userId);
        }
        return "";
      },
    },
    {
      caption: "Asset",
      dataField: "assetId",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IUserProduct | IAssetProduct;
        if (isAssetProduct(checked)) {
          return EntityCells.Asset((checked as IAssetProduct).assetId);
        }
        return "";
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
        const checked = e as IUserProduct | IAssetProduct;
        if (isUserProduct(checked)) {
          return CheckOutButton(() =>
            openUserProductCheckOutModal(
              {
                userProductId: checked.id,
                quantity: checked.quantity,
                notes: checked.notes,
                userId: checked.userId,
              },
              userCheckOut
            )
          );
        }
        return CheckOutButton(() =>
          openAssetProductCheckOutModal(
            {
              assetProductId: checked.id,
              quantity: checked.quantity,
              notes: checked.notes,
              assetId: checked.assetId,
            },
            assetCheckOut
          )
        );
      },
    },
  ];
  return { columns };
};
