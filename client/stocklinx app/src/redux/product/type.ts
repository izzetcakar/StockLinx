import { IProductCount, IProductStausCount } from "../../interfaces/interfaces";
import { productConst } from "./constant";

export interface ProductState {
  counts: IProductCount[];
  statusCounts: IProductStausCount[];
}

export interface ProductCountsSucccessPayload {
  counts: IProductCount[];
}
export interface ProductStatusCountsSucccessPayload {
  statusCounts: IProductStausCount[];
}

//GET COUNTS
export interface FetchProductCountsRequest {
  type: typeof productConst.FETCH_PRODUCT_COUNTS_REQUEST;
}
export type FetchProductCountsSuccess = {
  type: typeof productConst.FETCH_PRODUCT_COUNTS_SUCCESS;
  payload: ProductCountsSucccessPayload;
};
export type FetchProductCountsFailure = {
  type: typeof productConst.FETCH_PRODUCT_COUNTS_FAILURE;
};
//GET STATUS COUNTS
export interface FetchProductStatusCountsRequest {
  type: typeof productConst.FETCH_PRODUCT_STATUS_COUNTS_REQUEST;
}
export type FetchProductStatusCountsSuccess = {
  type: typeof productConst.FETCH_PRODUCT_STATUS_COUNTS_SUCCESS;
  payload: ProductStatusCountsSucccessPayload;
};
export type FetchProductStatusCountsFailure = {
  type: typeof productConst.FETCH_PRODUCT_STATUS_COUNTS_FAILURE;
};

export type ProductActions =
  | FetchProductCountsRequest
  | FetchProductCountsSuccess
  | FetchProductCountsFailure
  | FetchProductStatusCountsRequest
  | FetchProductStatusCountsSuccess
  | FetchProductStatusCountsFailure;
