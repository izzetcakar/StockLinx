import { userProductConst } from "./constant";
import { UserProductActions, UserProductState } from "./type";

const initialState: UserProductState = {
  userProduct: null,
  userProducts: [],
};

export default (state = initialState, action: UserProductActions) => {
  switch (action.type) {
    case userProductConst.FETCH_USERPRODUCTS_REQUEST:
      return {
        ...state,
      };
    case userProductConst.FETCH_USERPRODUCTS_SUCCESS:
      return {
        ...state,
        userProducts: action.payload.userProducts,
      };
    case userProductConst.FETCH_USERPRODUCTS_FAILURE:
      return {
        ...state,
        userProducts: [],
      };
    case userProductConst.FETCH_USERPRODUCT_REQUEST:
      return {
        ...state,
      };
    case userProductConst.FETCH_USERPRODUCT_SUCCESS:
      return {
        ...state,
        userProduct: action.payload.userProduct,
      };
    case userProductConst.FETCH_USERPRODUCT_FAILURE:
      return {
        ...state,
        userProduct: null,
      };
    case userProductConst.CREATE_USERPRODUCT_REQUEST:
      return {
        ...state,
      };
    case userProductConst.CREATE_USERPRODUCT_SUCCESS:
      return {
        ...state,
        userProducts: [
          ...state.userProducts,
          action.payload.userProduct,
        ],
      };
    case userProductConst.CREATE_USERPRODUCT_FAILURE:
      return {
        ...state,
      };
    case userProductConst.CREATE_RANGE_USERPRODUCT_REQUEST:
      return {
        ...state,
      };
    case userProductConst.CREATE_RANGE_USERPRODUCT_SUCCESS:
      return {
        ...state,
        userProducts: [
          ...state.userProducts,
          ...action.payload.userProducts,
        ],
      };
    case userProductConst.CREATE_RANGE_USERPRODUCT_FAILURE:
      return {
        ...state,
      };
    case userProductConst.UPDATE_USERPRODUCT_REQUEST:
      return {
        ...state,
      };
    case userProductConst.UPDATE_USERPRODUCT_SUCCESS:
      return {
        ...state,
        userProducts: state.userProducts.map((userProduct) =>
          userProduct.id === action.payload.userProduct.id
            ? action.payload.userProduct
            : userProduct
        ),
      };
    case userProductConst.UPDATE_USERPRODUCT_FAILURE:
      return {
        ...state,
      };
    case userProductConst.REMOVE_USERPRODUCT_REQUEST:
      return {
        ...state,
      };
    case userProductConst.REMOVE_USERPRODUCT_SUCCESS:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (userProduct) => userProduct.id !== action.payload.id
        ),
      };
    case userProductConst.REMOVE_USERPRODUCT_FAILURE:
      return {
        ...state,
      };
    case userProductConst.REMOVE_RANGE_USERPRODUCT_REQUEST:
      return {
        ...state,
      };
    case userProductConst.REMOVE_RANGE_USERPRODUCT_SUCCESS:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (userProduct) => !action.payload.ids.includes(userProduct.id)
        ),
      };
    case userProductConst.REMOVE_RANGE_USERPRODUCT_FAILURE:
      return {
        ...state,
      };
    case userProductConst.SET_USERPRODUCT:
      return {
        ...state,
        userProduct: action.payload,
      };
    case userProductConst.CLEAR_USERPRODUCT:
      return {
        ...state,
        userProduct: null,
      };
    case userProductConst.SET_USERPRODUCTS:
      return {
        ...state,
        userProducts: action.payload,
      };
    case userProductConst.CLEAR_USERPRODUCTS:
      return {
        ...state,
        userProducts: [],
      };
    default:
      return { ...state };
  }
};
