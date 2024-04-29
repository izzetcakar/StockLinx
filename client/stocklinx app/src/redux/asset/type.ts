import {
  AssetCheckInPayload,
  AssetCheckOutPayload,
} from "../../interfaces/clientInterfaces";
import { IAsset, IUserProduct } from "../../interfaces/serverInterfaces";
import { assetConst } from "./constant";

export type AssetState = {
  asset: IAsset | null;
  assets: IAsset[];
};
export type AssetRequestPayload = {
  id: string;
};
export type AssetPayload = {
  asset: IAsset;
};
export type AssetsPayload = {
  assets: IAsset[];
};
export type AssetRemoveRangePayload = {
  ids: string[];
};
export type AssetRemovePayload = {
  id: string;
};
export type AssetCheckInSuccessPayload = {
  asset: IAsset;
  userProduct: IUserProduct;
};

//GET
export type FetchAssetsRequest = {
  type: typeof assetConst.FETCH_ASSETS_REQUEST;
};
export type FetchAssetsSuccess = {
  type: typeof assetConst.FETCH_ASSETS_SUCCESS;
  payload: AssetsPayload;
};
export type FetchAssetsFailure = {
  type: typeof assetConst.FETCH_ASSETS_FAILURE;
};

//GET:/ID
export type FetchAssetRequest = {
  type: typeof assetConst.FETCH_ASSET_REQUEST;
  payload: AssetRequestPayload;
};
export type FetchAssetSuccess = {
  type: typeof assetConst.FETCH_ASSET_SUCCESS;
  payload: AssetPayload;
};
export type FetchAssetFailure = {
  type: typeof assetConst.FETCH_ASSET_FAILURE;
};

//POST
export type CreateAssetRequest = {
  type: typeof assetConst.CREATE_ASSET_REQUEST;
  payload: AssetPayload;
};
export type CreateAssetSuccess = {
  type: typeof assetConst.CREATE_ASSET_SUCCESS;
  payload: AssetsPayload;
};
export type CreateAssetFailure = {
  type: typeof assetConst.CREATE_ASSET_FAILURE;
};

//POST RANGE
export type CreateRangeAssetRequest = {
  type: typeof assetConst.CREATE_RANGE_ASSET_REQUEST;
  payload: AssetsPayload;
};
export type CreateRangeAssetSuccess = {
  type: typeof assetConst.CREATE_RANGE_ASSET_SUCCESS;
  payload: AssetsPayload;
};
export type CreateRangeAssetFailure = {
  type: typeof assetConst.CREATE_RANGE_ASSET_FAILURE;
};

//PUT
export type UpdateAssetRequest = {
  type: typeof assetConst.UPDATE_ASSET_REQUEST;
  payload: AssetPayload;
};
export type UpdateAssetSuccess = {
  type: typeof assetConst.UPDATE_ASSET_SUCCESS;
  payload: AssetPayload;
};
export type UpdateAssetFailure = {
  type: typeof assetConst.UPDATE_ASSET_FAILURE;
};

//REMOVE
export type RemoveAssetRequest = {
  type: typeof assetConst.REMOVE_ASSET_REQUEST;
  payload: AssetRemovePayload;
};
export type RemoveAssetSuccess = {
  type: typeof assetConst.REMOVE_ASSET_SUCCESS;
  payload: AssetRemovePayload;
};
export type RemoveAssetFailure = {
  type: typeof assetConst.REMOVE_ASSET_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeAssetRequest = {
  type: typeof assetConst.REMOVE_RANGE_ASSET_REQUEST;
  payload: AssetRemoveRangePayload;
};
export type RemoveRangeAssetSuccess = {
  type: typeof assetConst.REMOVE_RANGE_ASSET_SUCCESS;
  payload: AssetRemoveRangePayload;
};
export type RemoveRangeAssetFailure = {
  type: typeof assetConst.REMOVE_RANGE_ASSET_FAILURE;
};

//CHECK IN
export type CheckInAssetRequest = {
  type: typeof assetConst.CHECK_IN_ASSET_REQUEST;
  payload: AssetCheckInPayload;
};
export type CheckInAssetSuccess = {
  type: typeof assetConst.CHECK_IN_ASSET_SUCCESS;
  payload: AssetCheckInPayload;
};
export type CheckInAssetFailure = {
  type: typeof assetConst.CHECK_IN_ASSET_FAILURE;
};

//CHECK OUT
export type CheckOutAssetRequest = {
  type: typeof assetConst.CHECK_OUT_ASSET_REQUEST;
  payload: AssetCheckOutPayload;
};
export type CheckOutAssetSuccess = {
  type: typeof assetConst.CHECK_OUT_ASSET_SUCCESS;
  payload: AssetCheckOutPayload;
};
export type CheckOutAssetFailure = {
  type: typeof assetConst.CHECK_OUT_ASSET_FAILURE;
};

//CLIENT ACTION TYPES
export type SetAsset = {
  type: typeof assetConst.SET_ASSET;
  payload: IAsset | null;
};
export type SetAssets = {
  type: typeof assetConst.SET_ASSETS;
  payload: IAsset[];
};
export type ClearAsset = {
  type: typeof assetConst.CLEAR_ASSET;
};
export type ClearAssets = {
  type: typeof assetConst.CLEAR_ASSETS;
};

export type AssetActions =
  | FetchAssetsRequest
  | FetchAssetsSuccess
  | FetchAssetsFailure
  | FetchAssetRequest
  | FetchAssetSuccess
  | FetchAssetFailure
  | CreateAssetRequest
  | CreateAssetSuccess
  | CreateAssetFailure
  | CreateRangeAssetRequest
  | CreateRangeAssetSuccess
  | CreateRangeAssetFailure
  | UpdateAssetRequest
  | UpdateAssetSuccess
  | UpdateAssetFailure
  | RemoveAssetRequest
  | RemoveAssetSuccess
  | RemoveAssetFailure
  | RemoveRangeAssetRequest
  | RemoveRangeAssetSuccess
  | RemoveRangeAssetFailure
  | CheckInAssetRequest
  | CheckInAssetSuccess
  | CheckInAssetFailure
  | CheckOutAssetRequest
  | CheckOutAssetSuccess
  | CheckOutAssetFailure
  | SetAsset
  | SetAssets
  | ClearAsset
  | ClearAssets;
