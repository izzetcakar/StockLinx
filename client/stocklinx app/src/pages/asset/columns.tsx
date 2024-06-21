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
import { useSupplier } from "@/hooks/supplier";
import { useProductStatus } from "@/hooks/productStatus";
import UserCheckInOutCell from "@/cells/UserCheckInOutCell";
import { EntityCells } from "@/cells/Entity";
import CheckedOutUserCell from "@/cells/CheckedOutUserCell";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";

export const useColumns = () => {
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
      renderComponent: (e) => CheckedOutUserCell((e as IAsset).id),
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

  const cardColumns: EntityCardColumn[] = [
    {
      title: "Title",
      renderData: (e) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {e.tag}</div>
            <div>Name : {e.name}</div>
          </div>
        );
      },
    },
    {
      title: "Asset Details",
      renderData: (e) => {
        return (e as IAsset).name;
      },
    },
    {
      title: "Tag",
      renderData(e) {
        return (e as IAsset).tag;
      },
    },
    {
      title: "Status",
      renderData: (e) => {
        return EntityCells.ProductStatus((e as IAsset).productStatusId);
      },
    },
    {
      title: "Supplier",
      renderData: (e) => {
        return EntityCells.Supplier((e as IAsset).supplierId);
      },
    },
    {
      title: "Company",
      renderData: (e) => {
        return (e as IAsset).companyId;
      },
    },
  ];

  return { columns, cardColumns };
};
