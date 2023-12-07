import { IDeployedProduct } from "../../interfaces/interfaces";
import { deployedProductConst } from "./constant";

export interface DeployedProductState {
  deployedProduct: IDeployedProduct | null;
  deployedProducts: IDeployedProduct[];
}
export interface DeployedProductRequestPayload {
  id: string;
}
export interface DeployedProductPayload {
  deployedProduct: IDeployedProduct;
}
export interface DeployedProductsPayload {
  deployedProducts: IDeployedProduct[];
}
export interface DeployedProductRemoveRangePayload {
  ids: string[];
}
export interface DeployedProductRemovePayload {
  id: string;
}

//GET
export interface FetchDeployedProductsRequest {
  type: typeof deployedProductConst.FETCH_DEPLOYEDPRODUCTS_REQUEST;
}
export type FetchDeployedProductsSuccess = {
  type: typeof deployedProductConst.FETCH_DEPLOYEDPRODUCTS_SUCCESS;
  payload: DeployedProductsPayload;
};
export type FetchDeployedProductsFailure = {
  type: typeof deployedProductConst.FETCH_DEPLOYEDPRODUCTS_FAILURE;
};
//GET:/ID
export interface FetchDeployedProductRequest {
  type: typeof deployedProductConst.FETCH_DEPLOYEDPRODUCT_REQUEST;
  payload: DeployedProductRequestPayload;
}
export type FetchDeployedProductSuccess = {
  type: typeof deployedProductConst.FETCH_DEPLOYEDPRODUCT_SUCCESS;
  payload: DeployedProductPayload;
};
export type FetchDeployedProductFailure = {
  type: typeof deployedProductConst.FETCH_DEPLOYEDPRODUCT_FAILURE;
};
//POST
export interface CreateDeployedProductRequest {
  type: typeof deployedProductConst.CREATE_DEPLOYEDPRODUCT_REQUEST;
  payload: DeployedProductPayload;
}
export type CreateDeployedProductSuccess = {
  type: typeof deployedProductConst.CREATE_DEPLOYEDPRODUCT_SUCCESS;
  payload: DeployedProductPayload;
};
export type CreateDeployedProductFailure = {
  type: typeof deployedProductConst.CREATE_DEPLOYEDPRODUCT_FAILURE;
};
//POST RANGE
export interface CreateRangeDeployedProductRequest {
  type: typeof deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_REQUEST;
  payload: DeployedProductsPayload;
}
export type CreateRangeDeployedProductSuccess = {
  type: typeof deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_SUCCESS;
  payload: DeployedProductsPayload;
};
export type CreateRangeDeployedProductFailure = {
  type: typeof deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_FAILURE;
};
//PUT
export interface UpdateDeployedProductRequest {
  type: typeof deployedProductConst.UPDATE_DEPLOYEDPRODUCT_REQUEST;
  payload: DeployedProductPayload;
}
export type UpdateDeployedProductSuccess = {
  type: typeof deployedProductConst.UPDATE_DEPLOYEDPRODUCT_SUCCESS;
};
export type UpdateDeployedProductFailure = {
  type: typeof deployedProductConst.UPDATE_DEPLOYEDPRODUCT_FAILURE;
};
//REMOVE
export interface RemoveDeployedProductRequest {
  type: typeof deployedProductConst.REMOVE_DEPLOYEDPRODUCT_REQUEST;
  payload: DeployedProductRemovePayload;
}
export type RemoveDeployedProductSuccess = {
  type: typeof deployedProductConst.REMOVE_DEPLOYEDPRODUCT_SUCCESS;
  payload: DeployedProductRemovePayload;
};
export type RemoveDeployedProductFailure = {
  type: typeof deployedProductConst.REMOVE_DEPLOYEDPRODUCT_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeDeployedProductRequest {
  type: typeof deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_REQUEST;
  payload: DeployedProductRemoveRangePayload;
}
export type RemoveRangeDeployedProductSuccess = {
  type: typeof deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_SUCCESS;
  payload: DeployedProductRemoveRangePayload;
};
export type RemoveRangeDeployedProductFailure = {
  type: typeof deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetDeployedProduct {
  type: typeof deployedProductConst.SET_DEPLOYEDPRODUCT;
  payload: IDeployedProduct | null;
}
export interface SetDeployedProducts {
  type: typeof deployedProductConst.SET_DEPLOYEDPRODUCTS;
  payload: IDeployedProduct[];
}
export interface ClearDeployedProduct {
  type: typeof deployedProductConst.CLEAR_DEPLOYEDPRODUCT;
}
export interface ClearDeployedProducts {
  type: typeof deployedProductConst.CLEAR_DEPLOYEDPRODUCTS;
}

export type DeployedProductActions =
  | FetchDeployedProductsRequest
  | FetchDeployedProductsSuccess
  | FetchDeployedProductsFailure
  | FetchDeployedProductRequest
  | FetchDeployedProductSuccess
  | FetchDeployedProductFailure
  | CreateDeployedProductRequest
  | CreateDeployedProductSuccess
  | CreateDeployedProductFailure
  | CreateRangeDeployedProductRequest
  | CreateRangeDeployedProductSuccess
  | CreateRangeDeployedProductFailure
  | UpdateDeployedProductRequest
  | UpdateDeployedProductSuccess
  | UpdateDeployedProductFailure
  | RemoveDeployedProductRequest
  | RemoveDeployedProductSuccess
  | RemoveDeployedProductFailure
  | RemoveRangeDeployedProductRequest
  | RemoveRangeDeployedProductSuccess
  | RemoveRangeDeployedProductFailure
  | SetDeployedProduct
  | SetDeployedProducts
  | ClearDeployedProduct
  | ClearDeployedProducts;
