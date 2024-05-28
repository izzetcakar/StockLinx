import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ExcelColumn, BaseColumn } from "@interfaces/gridTableInterfaces";
import { Anchor, Button, Image } from "@mantine/core";
import { IAsset, IUserProduct } from "../../interfaces/serverInterfaces";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/Image";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "../../modals/modals";
import base_asset from "../../assets/baseProductImages/base_asset.jpg";
import axios from "axios";

export const useColumns = () => {
  const navigate = useNavigate();
  const models = useSelector((state: RootState) => state.model.models);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );
  const users = useSelector((state: RootState) => state.user.users);
  const userProducts = useSelector(
    (state: RootState) => state.userProduct.userProducts
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

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

  const getTest = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = res.data.results;
    return data.map((item: any) => {
      return {
        value: item.url,
        label: item.name,
      };
    });
  };

  const columns: BaseColumn[] = [
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
        dataSource: getTest,
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
        if (userProduct) {
          const user = users.find((user) => user.id === userProduct.userId);
          if (user) return user.firstName + " " + user.lastName;
        }
        return null;
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
      selectable: false,
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      visible: false,
    },
    {
      dataField: "orderNo",
      caption: "Order No",
      dataType: "string",
      visible: false,
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
      dataType: "date",
      visible: false,
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
