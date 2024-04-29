import { IUserProduct } from "../../interfaces/serverInterfaces";
import { userProductConst } from "./constant";

export type UserProductState = {
  userProduct: IUserProduct | null;
  userProducts: IUserProduct[];
};
export type UserProductRequestPayload = {
  id: string;
};
export type UserProductPayload = {
  userProduct: IUserProduct;
};
export type UserProductsPayload = {
  userProducts: IUserProduct[];
};
export type UserProductRemoveRangePayload = {
  ids: string[];
};
export type UserProductRemovePayload = {
  id: string;
};

//GET
export type FetchUserProductsRequest = {
  type: typeof userProductConst.FETCH_USERPRODUCTS_REQUEST;
};
export type FetchUserProductsSuccess = {
  type: typeof userProductConst.FETCH_USERPRODUCTS_SUCCESS;
  payload: UserProductsPayload;
};
export type FetchUserProductsFailure = {
  type: typeof userProductConst.FETCH_USERPRODUCTS_FAILURE;
};

//GET:/ID
export type FetchUserProductRequest = {
  type: typeof userProductConst.FETCH_USERPRODUCT_REQUEST;
  payload: UserProductRequestPayload;
};
export type FetchUserProductSuccess = {
  type: typeof userProductConst.FETCH_USERPRODUCT_SUCCESS;
  payload: UserProductPayload;
};
export type FetchUserProductFailure = {
  type: typeof userProductConst.FETCH_USERPRODUCT_FAILURE;
};

//POST
export type CreateUserProductRequest = {
  type: typeof userProductConst.CREATE_USERPRODUCT_REQUEST;
  payload: UserProductPayload;
};
export type CreateUserProductSuccess = {
  type: typeof userProductConst.CREATE_USERPRODUCT_SUCCESS;
  payload: UserProductPayload;
};
export type CreateUserProductFailure = {
  type: typeof userProductConst.CREATE_USERPRODUCT_FAILURE;
};

//POST RANGE
export type CreateRangeUserProductRequest = {
  type: typeof userProductConst.CREATE_RANGE_USERPRODUCT_REQUEST;
  payload: UserProductsPayload;
};
export type CreateRangeUserProductSuccess = {
  type: typeof userProductConst.CREATE_RANGE_USERPRODUCT_SUCCESS;
  payload: UserProductsPayload;
};
export type CreateRangeUserProductFailure = {
  type: typeof userProductConst.CREATE_RANGE_USERPRODUCT_FAILURE;
};

//PUT
export type UpdateUserProductRequest = {
  type: typeof userProductConst.UPDATE_USERPRODUCT_REQUEST;
  payload: UserProductPayload;
};
export type UpdateUserProductSuccess = {
  type: typeof userProductConst.UPDATE_USERPRODUCT_SUCCESS;
  payload: UserProductPayload;
};
export type UpdateUserProductFailure = {
  type: typeof userProductConst.UPDATE_USERPRODUCT_FAILURE;
};

//REMOVE
export type RemoveUserProductRequest = {
  type: typeof userProductConst.REMOVE_USERPRODUCT_REQUEST;
  payload: UserProductRemovePayload;
};
export type RemoveUserProductSuccess = {
  type: typeof userProductConst.REMOVE_USERPRODUCT_SUCCESS;
  payload: UserProductRemovePayload;
};
export type RemoveUserProductFailure = {
  type: typeof userProductConst.REMOVE_USERPRODUCT_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeUserProductRequest = {
  type: typeof userProductConst.REMOVE_RANGE_USERPRODUCT_REQUEST;
  payload: UserProductRemoveRangePayload;
};
export type RemoveRangeUserProductSuccess = {
  type: typeof userProductConst.REMOVE_RANGE_USERPRODUCT_SUCCESS;
  payload: UserProductRemoveRangePayload;
};
export type RemoveRangeUserProductFailure = {
  type: typeof userProductConst.REMOVE_RANGE_USERPRODUCT_FAILURE;
};

//CLIENT ACTION TYPES
export type SetUserProduct = {
  type: typeof userProductConst.SET_USERPRODUCT;
  payload: IUserProduct | null;
};
export type SetUserProducts = {
  type: typeof userProductConst.SET_USERPRODUCTS;
  payload: IUserProduct[];
};
export type ClearUserProduct = {
  type: typeof userProductConst.CLEAR_USERPRODUCT;
};
export type ClearUserProducts = {
  type: typeof userProductConst.CLEAR_USERPRODUCTS;
};

export type UserProductActions =
  | FetchUserProductsRequest
  | FetchUserProductsSuccess
  | FetchUserProductsFailure
  | FetchUserProductRequest
  | FetchUserProductSuccess
  | FetchUserProductFailure
  | CreateUserProductRequest
  | CreateUserProductSuccess
  | CreateUserProductFailure
  | CreateRangeUserProductRequest
  | CreateRangeUserProductSuccess
  | CreateRangeUserProductFailure
  | UpdateUserProductRequest
  | UpdateUserProductSuccess
  | UpdateUserProductFailure
  | RemoveUserProductRequest
  | RemoveUserProductSuccess
  | RemoveUserProductFailure
  | RemoveRangeUserProductRequest
  | RemoveRangeUserProductSuccess
  | RemoveRangeUserProductFailure
  | SetUserProduct
  | SetUserProducts
  | ClearUserProduct
  | ClearUserProducts;
