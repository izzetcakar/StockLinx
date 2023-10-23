import { IProductStatus } from "../../interfaces/interfaces";
import { productStatusConst } from "./constant";

export interface ProductStatusState {
  productStatus: IProductStatus | null;
  productStatuses: IProductStatus[];
}

export interface ProductStatusSucccessPayload {
  productStatus: IProductStatus;
}
export interface ProductStatusesSucccessPayload {
  productStatuses: IProductStatus[];
}
export interface ProductStatusRequestPayload {
  id: string;
}
export interface UpdateProductStatusRequestPayload {
  productStatus: IProductStatus;
}

//GET
export interface FetchProductStatusesRequest {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST;
}
export type FetchProductStatusesSuccess = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS;
  payload: ProductStatusesSucccessPayload;
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
  payload: ProductStatusSucccessPayload;
};
export type FetchProductStatusFailure = {
  type: typeof productStatusConst.FETCH_PRODUCTSTATUS_FAILURE;
};
//POST
export interface CreateProductStatusRequest {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_REQUEST;
  payload: UpdateProductStatusRequestPayload;
}
export type CreateProductStatusSuccess = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS;
};
export type CreateProductStatusFailure = {
  type: typeof productStatusConst.CREATE_PRODUCTSTATUS_FAILURE;
};
//PUT
export interface UpdateProductStatusRequest {
  type: typeof productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST;
  payload: UpdateProductStatusRequestPayload;
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
  payload: ProductStatusRequestPayload;
}
export type RemoveProductStatusSuccess = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS;
};
export type RemoveProductStatusFailure = {
  type: typeof productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE;
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
  | UpdateProductStatusRequest
  | UpdateProductStatusSuccess
  | UpdateProductStatusFailure
  | RemoveProductStatusRequest
  | RemoveProductStatusSuccess
  | RemoveProductStatusFailure;
