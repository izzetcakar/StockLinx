import uuid4 from "uuid4";
import { IAssetProduct, IUserProduct } from "../interfaces/serverInterfaces";

export const initialUserProduct: IUserProduct = {
  id: uuid4(),
  userId: "",
  accessoryId: null,
  assetId: null,
  licenseId: null,
  consumableId: null,
  productStatusId: "",
  assignDate: new Date(),
  notes: null,
  quantity: 1,
};

export const initialAssetProduct: IAssetProduct = {
  id: uuid4(),
  componentId: null,
  assetId: "",
  licenseId: null,
  assignDate: new Date(),
  notes: null,
  quantity: 1,
};