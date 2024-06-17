import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Image } from "@mantine/core";
import { IAsset, IUserProduct } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "../../modals/modals";
import base_asset from "@assets/baseProductImages/base_asset.jpg";
import { useModel } from "@/hooks/model";
import { useUserProduct } from "@/hooks/userProduct";
import { useUser } from "@/hooks/user";
import { useSupplier } from "@/hooks/supplier";
import { useProductStatus } from "@/hooks/productStatus";
import UserCheckInOutCell from "@/cells/UserCheckInOutCell";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { data: userLK, refetch: getUserLK } = useUser.Lookup();
  const { data: userProducts } = useUserProduct.GetAll();
  const { refetch: getModelLK } = useModel.Lookup();
  const { refetch: getSupplierLK } = useSupplier.Lookup();
  const { refetch: getProductStatusLK } = useProductStatus.Lookup();

  const checkIn = (asset: IAsset) => {
    openAssetCheckInModal({
      userId: "",
      assetId: asset.id,
      assaignDate: new Date(),
      notes: asset.notes,
      productStatusId: asset.productStatusId,
    });
  };

  const checkOut = (asset: IAsset, userProduct: IUserProduct) => {
    openAssetCheckOutModal({
      assetId: asset.id,
      userProductId: userProduct.id,
      productStatusId: asset.productStatusId,
      notes: userProduct.notes,
    });
  };

  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "Tag",
      dataType: "string",
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "action",
      renderComponent(e) {
        const image = getImage((e as IAsset).imagePath);
        return (
          <Image
            src={image ? image : base_asset}
            height={30}
            radius="md"
            width="fit-content"
            fit="contain"
          />
        );
      },
    },
    {
      dataField: "serialNo",
      caption: "Serial",
      dataType: "string",
    },
    {
      dataField: "modelId",
      caption: "Model",
      lookup: {
        dataSource: getModelLK,
      },
      dataType: "string",
      renderComponent: (e) => EntityCells.Model((e as IAsset).modelId),
    },
    {
      dataField: "productStatusId",
      caption: "Status",
      dataType: "string",
      lookup: {
        dataSource: getProductStatusLK,
      },
      renderComponent: (e) =>
        EntityCells.ProductStatus((e as IAsset).productStatusId),
    },
    {
      dataField: "id",
      caption: "Checked Out To",
      dataType: "string",
      renderComponent: (e) => {
        const userProduct = userProducts?.find(
          (userProduct) => userProduct?.assetId === (e as IAsset).id
        );
        if (!userProduct) return null;
        const user = userLK?.find((user) => user.value === userProduct.userId);
        return user?.label;
      },
      lookup: {
        data: userLK,
        dataSource: getUserLK,
      },
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "id",
      caption: "Checkin/Checkout",
      dataType: "action",
      renderComponent: (e) => (
        <UserCheckInOutCell
          asset={e as IAsset}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      ),
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      allowVisible: false,
    },
    {
      dataField: "orderNo",
      caption: "Order No",
      dataType: "string",
      allowVisible: false,
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
      dataType: "date",
      allowVisible: false,
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      dataType: "string",
      lookup: {
        dataSource: getSupplierLK,
      },
      renderComponent: (e) => EntityCells.Supplier((e as IAsset).supplierId),
    },
  ];

  return { columns };
};
