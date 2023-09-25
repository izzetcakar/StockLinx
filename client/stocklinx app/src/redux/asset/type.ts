import { IAsset, SelectData } from "../../interfaces/interfaces";
import { assetConst } from "./constant";

export interface AssetState {
  asset: IAsset | null;
  assets: IAsset[];
  selectData: SelectData[];
}

export interface AssetSucccessPayload {
  asset: IAsset;
}
export interface AssetsSucccessPayload {
  assets: IAsset[];
}
export interface AssetRequestPayload {
  id: string;
}
export interface UpdateAssetRequestPayload {
  asset: IAsset;
}

//GET
export interface FetchAssetsRequest {
  type: typeof assetConst.FETCH_ASSETS_REQUEST;
}
export type FetchAssetsSuccess = {
  type: typeof assetConst.FETCH_ASSETS_SUCCESS;
  payload: AssetsSucccessPayload;
};
export type FetchAssetsFailure = {
  type: typeof assetConst.FETCH_ASSETS_FAILURE;
};
//GET:/ID
export interface FetchAssetRequest {
  type: typeof assetConst.FETCH_ASSET_REQUEST;
  payload: AssetRequestPayload;
}
export type FetchAssetSuccess = {
  type: typeof assetConst.FETCH_ASSET_SUCCESS;
  payload: AssetSucccessPayload;
};
export type FetchAssetFailure = {
  type: typeof assetConst.FETCH_ASSET_FAILURE;
};
//POST
export interface CreateAssetRequest {
  type: typeof assetConst.CREATE_ASSET_REQUEST;
  payload: UpdateAssetRequestPayload;
}
export type CreateAssetSuccess = {
  type: typeof assetConst.CREATE_ASSET_SUCCESS;
};
export type CreateAssetFailure = {
  type: typeof assetConst.CREATE_ASSET_FAILURE;
};
//PUT
export interface UpdateAssetRequest {
  type: typeof assetConst.UPDATE_ASSET_REQUEST;
  payload: UpdateAssetRequestPayload;
}
export type UpdateAssetSuccess = {
  type: typeof assetConst.UPDATE_ASSET_SUCCESS;
};
export type UpdateAssetFailure = {
  type: typeof assetConst.UPDATE_ASSET_FAILURE;
};
//REMOVE
export interface RemoveAssetRequest {
  type: typeof assetConst.REMOVE_ASSET_REQUEST;
  payload: AssetRequestPayload;
}
export type RemoveAssetSuccess = {
  type: typeof assetConst.REMOVE_ASSET_SUCCESS;
};
export type RemoveAssetFailure = {
  type: typeof assetConst.REMOVE_ASSET_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetAsset {
  type: typeof assetConst.SET_ASSET;
  payload: IAsset | null;
}
export interface SetAssets {
  type: typeof assetConst.SET_ASSETS;
  payload: IAsset[];
}
export interface ClearAsset {
  type: typeof assetConst.CLEAR_ASSET;
}
export interface ClearAssets {
  type: typeof assetConst.CLEAR_ASSETS;
}

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
  | UpdateAssetRequest
  | UpdateAssetSuccess
  | UpdateAssetFailure
  | RemoveAssetRequest
  | RemoveAssetSuccess
  | RemoveAssetFailure
  | SetAsset
  | SetAssets
  | ClearAsset
  | ClearAssets;
