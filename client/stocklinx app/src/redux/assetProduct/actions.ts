import { IAssetProduct } from "@interfaces/serverInterfaces";
import { assetProductConst } from "./constant";
import {
  CreateAssetProductFailure,
  CreateAssetProductRequest,
  CreateAssetProductSuccess,
  RemoveAssetProductFailure,
  RemoveAssetProductRequest,
  RemoveAssetProductSuccess,
  FetchAssetProductsFailure,
  FetchAssetProductsRequest,
  FetchAssetProductsSuccess,
  FetchAssetProductFailure,
  FetchAssetProductRequest,
  FetchAssetProductSuccess,
  UpdateAssetProductFailure,
  UpdateAssetProductRequest,
  UpdateAssetProductSuccess,
  AssetProductRequestPayload,
  SetAssetProduct,
  SetAssetProducts,
  ClearAssetProduct,
  ClearAssetProducts,
  AssetProductsPayload,
  AssetProductPayload,
  CreateRangeAssetProductRequest,
  CreateRangeAssetProductSuccess,
  CreateRangeAssetProductFailure,
  RemoveRangeAssetProductRequest,
  RemoveRangeAssetProductSuccess,
  RemoveRangeAssetProductFailure,
  AssetProductRemoveRangePayload,
  AssetProductRemovePayload,
  FilterAssetProductsRequest,
  FilterAssetProductsSuccess,
  FilterAssetProductsFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchAssetProductsRequest => ({
  type: assetProductConst.FETCH_ASSETPRODUCTS_REQUEST,
});
const getAllSuccess = (
  payload: AssetProductsPayload
): FetchAssetProductsSuccess => ({
  type: assetProductConst.FETCH_ASSETPRODUCTS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchAssetProductsFailure => ({
  type: assetProductConst.FETCH_ASSETPRODUCTS_FAILURE,
});

//GET:/ID
const get = (
  payload: AssetProductRequestPayload
): FetchAssetProductRequest => ({
  type: assetProductConst.FETCH_ASSETPRODUCT_REQUEST,
  payload,
});
const getSuccess = (
  payload: AssetProductPayload
): FetchAssetProductSuccess => ({
  type: assetProductConst.FETCH_ASSETPRODUCT_SUCCESS,
  payload,
});
const getFailure = (): FetchAssetProductFailure => ({
  type: assetProductConst.FETCH_ASSETPRODUCT_FAILURE,
});

//POST
const create = (payload: AssetProductPayload): CreateAssetProductRequest => ({
  type: assetProductConst.CREATE_ASSETPRODUCT_REQUEST,
  payload,
});
const createSuccess = (
  payload: AssetProductPayload
): CreateAssetProductSuccess => ({
  type: assetProductConst.CREATE_ASSETPRODUCT_SUCCESS,
  payload,
});
const createFailure = (): CreateAssetProductFailure => ({
  type: assetProductConst.CREATE_ASSETPRODUCT_FAILURE,
});

//POST RANGE
const createRange = (
  payload: AssetProductsPayload
): CreateRangeAssetProductRequest => ({
  type: assetProductConst.CREATE_RANGE_ASSETPRODUCT_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: AssetProductsPayload
): CreateRangeAssetProductSuccess => ({
  type: assetProductConst.CREATE_RANGE_ASSETPRODUCT_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeAssetProductFailure => ({
  type: assetProductConst.CREATE_RANGE_ASSETPRODUCT_FAILURE,
});

//PUT
const update = (payload: AssetProductPayload): UpdateAssetProductRequest => ({
  type: assetProductConst.UPDATE_ASSETPRODUCT_REQUEST,
  payload,
});
const updateSuccess = (
  payload: AssetProductPayload
): UpdateAssetProductSuccess => ({
  type: assetProductConst.UPDATE_ASSETPRODUCT_SUCCESS,
  payload,
});
const updateFailure = (): UpdateAssetProductFailure => ({
  type: assetProductConst.UPDATE_ASSETPRODUCT_FAILURE,
});

//REMOVE
const remove = (
  payload: AssetProductRemovePayload
): RemoveAssetProductRequest => ({
  type: assetProductConst.REMOVE_ASSETPRODUCT_REQUEST,
  payload,
});
const removeSuccess = (
  payload: AssetProductRemovePayload
): RemoveAssetProductSuccess => ({
  type: assetProductConst.REMOVE_ASSETPRODUCT_SUCCESS,
  payload,
});
const removeFailure = (): RemoveAssetProductFailure => ({
  type: assetProductConst.REMOVE_ASSETPRODUCT_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: AssetProductRemoveRangePayload
): RemoveRangeAssetProductRequest => ({
  type: assetProductConst.REMOVE_RANGE_ASSETPRODUCT_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: AssetProductRemoveRangePayload
): RemoveRangeAssetProductSuccess => ({
  type: assetProductConst.REMOVE_RANGE_ASSETPRODUCT_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeAssetProductFailure => ({
  type: assetProductConst.REMOVE_RANGE_ASSETPRODUCT_FAILURE,
});

//
const filter = (payload: QueryFilter[]): FilterAssetProductsRequest => ({
  type: assetProductConst.FILTER_ASSETPRODUCTS_REQUEST,
  payload,
});

const filterSuccess = (
  payload: AssetProductsPayload
): FilterAssetProductsSuccess => ({
  type: assetProductConst.FILTER_ASSETPRODUCTS_SUCCESS,
  payload,
});
const filterFailure = (): FilterAssetProductsFailure => ({
  type: assetProductConst.FILTER_ASSETPRODUCTS_FAILURE,
});

//CLIENT ACTIONS
const setAssetProduct = (payload: IAssetProduct | null): SetAssetProduct => ({
  type: assetProductConst.SET_ASSETPRODUCT,
  payload,
});
const clearAssetProduct = (): ClearAssetProduct => ({
  type: assetProductConst.CLEAR_ASSETPRODUCT,
});
const setAssetProducts = (payload: IAssetProduct[]): SetAssetProducts => ({
  type: assetProductConst.SET_ASSETPRODUCTS,
  payload,
});
const clearAssetProducts = (): ClearAssetProducts => ({
  type: assetProductConst.CLEAR_ASSETPRODUCTS,
});

export const assetProductActions = {
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
  filter,
  filterSuccess,
  filterFailure,
  setAssetProduct,
  clearAssetProduct,
  setAssetProducts,
  clearAssetProducts,
};
