import { ExcelColumn, DataColumn } from "@interfaces/gridTableInterfaces";
import { Anchor, Image } from "@mantine/core";
import { IAsset, IUserProduct } from "@interfaces/serverInterfaces";
import { useNavigate } from "react-router-dom";
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

export const useColumns = () => {
  const navigate = useNavigate();
  const { data: userProducts } = useUserProduct.GetAll();
  const { data: modelLookup } = useModel.Lookup();
  const { data: userLookup } = useUser.Lookup();
  const { data: supplierLookup } = useSupplier.Lookup();
  const { data: productStatusLookup } = useProductStatus.Lookup();

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
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/asset/${(e as IAsset)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IAsset).name}
          </Anchor>
        );
      },
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
            height={50}
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
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/asset/${(e as IAsset)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IAsset).serialNo}
          </Anchor>
        );
      },
    },
    {
      dataField: "modelId",
      caption: "Model",
      lookup: {
        data: modelLookup || [],
      },
      dataType: "string",
    },
    {
      dataField: "productStatusId",
      caption: "Status",
      lookup: {
        data: productStatusLookup || [],
      },
      dataType: "string",
    },
    {
      dataField: "id",
      caption: "Checked Out To",
      dataType: "string",
      renderComponent(e) {
        const userProduct = userProducts?.find(
          (userProduct) => userProduct?.assetId === (e as IAsset).id
        );
        if (!userProduct) return null;
        const user = userLookup?.find(
          (user) => user.value === userProduct.userId
        );
        return user?.label;
      },
      lookup: {
        data: userLookup || [],
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
        data: supplierLookup || [],
      },
    },
  ];
  const excelColumns: ExcelColumn[] = [
    {
      caption: "Branch",
      validate(value) {
        return value !== null;
      },
      errorText: "Branch is required",
    },
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Asset Tag",
    },
    {
      caption: "Serial",
    },
    {
      caption: "Model",
      nullable: true,
    },
    {
      caption: "Status",
      validate(value) {
        return value !== null;
      },
      errorText: "Status is required",
    },
    {
      caption: "Order No",
    },
    {
      caption: "Purchase Cost",
      validate(value) {
        if (value !== null && value < 0) return false;
        return true;
      },
      errorText: "Purchase Cost must be a positive number",
    },
    {
      caption: "Purchase Date",
    },
    {
      caption: "Image",
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
