import { assetProductConst } from "./constant";
import { AssetProductActions, AssetProductState } from "./type";

const initialState: AssetProductState = {
  assetProduct: null,
  assetProducts: [],
};

export default (state = initialState, action: AssetProductActions) => {
  switch (action.type) {
    case assetProductConst.FETCH_ASSETPRODUCTS_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.FETCH_ASSETPRODUCTS_SUCCESS:
      return {
        ...state,
        assetProducts: action.payload.assetProducts,
      };
    case assetProductConst.FETCH_ASSETPRODUCTS_FAILURE:
      return {
        ...state,
        assetProducts: [],
      };
    case assetProductConst.FETCH_ASSETPRODUCT_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.FETCH_ASSETPRODUCT_SUCCESS:
      return {
        ...state,
        assetProduct: action.payload.assetProduct,
      };
    case assetProductConst.FETCH_ASSETPRODUCT_FAILURE:
      return {
        ...state,
        assetProduct: null,
      };
    case assetProductConst.CREATE_ASSETPRODUCT_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.CREATE_ASSETPRODUCT_SUCCESS:
      return {
        ...state,
        assetProducts: [...state.assetProducts, action.payload.assetProduct],
      };
    case assetProductConst.CREATE_ASSETPRODUCT_FAILURE:
      return {
        ...state,
      };
    case assetProductConst.CREATE_RANGE_ASSETPRODUCT_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.CREATE_RANGE_ASSETPRODUCT_SUCCESS:
      return {
        ...state,
        assetProducts: [
          ...state.assetProducts,
          ...action.payload.assetProducts,
        ],
      };
    case assetProductConst.CREATE_RANGE_ASSETPRODUCT_FAILURE:
      return {
        ...state,
      };
    case assetProductConst.UPDATE_ASSETPRODUCT_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.UPDATE_ASSETPRODUCT_SUCCESS:
      return {
        ...state,
        assetProducts: state.assetProducts.map((assetProduct) =>
          assetProduct.id === action.payload.assetProduct.id
            ? action.payload.assetProduct
            : assetProduct
        ),
      };
    case assetProductConst.UPDATE_ASSETPRODUCT_FAILURE:
      return {
        ...state,
      };
    case assetProductConst.REMOVE_ASSETPRODUCT_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.REMOVE_ASSETPRODUCT_SUCCESS:
      return {
        ...state,
        assetProducts: state.assetProducts.filter(
          (assetProduct) => assetProduct.id !== action.payload.id
        ),
      };
    case assetProductConst.REMOVE_ASSETPRODUCT_FAILURE:
      return {
        ...state,
      };
    case assetProductConst.REMOVE_RANGE_ASSETPRODUCT_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.REMOVE_RANGE_ASSETPRODUCT_SUCCESS:
      return {
        ...state,
        assetProducts: state.assetProducts.filter(
          (assetProduct) => !action.payload.ids.includes(assetProduct.id)
        ),
      };
    case assetProductConst.REMOVE_RANGE_ASSETPRODUCT_FAILURE:
      return {
        ...state,
      };
    case assetProductConst.FILTER_ASSETPRODUCTS_REQUEST:
      return {
        ...state,
      };
    case assetProductConst.FILTER_ASSETPRODUCTS_SUCCESS:
      return {
        ...state,
        assetProducts: action.payload.assetProducts,
      };
    case assetProductConst.FILTER_ASSETPRODUCTS_FAILURE:
      return {
        ...state,
        assetProducts: [],
      };
    case assetProductConst.SET_ASSETPRODUCT:
      return {
        ...state,
        assetProduct: action.payload,
      };
    case assetProductConst.CLEAR_ASSETPRODUCT:
      return {
        ...state,
        assetProduct: null,
      };
    case assetProductConst.SET_ASSETPRODUCTS:
      return {
        ...state,
        assetProducts: action.payload,
      };
    case assetProductConst.CLEAR_ASSETPRODUCTS:
      return {
        ...state,
        assetProducts: [],
      };
    default:
      return { ...state };
  }
};
