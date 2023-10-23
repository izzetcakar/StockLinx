import { productStatusConst } from "./constant";
import { ProductStatusActions, ProductStatusState } from "./type";

const initialState: ProductStatusState = {
  productStatus: null,
  productStatuses: [],
};

export default (state = initialState, action: ProductStatusActions) => {
  switch (action.type) {
    case productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS:
      return {
        ...state,
        productStatuses: action.payload.productStatuses,
      };
    case productStatusConst.FETCH_PRODUCTSTATUSES_FAILURE:
      return {
        ...state,
        productStatuses: [],
      };
    case productStatusConst.FETCH_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.FETCH_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        productStatus: action.payload.productStatus,
      };
    case productStatusConst.FETCH_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
        productStatus: null,
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
      };
    case productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.UPDATE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
      };
    case productStatusConst.UPDATE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
