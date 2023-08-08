import { productStatusConst } from "./constant";
import { ProductStatusActions, ProductStatusState } from "./type";

const initialState: ProductStatusState = {
  productStatus: null,
  productStatuses: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: ProductStatusActions) => {
  switch (action.type) {
    case productStatusConst.FETCH_PRODUCTSTATUSES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case productStatusConst.FETCH_PRODUCTSTATUSES_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        productStatuses: action.payload.productStatuses,
        selectData: action.payload.productStatuses.map((productStatus) => ({
          value: productStatus.id as string,
          label: productStatus.name,
        })),
      };
    case productStatusConst.FETCH_PRODUCTSTATUSES_FAILURE:
      return {
        ...state,
        pending: false,
        productStatuses: [],
        error: action.payload.error,
      };
    case productStatusConst.FETCH_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case productStatusConst.FETCH_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        productStatus: action.payload.productStatus,
      };
    case productStatusConst.FETCH_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
        pending: false,
        productStatus: null,
        error: action.payload.error,
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case productStatusConst.UPDATE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case productStatusConst.UPDATE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case productStatusConst.UPDATE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case productStatusConst.SET_PRODUCTSTATUS:
      return {
        ...state,
        productStatus: action.payload,
      };
    case productStatusConst.CLEAR_PRODUCTSTATUS:
      return {
        ...state,
        productStatus: null,
      };
    case productStatusConst.SET_PRODUCTSTATUSES:
      return {
        ...state,
        productStatuses: action.payload,
      };
    case productStatusConst.CLEAR_PRODUCTSTATUSES:
      return {
        ...state,
        productStatuses: [],
      };
    default:
      return { ...state };
  }
};
