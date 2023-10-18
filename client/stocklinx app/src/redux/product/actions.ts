import { productConst } from "./constant";
import {
  FetchProductCountsFailure,
  FetchProductCountsRequest,
  FetchProductCountsSuccess,
  FetchProductStatusCountsFailure,
  FetchProductStatusCountsRequest,
  FetchProductStatusCountsSuccess,
  ProductCountsSucccessPayload,
  ProductStatusCountsSucccessPayload,
} from "./type";

//GET PRODUCT COUNTS
const getCounts = (): FetchProductCountsRequest => ({
  type: productConst.FETCH_PRODUCT_COUNTS_REQUEST,
});
const getCountsSuccess = (
  payload: ProductCountsSucccessPayload
): FetchProductCountsSuccess => ({
  type: productConst.FETCH_PRODUCT_COUNTS_SUCCESS,
  payload,
});
const getCountsFailure = (): FetchProductCountsFailure => ({
  type: productConst.FETCH_PRODUCT_COUNTS_FAILURE,
});
//GET PRODUCT STATUS COUNTS
const getStatusCounts = (): FetchProductStatusCountsRequest => ({
  type: productConst.FETCH_PRODUCT_STATUS_COUNTS_REQUEST,
});
const getStatusCountsSuccess = (
  payload: ProductStatusCountsSucccessPayload
): FetchProductStatusCountsSuccess => ({
  type: productConst.FETCH_PRODUCT_STATUS_COUNTS_SUCCESS,
  payload,
});
const getStatusCountsFailure = (): FetchProductStatusCountsFailure => ({
  type: productConst.FETCH_PRODUCT_STATUS_COUNTS_FAILURE,
});

export const productActions = {
  getCounts,
  getCountsSuccess,
  getCountsFailure,
  getStatusCounts,
  getStatusCountsSuccess,
  getStatusCountsFailure,
};
