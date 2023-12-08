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
        productStatuses: [
          ...state.productStatuses,
          action.payload.productStatus,
        ],
      };
    case productStatusConst.CREATE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
      };
    case productStatusConst.CREATE_RANGE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.CREATE_RANGE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        productStatuses: [
          ...state.productStatuses,
          ...action.payload.productStatuses,
        ],
      };
    case productStatusConst.CREATE_RANGE_PRODUCTSTATUS_FAILURE:
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
        productStatuses: state.productStatuses.map((productStatus) =>
          productStatus.id === action.payload.productStatus.id
            ? action.payload.productStatus
            : productStatus
        ),
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
        productStatuses: state.productStatuses.filter(
          (productStatus) => productStatus.id !== action.payload.id
        ),
      };
    case productStatusConst.REMOVE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
      };
    case productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_REQUEST:
      return {
        ...state,
      };
    case productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_SUCCESS:
      return {
        ...state,
        productStatuses: state.productStatuses.filter(
          (productStatus) => !action.payload.ids.includes(productStatus.id)
        ),
      };
    case productStatusConst.REMOVE_RANGE_PRODUCTSTATUS_FAILURE:
      return {
        ...state,
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
