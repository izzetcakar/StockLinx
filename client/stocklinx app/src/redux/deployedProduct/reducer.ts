import { deployedProductConst } from "./constant";
import { DeployedProductActions, DeployedProductState } from "./type";

const initialState: DeployedProductState = {
  deployedProduct: null,
  deployedProducts: [],
};

export default (state = initialState, action: DeployedProductActions) => {
  switch (action.type) {
    case deployedProductConst.FETCH_DEPLOYEDPRODUCTS_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.FETCH_DEPLOYEDPRODUCTS_SUCCESS:
      return {
        ...state,
        deployedProducts: action.payload.deployedProducts,
      };
    case deployedProductConst.FETCH_DEPLOYEDPRODUCTS_FAILURE:
      return {
        ...state,
        deployedProducts: [],
      };
    case deployedProductConst.FETCH_DEPLOYEDPRODUCT_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.FETCH_DEPLOYEDPRODUCT_SUCCESS:
      return {
        ...state,
        deployedProduct: action.payload.deployedProduct,
      };
    case deployedProductConst.FETCH_DEPLOYEDPRODUCT_FAILURE:
      return {
        ...state,
        deployedProduct: null,
      };
    case deployedProductConst.CREATE_DEPLOYEDPRODUCT_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.CREATE_DEPLOYEDPRODUCT_SUCCESS:
      return {
        ...state,
        deployedProducts: [
          ...state.deployedProducts,
          action.payload.deployedProduct,
        ],
      };
    case deployedProductConst.CREATE_DEPLOYEDPRODUCT_FAILURE:
      return {
        ...state,
      };
    case deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_SUCCESS:
      return {
        ...state,
        deployedProducts: [
          ...state.deployedProducts,
          ...action.payload.deployedProducts,
        ],
      };
    case deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_FAILURE:
      return {
        ...state,
      };
    case deployedProductConst.UPDATE_DEPLOYEDPRODUCT_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.UPDATE_DEPLOYEDPRODUCT_SUCCESS:
      return {
        ...state,
        deployedProducts: state.deployedProducts.map((deployedProduct) =>
          deployedProduct.id === action.payload.deployedProduct.id
            ? action.payload.deployedProduct
            : deployedProduct
        ),
      };
    case deployedProductConst.UPDATE_DEPLOYEDPRODUCT_FAILURE:
      return {
        ...state,
      };
    case deployedProductConst.REMOVE_DEPLOYEDPRODUCT_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.REMOVE_DEPLOYEDPRODUCT_SUCCESS:
      return {
        ...state,
        deployedProducts: state.deployedProducts.filter(
          (deployedProduct) => deployedProduct.id !== action.payload.id
        ),
      };
    case deployedProductConst.REMOVE_DEPLOYEDPRODUCT_FAILURE:
      return {
        ...state,
      };
    case deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_REQUEST:
      return {
        ...state,
      };
    case deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_SUCCESS:
      return {
        ...state,
        deployedProducts: state.deployedProducts.filter(
          (deployedProduct) => !action.payload.ids.includes(deployedProduct.id)
        ),
      };
    case deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_FAILURE:
      return {
        ...state,
      };
    case deployedProductConst.SET_DEPLOYEDPRODUCT:
      return {
        ...state,
        deployedProduct: action.payload,
      };
    case deployedProductConst.CLEAR_DEPLOYEDPRODUCT:
      return {
        ...state,
        deployedProduct: null,
      };
    case deployedProductConst.SET_DEPLOYEDPRODUCTS:
      return {
        ...state,
        deployedProducts: action.payload,
      };
    case deployedProductConst.CLEAR_DEPLOYEDPRODUCTS:
      return {
        ...state,
        deployedProducts: [],
      };
    default:
      return { ...state };
  }
};
