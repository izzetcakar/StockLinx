import {
  AssetCheckInPayload,
  AssetCheckOutPayload,
} from "../../interfaces/clientInterfaces";
import { IAsset } from "../../interfaces/serverInterfaces";
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
  FetchAssetsSuccess,
  FetchAssetFailure,
  FetchAssetRequest,
  FetchAssetSuccess,
  UpdateAssetFailure,
  UpdateAssetRequest,
  UpdateAssetSuccess,
  AssetRequestPayload,
  SetAsset,
  SetAssets,
  ClearAsset,
  ClearAssets,
  AssetsPayload,
  AssetPayload,
  CreateRangeAssetRequest,
  CreateRangeAssetSuccess,
  CreateRangeAssetFailure,
  RemoveRangeAssetRequest,
  RemoveRangeAssetSuccess,
  RemoveRangeAssetFailure,
  AssetRemoveRangePayload,
  AssetRemovePayload,
  CheckInAssetRequest,
  CheckInAssetSuccess,
  CheckInAssetFailure,
  CheckOutAssetRequest,
  CheckOutAssetSuccess,
  CheckOutAssetFailure,
} from "./type";

//GET
const getAll = (): FetchAssetsRequest => ({
  type: assetConst.FETCH_ASSETS_REQUEST,
});
const getAllSuccess = (payload: AssetsPayload): FetchAssetsSuccess => ({
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
const getSuccess = (payload: AssetPayload): FetchAssetSuccess => ({
  type: assetConst.FETCH_ASSET_SUCCESS,
  payload,
});
const getFailure = (): FetchAssetFailure => ({
  type: assetConst.FETCH_ASSET_FAILURE,
});

//POST
const create = (payload: AssetPayload): CreateAssetRequest => ({
  type: assetConst.CREATE_ASSET_REQUEST,
  payload,
});
const createSuccess = (payload: AssetsPayload): CreateAssetSuccess => ({
  type: assetConst.CREATE_ASSET_SUCCESS,
  payload,
});
const createFailure = (): CreateAssetFailure => ({
  type: assetConst.CREATE_ASSET_FAILURE,
});

//POST RANGE
const createRange = (payload: AssetsPayload): CreateRangeAssetRequest => ({
  type: assetConst.CREATE_RANGE_ASSET_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: AssetsPayload
): CreateRangeAssetSuccess => ({
  type: assetConst.CREATE_RANGE_ASSET_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeAssetFailure => ({
  type: assetConst.CREATE_RANGE_ASSET_FAILURE,
});

//PUT
const update = (payload: AssetPayload): UpdateAssetRequest => ({
  type: assetConst.UPDATE_ASSET_REQUEST,
  payload,
});
const updateSuccess = (payload: AssetPayload): UpdateAssetSuccess => ({
  type: assetConst.UPDATE_ASSET_SUCCESS,
  payload,
});
const updateFailure = (): UpdateAssetFailure => ({
  type: assetConst.UPDATE_ASSET_FAILURE,
});

//REMOVE
const remove = (payload: AssetRemovePayload): RemoveAssetRequest => ({
  type: assetConst.REMOVE_ASSET_REQUEST,
  payload,
});
const removeSuccess = (payload: AssetRemovePayload): RemoveAssetSuccess => ({
  type: assetConst.REMOVE_ASSET_SUCCESS,
  payload,
});
const removeFailure = (): RemoveAssetFailure => ({
  type: assetConst.REMOVE_ASSET_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: AssetRemoveRangePayload
): RemoveRangeAssetRequest => ({
  type: assetConst.REMOVE_RANGE_ASSET_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: AssetRemoveRangePayload
): RemoveRangeAssetSuccess => ({
  type: assetConst.REMOVE_RANGE_ASSET_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeAssetFailure => ({
  type: assetConst.REMOVE_RANGE_ASSET_FAILURE,
});

//CHECK IN
const checkIn = (payload: AssetCheckInPayload): CheckInAssetRequest => ({
  type: assetConst.CHECK_IN_ASSET_REQUEST,
  payload,
});
const checkInSuccess = (payload: AssetCheckInPayload): CheckInAssetSuccess => ({
  type: assetConst.CHECK_IN_ASSET_SUCCESS,
  payload,
});
const checkInFailure = (): CheckInAssetFailure => ({
  type: assetConst.CHECK_IN_ASSET_FAILURE,
});

//CHECK OUT
const checkOut = (payload: AssetCheckOutPayload): CheckOutAssetRequest => ({
  type: assetConst.CHECK_OUT_ASSET_REQUEST,
  payload,
});
const checkOutSuccess = (
  payload: AssetCheckOutPayload
): CheckOutAssetSuccess => ({
  type: assetConst.CHECK_OUT_ASSET_SUCCESS,
  payload,
});
const checkOutFailure = (): CheckOutAssetFailure => ({
  type: assetConst.CHECK_OUT_ASSET_FAILURE,
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
  createRange,
  createRangeSuccess,
  createRangeFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeRange,
  removeRangeSuccess,
  removeRangeFailure,
  checkIn,
  checkInSuccess,
  checkInFailure,
  checkOut,
  checkOutSuccess,
  checkOutFailure,
  setAsset,
  clearAsset,
  setAssets,
  clearAssets,
};
