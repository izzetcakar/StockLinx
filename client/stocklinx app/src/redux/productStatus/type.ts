import { IProductStatus } from "../../interfaces/serverInterfaces";
import { productStatusConst } from "./constant";

export type ProductStatusState = {
  productStatus: IProductStatus | null;
  productStatuses: IProductStatus[];
};
export type ProductStatusRequestPayload = {
  id: string;
};
export type ProductStatusPayload = {
  productStatus: IProductStatus;
};
export type ProductStatusesPayload = {
  productStatuses: IProductStatus[];
};
export type ProductStatusRemoveRangePayload = {
  ids: string[];
};
export type ProductStatusRemovePayload = {
  id: string;
};

//GET
export type FetchProductStatusesRequest = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST;
};
export type FetchProductStatusesSuccess = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS;
  payload: ProductStatusesPayload;
};
export type FetchProductStatusesFailure = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_FAILURE;
};
//GET:/ID
export type FetchProductStatusRequest = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusRequestPayload;
};
export type FetchProductStatusSuccess = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusPayload;
};
export type FetchProductStatusFailure = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_FAILURE;
};
//POST
export type CreateProductStatusRequest = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusPayload;
};
export type CreateProductStatusSuccess = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusPayload;
};
export type CreateProductStatusFailure = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_FAILURE;
};
//POST RANGE
export type CreateRangeProductStatusRequest = {
  type: typeof productStatusConst.CREATE_RANGE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusesPayload;
};
export type CreateRangeProductStatusSuccess = {
  type: typeof productStatusConst.CREATE_RANGE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusesPayload;
};
export type CreateRangeProductStatusFailure = {
  type: typeof productStatusConst.CREATE_RANGE_PRODUCTSTATUS_FAILURE;
};
//PUT
export type UpdateProductStatusRequest = {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusPayload;
};
export type UpdateProductStatusSuccess = {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusPayload;
};
export type UpdateProductStatusFailure = {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_FAILURE;
};
//REMOVE
export type RemoveProductStatusRequest = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusRemovePayload;
};
export type RemoveProductStatusSuccess = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusRemovePayload;
};
export type RemoveProductStatusFailure = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeProductStatusRequest = {
  type: typeof productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusRemoveRangePayload;
};
export type RemoveRangeProductStatusSuccess = {
  type: typeof productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusRemoveRangePayload;
};
export type RemoveRangeProductStatusFailure = {
  type: typeof productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_FAILURE;
};

//CLIENT ACTION TYPES
export type SetProductStatus = {
  type: typeof productStatusConst.SET_PRODUCTSTATUS;
  payload: IProductStatus | null;
};
export type SetProductStatuses = {
  type: typeof productStatusConst.SET_PRODUCTSTATUSES;
  payload: IProductStatus[];
};
export type ClearProductStatus = {
  type: typeof productStatusConst.CLEAR_PRODUCTSTATUS;
};
export type ClearProductStatuses = {
  type: typeof productStatusConst.CLEAR_PRODUCTSTATUSES;
};

export type ProductStatusActions =
  | FetchProductStatusesRequest
  | FetchProductStatusesSuccess
  | FetchProductStatusesFailure
  | FetchProductStatusRequest
  | FetchProductStatusSuccess
  | FetchProductStatusFailure
  | CreateProductStatusRequest
  | CreateProductStatusSuccess
  | CreateProductStatusFailure
  | CreateRangeProductStatusRequest
  | CreateRangeProductStatusSuccess
  | CreateRangeProductStatusFailure
  | UpdateProductStatusRequest
  | UpdateProductStatusSuccess
  | UpdateProductStatusFailure
  | RemoveProductStatusRequest
  | RemoveProductStatusSuccess
  | RemoveProductStatusFailure
  | RemoveRangeProductStatusRequest
  | RemoveRangeProductStatusSuccess
  | RemoveRangeProductStatusFailure
  | SetProductStatus
  | SetProductStatuses
  | ClearProductStatus
  | ClearProductStatuses;
