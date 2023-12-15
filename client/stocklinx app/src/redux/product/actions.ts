import { productConst } from "./constant";
import {
  CustomLogsSucccessPayload,
  EntityCountsSucccessPayload,
  FetchCustomLogsFailure,
  FetchCustomLogsRequest,
  FetchCustomLogsSuccess,
  FetchEntityCountsFailure,
  FetchEntityCountsRequest,
  FetchEntityCountsSuccess,
  FetchProductCategoryCountsFailure,
  FetchProductCategoryCountsRequest,
  FetchProductCategoryCountsSuccess,
  FetchProductLocationCountsFailure,
  FetchProductLocationCountsRequest,
  FetchProductLocationCountsSuccess,
  FetchProductStatusCountsFailure,
  FetchProductStatusCountsRequest,
  FetchProductStatusCountsSuccess,
  ProductCategoryCountsSucccessPayload,
  ProductLocationCountsSucccessPayload,
  ProductStatusCountsSucccessPayload,
} from "./type";

//GET ENTITY COUNTS
const getEntityCounts = (): FetchEntityCountsRequest => ({
  type: productConst.FETCH_ENTITY_COUNTS_REQUEST,
});
const getEntityCountsSuccess = (
  payload: EntityCountsSucccessPayload
): FetchEntityCountsSuccess => ({
  type: productConst.FETCH_ENTITY_COUNTS_SUCCESS,
  payload,
});
const getEntityCountsFailure = (): FetchEntityCountsFailure => ({
  type: productConst.FETCH_ENTITY_COUNTS_FAILURE,
});

//GET PRODUCT STATUS COUNTS
const getProductStatusCounts = (): FetchProductStatusCountsRequest => ({
  type: productConst.FETCH_PRODUCT_STATUS_COUNTS_REQUEST,
});
const getProductStatusCountsSuccess = (
  payload: ProductStatusCountsSucccessPayload
): FetchProductStatusCountsSuccess => ({
  type: productConst.FETCH_PRODUCT_STATUS_COUNTS_SUCCESS,
  payload,
});
const getProductStatusCountsFailure = (): FetchProductStatusCountsFailure => ({
  type: productConst.FETCH_PRODUCT_STATUS_COUNTS_FAILURE,
});

//GET PRODUCT LOCATION COUNTS
const getProductLocationCounts = (): FetchProductLocationCountsRequest => ({
  type: productConst.FETCH_PRODUCT_LOCATION_COUNTS_REQUEST,
});
const getProductLocationCountsSuccess = (
  payload: ProductLocationCountsSucccessPayload
): FetchProductLocationCountsSuccess => ({
  type: productConst.FETCH_PRODUCT_LOCATION_COUNTS_SUCCESS,
  payload,
});
const getProductLocationCountsFailure =
  (): FetchProductLocationCountsFailure => ({
    type: productConst.FETCH_PRODUCT_LOCATION_COUNTS_FAILURE,
  });

//GET PRODUCT CATEGORY COUNTS
const getProductCategoryCounts = (): FetchProductCategoryCountsRequest => ({
  type: productConst.FETCH_PRODUCT_CATEGORY_COUNTS_REQUEST,
});
const getProductCategoryCountsSuccess = (
  payload: ProductCategoryCountsSucccessPayload
): FetchProductCategoryCountsSuccess => ({
  type: productConst.FETCH_PRODUCT_CATEGORY_COUNTS_SUCCESS,
  payload,
});
const getProductCategoryCountsFailure =
  (): FetchProductCategoryCountsFailure => ({
    type: productConst.FETCH_PRODUCT_CATEGORY_COUNTS_FAILURE,
  });

//GET CUSTOM LOGS
const getCustomLogs = (): FetchCustomLogsRequest => ({
  type: productConst.FETCH_CUSTOM_LOGS_REQUEST,
});
const getCustomLogsSuccess = (
  payload: CustomLogsSucccessPayload
): FetchCustomLogsSuccess => ({
  type: productConst.FETCH_CUSTOM_LOGS_SUCCESS,
  payload,
});
const getCustomLogsFailure = (): FetchCustomLogsFailure => ({
  type: productConst.FETCH_CUSTOM_LOGS_FAILURE,
});

export const productActions = {
  getEntityCounts,
  getEntityCountsSuccess,
  getEntityCountsFailure,
  getProductStatusCounts,
  getProductStatusCountsSuccess,
  getProductStatusCountsFailure,
  getProductLocationCounts,
  getProductLocationCountsSuccess,
  getProductLocationCountsFailure,
  getProductCategoryCounts,
  getProductCategoryCountsSuccess,
  getProductCategoryCountsFailure,
  getCustomLogs,
  getCustomLogsSuccess,
  getCustomLogsFailure,
};
