import { IProductStatus } from "../../interfaces/interfaces";
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
  ProductStatusesSucccessPayload,
  FetchProductStatusesSuccess,
  FetchProductStatusFailure,
  ProductStatusFailurePayload,
  FetchProductStatusRequest,
  FetchProductStatusSuccess,
  UpdateProductStatusFailure,
  UpdateProductStatusRequest,
  UpdateProductStatusSuccess,
  ProductStatusRequestPayload,
  UpdateProductStatusRequestPayload,
  ProductStatusSucccessPayload,
  SetProductStatus,
  SetProductStatuses,
  ClearProductStatus,
  ClearProductStatuses,
} from "./type";

//GET
const getAll = (): FetchProductStatusesRequest => ({
  type: productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST,
});
const getAllSuccess = (
  payload: ProductStatusesSucccessPayload
): FetchProductStatusesSuccess => ({
  type: productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: ProductStatusFailurePayload
): FetchProductStatusesFailure => ({
  type: productStatusConst.FETCH_PRODUCTSTATUSES_FAILURE,
  payload,
});

//GET:/ID
const get = (
  payload: ProductStatusRequestPayload
): FetchProductStatusRequest => ({
  type: productStatusConst.FETCH_PRODUCTSTATUS_REQUEST,
  payload,
});
const getSuccess = (
  payload: ProductStatusSucccessPayload
): FetchProductStatusSuccess => ({
  type: productStatusConst.FETCH_PRODUCTSTATUS_SUCCESS,
  payload,
});
const getFailure = (
  payload: ProductStatusFailurePayload
): FetchProductStatusFailure => ({
  type: productStatusConst.FETCH_PRODUCTSTATUS_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateProductStatusRequestPayload
): CreateProductStatusRequest => ({
  type: productStatusConst.CREATE_PRODUCTSTATUS_REQUEST,
  payload,
});
const createSuccess = (): CreateProductStatusSuccess => ({
  type: productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS,
});
const createFailure = (
  payload: ProductStatusFailurePayload
): CreateProductStatusFailure => ({
  type: productStatusConst.CREATE_PRODUCTSTATUS_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateProductStatusRequestPayload
): UpdateProductStatusRequest => ({
  type: productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST,
  payload,
});
const updateSuccess = (): UpdateProductStatusSuccess => ({
  type: productStatusConst.UPDATE_PRODUCTSTATUS_SUCCESS,
});
const updateFailure = (
  payload: ProductStatusFailurePayload
): UpdateProductStatusFailure => ({
  type: productStatusConst.UPDATE_PRODUCTSTATUS_FAILURE,
  payload,
});

//REMOVE
const remove = (
  payload: ProductStatusRequestPayload
): RemoveProductStatusRequest => ({
  type: productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST,
  payload,
});
const removeSuccess = (): RemoveProductStatusSuccess => ({
  type: productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS,
});
const removeFailure = (
  payload: ProductStatusFailurePayload
): RemoveProductStatusFailure => ({
  type: productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setProductStatus,
  clearProductStatus,
  setProductStatuses,
  clearProductStatuses,
};