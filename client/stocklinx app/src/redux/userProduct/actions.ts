import { IUserProduct } from "../../interfaces/serverInterfaces";
import { userProductConst } from "./constant";
import {
  CreateUserProductFailure,
  CreateUserProductRequest,
  CreateUserProductSuccess,
  RemoveUserProductFailure,
  RemoveUserProductRequest,
  RemoveUserProductSuccess,
  FetchUserProductsFailure,
  FetchUserProductsRequest,
  FetchUserProductsSuccess,
  FetchUserProductFailure,
  FetchUserProductRequest,
  FetchUserProductSuccess,
  UpdateUserProductFailure,
  UpdateUserProductRequest,
  UpdateUserProductSuccess,
  UserProductRequestPayload,
  SetUserProduct,
  SetUserProducts,
  ClearUserProduct,
  ClearUserProducts,
  UserProductsPayload,
  UserProductPayload,
  CreateRangeUserProductRequest,
  CreateRangeUserProductSuccess,
  CreateRangeUserProductFailure,
  RemoveRangeUserProductRequest,
  RemoveRangeUserProductSuccess,
  RemoveRangeUserProductFailure,
  UserProductRemoveRangePayload,
  UserProductRemovePayload,
} from "./type";

//GET
const getAll = (): FetchUserProductsRequest => ({
  type: userProductConst.FETCH_USERPRODUCTS_REQUEST,
});
const getAllSuccess = (
  payload: UserProductsPayload
): FetchUserProductsSuccess => ({
  type: userProductConst.FETCH_USERPRODUCTS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchUserProductsFailure => ({
  type: userProductConst.FETCH_USERPRODUCTS_FAILURE,
});

//GET:/ID
const get = (
  payload: UserProductRequestPayload
): FetchUserProductRequest => ({
  type: userProductConst.FETCH_USERPRODUCT_REQUEST,
  payload,
});
const getSuccess = (
  payload: UserProductPayload
): FetchUserProductSuccess => ({
  type: userProductConst.FETCH_USERPRODUCT_SUCCESS,
  payload,
});
const getFailure = (): FetchUserProductFailure => ({
  type: userProductConst.FETCH_USERPRODUCT_FAILURE,
});

//POST
const create = (
  payload: UserProductPayload
): CreateUserProductRequest => ({
  type: userProductConst.CREATE_USERPRODUCT_REQUEST,
  payload,
});
const createSuccess = (
  payload: UserProductPayload
): CreateUserProductSuccess => ({
  type: userProductConst.CREATE_USERPRODUCT_SUCCESS,
  payload,
});
const createFailure = (): CreateUserProductFailure => ({
  type: userProductConst.CREATE_USERPRODUCT_FAILURE,
});

//POST RANGE
const createRange = (
  payload: UserProductsPayload
): CreateRangeUserProductRequest => ({
  type: userProductConst.CREATE_RANGE_USERPRODUCT_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: UserProductsPayload
): CreateRangeUserProductSuccess => ({
  type: userProductConst.CREATE_RANGE_USERPRODUCT_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeUserProductFailure => ({
  type: userProductConst.CREATE_RANGE_USERPRODUCT_FAILURE,
});

//PUT
const update = (
  payload: UserProductPayload
): UpdateUserProductRequest => ({
  type: userProductConst.UPDATE_USERPRODUCT_REQUEST,
  payload,
});
const updateSuccess = (
  payload: UserProductPayload
): UpdateUserProductSuccess => ({
  type: userProductConst.UPDATE_USERPRODUCT_SUCCESS,
  payload,
});
const updateFailure = (): UpdateUserProductFailure => ({
  type: userProductConst.UPDATE_USERPRODUCT_FAILURE,
});

//REMOVE
const remove = (
  payload: UserProductRemovePayload
): RemoveUserProductRequest => ({
  type: userProductConst.REMOVE_USERPRODUCT_REQUEST,
  payload,
});
const removeSuccess = (
  payload: UserProductRemovePayload
): RemoveUserProductSuccess => ({
  type: userProductConst.REMOVE_USERPRODUCT_SUCCESS,
  payload,
});
const removeFailure = (): RemoveUserProductFailure => ({
  type: userProductConst.REMOVE_USERPRODUCT_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: UserProductRemoveRangePayload
): RemoveRangeUserProductRequest => ({
  type: userProductConst.REMOVE_RANGE_USERPRODUCT_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: UserProductRemoveRangePayload
): RemoveRangeUserProductSuccess => ({
  type: userProductConst.REMOVE_RANGE_USERPRODUCT_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeUserProductFailure => ({
  type: userProductConst.REMOVE_RANGE_USERPRODUCT_FAILURE,
});

//CLIENT ACTIONS
const setUserProduct = (
  payload: IUserProduct | null
): SetUserProduct => ({
  type: userProductConst.SET_USERPRODUCT,
  payload,
});
const clearUserProduct = (): ClearUserProduct => ({
  type: userProductConst.CLEAR_USERPRODUCT,
});
const setUserProducts = (
  payload: IUserProduct[]
): SetUserProducts => ({
  type: userProductConst.SET_USERPRODUCTS,
  payload,
});
const clearUserProducts = (): ClearUserProducts => ({
  type: userProductConst.CLEAR_USERPRODUCTS,
});

export const userProductActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  createRange,
  createRangeSuccess,
  createRangeFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeRange,
  removeRangeSuccess,
  removeRangeFailure,
  setUserProduct,
  clearUserProduct,
  setUserProducts,
  clearUserProducts,
};
