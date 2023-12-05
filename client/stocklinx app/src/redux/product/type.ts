import {
  IEntityCount,
  IProductCategoryCount,
  IProductLocationCount,
  IProductStatusCount,
} from "../../interfaces/interfaces";
import { productConst } from "./constant";

export interface ProductState {
  entityCounts: IEntityCount[];
  productStatusCounts: IProductStatusCount[];
  productLocationCounts: IProductLocationCount[];
  productCategoryCounts: IProductCategoryCount[];
}

export interface EntityCountsSucccessPayload {
  entityCounts: IEntityCount[];
}
export interface ProductStatusCountsSucccessPayload {
  productStatusCounts: IProductStatusCount[];
}
export interface ProductLocationCountsSucccessPayload {
  productLocationCounts: IProductLocationCount[];
}
export interface ProductCategoryCountsSucccessPayload {
  productCategoryCounts: IProductCategoryCount[];
}

//GET ENTITY COUNTS
export interface FetchEntityCountsRequest {
  type: typeof productConst.FETCH_ENTITY_COUNTS_REQUEST;
}
export type FetchEntityCountsSuccess = {
  type: typeof productConst.FETCH_ENTITY_COUNTS_SUCCESS;
  payload: EntityCountsSucccessPayload;
};
export type FetchEntityCountsFailure = {
  type: typeof productConst.FETCH_ENTITY_COUNTS_FAILURE;
};
//GET PRODUCT STATUS COUNTS
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
//GET PRODUCT LOCATION COUNTS
export interface FetchProductLocationCountsRequest {
  type: typeof productConst.FETCH_PRODUCT_LOCATION_COUNTS_REQUEST;
}
export type FetchProductLocationCountsSuccess = {
  type: typeof productConst.FETCH_PRODUCT_LOCATION_COUNTS_SUCCESS;
  payload: ProductLocationCountsSucccessPayload;
};
export type FetchProductLocationCountsFailure = {
  type: typeof productConst.FETCH_PRODUCT_LOCATION_COUNTS_FAILURE;
};
//GET PRODUCT CATEGORY COUNTS
export interface FetchProductCategoryCountsRequest {
  type: typeof productConst.FETCH_PRODUCT_CATEGORY_COUNTS_REQUEST;
}
export type FetchProductCategoryCountsSuccess = {
  type: typeof productConst.FETCH_PRODUCT_CATEGORY_COUNTS_SUCCESS;
  payload: ProductCategoryCountsSucccessPayload;
};
export type FetchProductCategoryCountsFailure = {
  type: typeof productConst.FETCH_PRODUCT_CATEGORY_COUNTS_FAILURE;
};

export type ProductActions =
  | FetchEntityCountsRequest
  | FetchEntityCountsSuccess
  | FetchEntityCountsFailure
  | FetchProductStatusCountsRequest
  | FetchProductStatusCountsSuccess
  | FetchProductStatusCountsFailure
  | FetchProductLocationCountsRequest
  | FetchProductLocationCountsSuccess
  | FetchProductLocationCountsFailure
  | FetchProductCategoryCountsRequest
  | FetchProductCategoryCountsSuccess
  | FetchProductCategoryCountsFailure;
