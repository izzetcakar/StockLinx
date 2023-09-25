import { IAsset } from "../../interfaces/interfaces";
import { assetConst } from "./constant";
import {
  CreateAssetFailure,
  CreateAssetRequest,
  CreateAssetSuccess,
  RemoveAssetFailure,
  RemoveAssetRequest,
  RemoveAssetSuccess,
  FetchAssetsFailure,
  FetchAssetsRequest,
  AssetsSucccessPayload,
  FetchAssetsSuccess,
  FetchAssetFailure,
  FetchAssetRequest,
  FetchAssetSuccess,
  UpdateAssetFailure,
  UpdateAssetRequest,
  UpdateAssetSuccess,
  AssetRequestPayload,
  UpdateAssetRequestPayload,
  AssetSucccessPayload,
  SetAsset,
  SetAssets,
  ClearAsset,
  ClearAssets,
} from "./type";

//GET
const getAll = (): FetchAssetsRequest => ({
  type: assetConst.FETCH_ASSETS_REQUEST,
});
const getAllSuccess = (payload: AssetsSucccessPayload): FetchAssetsSuccess => ({
  type: assetConst.FETCH_ASSETS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchAssetsFailure => ({
  type: assetConst.FETCH_ASSETS_FAILURE,
});

//GET:/ID
const get = (payload: AssetRequestPayload): FetchAssetRequest => ({
  type: assetConst.FETCH_ASSET_REQUEST,
  payload,
});
const getSuccess = (payload: AssetSucccessPayload): FetchAssetSuccess => ({
  type: assetConst.FETCH_ASSET_SUCCESS,
  payload,
});
const getFailure = (): FetchAssetFailure => ({
  type: assetConst.FETCH_ASSET_FAILURE,
});

//POST
const create = (payload: UpdateAssetRequestPayload): CreateAssetRequest => ({
  type: assetConst.CREATE_ASSET_REQUEST,
  payload,
});
const createSuccess = (): CreateAssetSuccess => ({
  type: assetConst.CREATE_ASSET_SUCCESS,
});
const createFailure = (): CreateAssetFailure => ({
  type: assetConst.CREATE_ASSET_FAILURE,
});

//PUT
const update = (payload: UpdateAssetRequestPayload): UpdateAssetRequest => ({
  type: assetConst.UPDATE_ASSET_REQUEST,
  payload,
});
const updateSuccess = (): UpdateAssetSuccess => ({
  type: assetConst.UPDATE_ASSET_SUCCESS,
});
const updateFailure = (): UpdateAssetFailure => ({
  type: assetConst.UPDATE_ASSET_FAILURE,
});

//REMOVE
const remove = (payload: AssetRequestPayload): RemoveAssetRequest => ({
  type: assetConst.REMOVE_ASSET_REQUEST,
  payload,
});
const removeSuccess = (): RemoveAssetSuccess => ({
  type: assetConst.REMOVE_ASSET_SUCCESS,
});
const removeFailure = (): RemoveAssetFailure => ({
  type: assetConst.REMOVE_ASSET_FAILURE,
});

//CLIENT ACTIONS
const setAsset = (payload: IAsset | null): SetAsset => ({
  type: assetConst.SET_ASSET,
  payload,
});
const clearAsset = (): ClearAsset => ({
  type: assetConst.CLEAR_ASSET,
});
const setAssets = (payload: IAsset[]): SetAssets => ({
  type: assetConst.SET_ASSETS,
  payload,
});
const clearAssets = (): ClearAssets => ({
  type: assetConst.CLEAR_ASSETS,
});

export const assetActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setAsset,
  clearAsset,
  setAssets,
  clearAssets,
};
