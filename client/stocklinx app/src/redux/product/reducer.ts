import { productConst } from "./constant";
import { ProductActions, ProductState } from "./type";

const initialState: ProductState = {
  entityCounts: [],
  productStatusCounts: [],
  productLocationCounts: [],
  productCategoryCounts: [],
};

export default (state = initialState, action: ProductActions) => {
  switch (action.type) {
    case productConst.FETCH_ENTITY_COUNTS_REQUEST:
      return {
        ...state,
      };
    case productConst.FETCH_ENTITY_COUNTS_SUCCESS:
      return {
        ...state,
        entityCounts: action.payload.entityCounts,
      };
    case productConst.FETCH_ENTITY_COUNTS_FAILURE:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_STATUS_COUNTS_REQUEST:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_STATUS_COUNTS_SUCCESS:
      return {
        ...state,
        productStatusCounts: action.payload.productStatusCounts,
      };
    case productConst.FETCH_PRODUCT_STATUS_COUNTS_FAILURE:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_LOCATION_COUNTS_REQUEST:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_LOCATION_COUNTS_SUCCESS:
      return {
        ...state,
        productLocationCounts: action.payload.productLocationCounts,
      };
    case productConst.FETCH_PRODUCT_LOCATION_COUNTS_FAILURE:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_CATEGORY_COUNTS_REQUEST:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_CATEGORY_COUNTS_SUCCESS:
      return {
        ...state,
        productCategoryCounts: action.payload.productCategoryCounts,
      };
    case productConst.FETCH_PRODUCT_CATEGORY_COUNTS_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
