import { ExcelColumn, DataColumn } from "@interfaces/gridTableInterfaces";
import { Anchor, Button, Image } from "@mantine/core";
import {
  IAsset,
  IModel,
  IProductStatus,
  ISupplier,
  IUser,
  IUserProduct,
} from "@interfaces/serverInterfaces";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/Image";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "../../modals/modals";
import base_asset from "../../assets/baseProductImages/base_asset.jpg";
import { lookupRequests } from "@/server/lookupRequests";
import { modelRequests } from "@/redux/model/requests";
import { useQuery } from "react-query";
import { productStatusRequests } from "@/redux/productStatus/requests";
import { userRequests } from "@/redux/user/requests";
import { userProductRequests } from "@/redux/userProduct/requests";
import { supplierRequests } from "@/redux/supplier/requests";

export const useColumns = () => {
  const navigate = useNavigate();
  const models =
    useQuery<IModel[]>({
      queryKey: "model_getAll",
      queryFn: modelRequests.getAll,
    }).data || [];
  const productStatuses =
    useQuery<IProductStatus[]>({
      queryKey: "productstatus_getAll",
      queryFn: productStatusRequests.getAll,
    }).data || [];
  const users =
    useQuery<IUser[]>({
      queryKey: "user_getAll",
      queryFn: userRequests.getAll,
    }).data || [];
  const userProducts =
    useQuery<IUserProduct[]>({
      queryKey: "userproduct_getAll",
      queryFn: userProductRequests.getAll,
    }).data || [];
  const suppliers =
    useQuery<ISupplier[]>({
      queryKey: "supplier_getAll",
      queryFn: supplierRequests.getAll,
    }).data || [];

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
        data: models.map((model) => ({
          value: model.id,
          label: model.name,
        })),
        dataSource: lookupRequests().model,
      },
      dataType: "string",
    },
    {
      dataField: "productStatusId",
      caption: "Status",
      lookup: {
        data: productStatuses.map((productStatus) => ({
          value: productStatus.id,
          label: productStatus.name,
        })),
        dataSource: lookupRequests().productStatus,
      },
      dataType: "string",
    },
    {
      dataField: "id",
      caption: "Checked Out To",
      dataType: "string",
      renderComponent(e) {
        const userProduct = userProducts.find(
          (userProduct) => userProduct?.assetId === (e as IAsset).id
        );
        if (!userProduct) return null;
        const user = users.find((user) => user.id === userProduct.userId);
        if (user) return user.firstName + " " + user.lastName;
      },
      lookup: {
        data: users.map((user) => ({
          value: user.id,
          label: user.firstName + " " + user.lastName,
        })),
        dataSource: lookupRequests().user,
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
      renderComponent(e) {
        const asset = e as IAsset;
        const userProduct = userProducts.find(
          (userProduct) => userProduct?.assetId === asset.id
        );
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={userProduct ? "red" : "green"}
              variant="filled"
              size="xs"
              onClick={() => {
                userProduct ? checkOut(asset, userProduct) : checkIn(asset);
              }}
            >
              {userProduct ? "Check Out" : "Check In"}
            </Button>
          </div>
        );
      },
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
        data: suppliers.map((supplier) => ({
          value: supplier.id,
          label: supplier.name,
        })),
        dataSource: lookupRequests().supplier,
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
