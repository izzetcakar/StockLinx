import { IProductStatus, SelectData } from "../../interfaces/interfaces";
import { productStatusConst } from "./constant";

export interface ProductStatusState {
  productStatus: IProductStatus | null;
  productStatuses: IProductStatus[];
  selectData: SelectData[];
}
export interface ProductStatusRequestPayload {
  id: string;
}
export interface ProductStatusPayload {
  productStatus: IProductStatus;
}
export interface ProductStatusesPayload {
  productStatuses: IProductStatus[];
}
export interface ProductStatusRemoveRangePayload {
  ids: string[];
}
export interface ProductStatusRemovePayload {
  id: string;
}

//GET
export interface FetchProductStatusesRequest {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST;
}
export type FetchProductStatusesSuccess = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS;
  payload: ProductStatusesPayload;
};
export type FetchProductStatusesFailure = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_FAILURE;
};
//GET:/ID
export interface FetchProductStatusRequest {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusRequestPayload;
}
export type FetchProductStatusSuccess = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusPayload;
};
export type FetchProductStatusFailure = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_FAILURE;
};
//POST
export interface CreateProductStatusRequest {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusPayload;
}
export type CreateProductStatusSuccess = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS;
};
export type CreateProductStatusFailure = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_FAILURE;
};
//POST RANGE
export interface CreateRangeProductStatusRequest {
  type: typeof productStatusConst.CREATE_RANGE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusesPayload;
}
export type CreateRangeProductStatusSuccess = {
  type: typeof productStatusConst.CREATE_RANGE_PRODUCTSTATUS_SUCCESS;
};
export type CreateRangeProductStatusFailure = {
  type: typeof productStatusConst.CREATE_RANGE_PRODUCTSTATUS_FAILURE;
};
//PUT
export interface UpdateProductStatusRequest {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusPayload;
}
export type UpdateProductStatusSuccess = {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_SUCCESS;
};
export type UpdateProductStatusFailure = {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_FAILURE;
};
//REMOVE
export interface RemoveProductStatusRequest {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusRemovePayload;
}
export type RemoveProductStatusSuccess = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusRemovePayload;
};
export type RemoveProductStatusFailure = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeProductStatusRequest {
  type: typeof productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_REQUEST;
  payload: ProductStatusRemoveRangePayload;
}
export type RemoveRangeProductStatusSuccess = {
  type: typeof productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_SUCCESS;
  payload: ProductStatusRemoveRangePayload;
};
export type RemoveRangeProductStatusFailure = {
  type: typeof productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetProductStatus {
  type: typeof productStatusConst.SET_PRODUCTSTATUS;
  payload: IProductStatus | null;
}
export interface SetProductStatuses {
  type: typeof productStatusConst.SET_PRODUCTSTATUSES;
  payload: IProductStatus[];
}
export interface ClearProductStatus {
  type: typeof productStatusConst.CLEAR_PRODUCTSTATUS;
}
export interface ClearProductStatuses {
  type: typeof productStatusConst.CLEAR_PRODUCTSTATUSES;
}

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
