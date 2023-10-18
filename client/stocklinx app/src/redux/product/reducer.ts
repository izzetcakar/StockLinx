import { productConst } from "./constant";
import { ProductActions, ProductState } from "./type";

const initialState: ProductState = {
  counts: [],
  statusCounts: [],
};

export default (state = initialState, action: ProductActions) => {
  switch (action.type) {
    case productConst.FETCH_PRODUCT_COUNTS_REQUEST:
      return {
        ...state,
      };
    case productConst.FETCH_PRODUCT_COUNTS_SUCCESS:
      return {
        ...state,
        counts: action.payload.counts,
      };
    case productConst.FETCH_PRODUCT_COUNTS_FAILURE:
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
        statusCounts: action.payload.statusCounts,
      };
    case productConst.FETCH_PRODUCT_STATUS_COUNTS_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
