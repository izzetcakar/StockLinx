import { IProductStatus } from "../../interfaces/serverInterfaces";
import { productStatusConst } from "./constant";
import {
  CreateProductStatusFailure,
  CreateProductStatusRequest,
  CreateProductStatusSuccess,
  RemoveProductStatusFailure,
  RemoveProductStatusRequest,
  RemoveProductStatusSuccess,
  FetchProductStatusesFailure,
  FetchProductStatusesRequest,
  FetchProductStatusesSuccess,
  FetchProductStatusFailure,
  FetchProductStatusRequest,
  FetchProductStatusSuccess,
  UpdateProductStatusFailure,
  UpdateProductStatusRequest,
  UpdateProductStatusSuccess,
  ProductStatusRequestPayload,
  SetProductStatus,
  SetProductStatuses,
  ClearProductStatus,
  ClearProductStatuses,
  ProductStatusesPayload,
  ProductStatusPayload,
  CreateRangeProductStatusRequest,
  CreateRangeProductStatusSuccess,
  CreateRangeProductStatusFailure,
  RemoveRangeProductStatusRequest,
  RemoveRangeProductStatusSuccess,
  RemoveRangeProductStatusFailure,
  ProductStatusRemoveRangePayload,
  ProductStatusRemovePayload,
} from "./type";

//GET
const getAll = (): FetchProductStatusesRequest => ({
  type: productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST,
});
const getAllSuccess = (
  payload: ProductStatusesPayload
): FetchProductStatusesSuccess => ({
  type: productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchProductStatusesFailure => ({
  type: productStatusConst.FETCH_PRODUCTSTATUSES_FAILURE,
});

//GET:/ID
const get = (
  payload: ProductStatusRequestPayload
): FetchProductStatusRequest => ({
  type: productStatusConst.FETCH_PRODUCTSTATUS_REQUEST,
  payload,
});
const getSuccess = (
  payload: ProductStatusPayload
): FetchProductStatusSuccess => ({
  type: productStatusConst.FETCH_PRODUCTSTATUS_SUCCESS,
  payload,
});
const getFailure = (): FetchProductStatusFailure => ({
  type: productStatusConst.FETCH_PRODUCTSTATUS_FAILURE,
});

//POST
const create = (payload: ProductStatusPayload): CreateProductStatusRequest => ({
  type: productStatusConst.CREATE_PRODUCTSTATUS_REQUEST,
  payload,
});
const createSuccess = (
  payload: ProductStatusPayload
): CreateProductStatusSuccess => ({
  type: productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS,
  payload,
});
const createFailure = (): CreateProductStatusFailure => ({
  type: productStatusConst.CREATE_PRODUCTSTATUS_FAILURE,
});

//POST RANGE
const createRange = (
  payload: ProductStatusesPayload
): CreateRangeProductStatusRequest => ({
  type: productStatusConst.CREATE_RANGE_PRODUCTSTATUS_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: ProductStatusesPayload
): CreateRangeProductStatusSuccess => ({
  type: productStatusConst.CREATE_RANGE_PRODUCTSTATUS_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeProductStatusFailure => ({
  type: productStatusConst.CREATE_RANGE_PRODUCTSTATUS_FAILURE,
});

//PUT
const update = (payload: ProductStatusPayload): UpdateProductStatusRequest => ({
  type: productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST,
  payload,
});
const updateSuccess = (
  payload: ProductStatusPayload
): UpdateProductStatusSuccess => ({
  type: productStatusConst.UPDATE_PRODUCTSTATUS_SUCCESS,
  payload,
});
const updateFailure = (): UpdateProductStatusFailure => ({
  type: productStatusConst.UPDATE_PRODUCTSTATUS_FAILURE,
});

//REMOVE
const remove = (
  payload: ProductStatusRemovePayload
): RemoveProductStatusRequest => ({
  type: productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST,
  payload,
});
const removeSuccess = (
  payload: ProductStatusRemovePayload
): RemoveProductStatusSuccess => ({
  type: productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS,
  payload,
});
const removeFailure = (): RemoveProductStatusFailure => ({
  type: productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: ProductStatusRemoveRangePayload
): RemoveRangeProductStatusRequest => ({
  type: productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: ProductStatusRemoveRangePayload
): RemoveRangeProductStatusSuccess => ({
  type: productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeProductStatusFailure => ({
  type: productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_FAILURE,
});

//CLIENT ACTIONS
const setProductStatus = (
  payload: IProductStatus | null
): SetProductStatus => ({
  type: productStatusConst.SET_PRODUCTSTATUS,
  payload,
});
const clearProductStatus = (): ClearProductStatus => ({
  type: productStatusConst.CLEAR_PRODUCTSTATUS,
});
const setProductStatuses = (payload: IProductStatus[]): SetProductStatuses => ({
  type: productStatusConst.SET_PRODUCTSTATUSES,
  payload,
});
const clearProductStatuses = (): ClearProductStatuses => ({
  type: productStatusConst.CLEAR_PRODUCTSTATUSES,
});

export const productStatusActions = {
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
  setProductStatus,
  clearProductStatus,
  setProductStatuses,
  clearProductStatuses,
};
