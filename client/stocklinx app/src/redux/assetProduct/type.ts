import { IAssetProduct } from "../../interfaces/serverInterfaces";
import { assetProductConst } from "./constant";

export type AssetProductState = {
  assetProduct: IAssetProduct | null;
  assetProducts: IAssetProduct[];
};
export type AssetProductRequestPayload = {
  id: string;
};
export type AssetProductPayload = {
  assetProduct: IAssetProduct;
};
export type AssetProductsPayload = {
  assetProducts: IAssetProduct[];
};
export type AssetProductRemoveRangePayload = {
  ids: string[];
};
export type AssetProductRemovePayload = {
  id: string;
};

//GET
export type FetchAssetProductsRequest = {
  type: typeof assetProductConst.FETCH_ASSETPRODUCTS_REQUEST;
};
export type FetchAssetProductsSuccess = {
  type: typeof assetProductConst.FETCH_ASSETPRODUCTS_SUCCESS;
  payload: AssetProductsPayload;
};
export type FetchAssetProductsFailure = {
  type: typeof assetProductConst.FETCH_ASSETPRODUCTS_FAILURE;
};

//GET:/ID
export type FetchAssetProductRequest = {
  type: typeof assetProductConst.FETCH_ASSETPRODUCT_REQUEST;
  payload: AssetProductRequestPayload;
};
export type FetchAssetProductSuccess = {
  type: typeof assetProductConst.FETCH_ASSETPRODUCT_SUCCESS;
  payload: AssetProductPayload;
};
export type FetchAssetProductFailure = {
  type: typeof assetProductConst.FETCH_ASSETPRODUCT_FAILURE;
};

//POST
export type CreateAssetProductRequest = {
  type: typeof assetProductConst.CREATE_ASSETPRODUCT_REQUEST;
  payload: AssetProductPayload;
};
export type CreateAssetProductSuccess = {
  type: typeof assetProductConst.CREATE_ASSETPRODUCT_SUCCESS;
  payload: AssetProductPayload;
};
export type CreateAssetProductFailure = {
  type: typeof assetProductConst.CREATE_ASSETPRODUCT_FAILURE;
};

//POST RANGE
export type CreateRangeAssetProductRequest = {
  type: typeof assetProductConst.CREATE_RANGE_ASSETPRODUCT_REQUEST;
  payload: AssetProductsPayload;
};
export type CreateRangeAssetProductSuccess = {
  type: typeof assetProductConst.CREATE_RANGE_ASSETPRODUCT_SUCCESS;
  payload: AssetProductsPayload;
};
export type CreateRangeAssetProductFailure = {
  type: typeof assetProductConst.CREATE_RANGE_ASSETPRODUCT_FAILURE;
};

//PUT
export type UpdateAssetProductRequest = {
  type: typeof assetProductConst.UPDATE_ASSETPRODUCT_REQUEST;
  payload: AssetProductPayload;
};
export type UpdateAssetProductSuccess = {
  type: typeof assetProductConst.UPDATE_ASSETPRODUCT_SUCCESS;
  payload: AssetProductPayload;
};
export type UpdateAssetProductFailure = {
  type: typeof assetProductConst.UPDATE_ASSETPRODUCT_FAILURE;
};

//REMOVE
export type RemoveAssetProductRequest = {
  type: typeof assetProductConst.REMOVE_ASSETPRODUCT_REQUEST;
  payload: AssetProductRemovePayload;
};
export type RemoveAssetProductSuccess = {
  type: typeof assetProductConst.REMOVE_ASSETPRODUCT_SUCCESS;
  payload: AssetProductRemovePayload;
};
export type RemoveAssetProductFailure = {
  type: typeof assetProductConst.REMOVE_ASSETPRODUCT_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeAssetProductRequest = {
  type: typeof assetProductConst.REMOVE_RANGE_ASSETPRODUCT_REQUEST;
  payload: AssetProductRemoveRangePayload;
};
export type RemoveRangeAssetProductSuccess = {
  type: typeof assetProductConst.REMOVE_RANGE_ASSETPRODUCT_SUCCESS;
  payload: AssetProductRemoveRangePayload;
};
export type RemoveRangeAssetProductFailure = {
  type: typeof assetProductConst.REMOVE_RANGE_ASSETPRODUCT_FAILURE;
};

//CLIENT ACTION TYPES
export type SetAssetProduct = {
  type: typeof assetProductConst.SET_ASSETPRODUCT;
  payload: IAssetProduct | null;
};
export type SetAssetProducts = {
  type: typeof assetProductConst.SET_ASSETPRODUCTS;
  payload: IAssetProduct[];
};
export type ClearAssetProduct = {
  type: typeof assetProductConst.CLEAR_ASSETPRODUCT;
};
export type ClearAssetProducts = {
  type: typeof assetProductConst.CLEAR_ASSETPRODUCTS;
};

export type AssetProductActions =
  | FetchAssetProductsRequest
  | FetchAssetProductsSuccess
  | FetchAssetProductsFailure
  | FetchAssetProductRequest
  | FetchAssetProductSuccess
  | FetchAssetProductFailure
  | CreateAssetProductRequest
  | CreateAssetProductSuccess
  | CreateAssetProductFailure
  | CreateRangeAssetProductRequest
  | CreateRangeAssetProductSuccess
  | CreateRangeAssetProductFailure
  | UpdateAssetProductRequest
  | UpdateAssetProductSuccess
  | UpdateAssetProductFailure
  | RemoveAssetProductRequest
  | RemoveAssetProductSuccess
  | RemoveAssetProductFailure
  | RemoveRangeAssetProductRequest
  | RemoveRangeAssetProductSuccess
  | RemoveRangeAssetProductFailure
  | SetAssetProduct
  | SetAssetProducts
  | ClearAssetProduct
  | ClearAssetProducts;
