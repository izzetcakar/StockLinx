import { IDeployedProduct } from "../../interfaces/interfaces";
import { deployedProductConst } from "./constant";
import {
  CreateDeployedProductFailure,
  CreateDeployedProductRequest,
  CreateDeployedProductSuccess,
  RemoveDeployedProductFailure,
  RemoveDeployedProductRequest,
  RemoveDeployedProductSuccess,
  FetchDeployedProductsFailure,
  FetchDeployedProductsRequest,
  FetchDeployedProductsSuccess,
  FetchDeployedProductFailure,
  FetchDeployedProductRequest,
  FetchDeployedProductSuccess,
  UpdateDeployedProductFailure,
  UpdateDeployedProductRequest,
  UpdateDeployedProductSuccess,
  DeployedProductRequestPayload,
  SetDeployedProduct,
  SetDeployedProducts,
  ClearDeployedProduct,
  ClearDeployedProducts,
  DeployedProductsPayload,
  DeployedProductPayload,
  CreateRangeDeployedProductRequest,
  CreateRangeDeployedProductSuccess,
  CreateRangeDeployedProductFailure,
  RemoveRangeDeployedProductRequest,
  RemoveRangeDeployedProductSuccess,
  RemoveRangeDeployedProductFailure,
  DeployedProductRemoveRangePayload,
  DeployedProductRemovePayload,
} from "./type";

//GET
const getAll = (): FetchDeployedProductsRequest => ({
  type: deployedProductConst.FETCH_DEPLOYEDPRODUCTS_REQUEST,
});
const getAllSuccess = (
  payload: DeployedProductsPayload
): FetchDeployedProductsSuccess => ({
  type: deployedProductConst.FETCH_DEPLOYEDPRODUCTS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchDeployedProductsFailure => ({
  type: deployedProductConst.FETCH_DEPLOYEDPRODUCTS_FAILURE,
});

//GET:/ID
const get = (
  payload: DeployedProductRequestPayload
): FetchDeployedProductRequest => ({
  type: deployedProductConst.FETCH_DEPLOYEDPRODUCT_REQUEST,
  payload,
});
const getSuccess = (
  payload: DeployedProductPayload
): FetchDeployedProductSuccess => ({
  type: deployedProductConst.FETCH_DEPLOYEDPRODUCT_SUCCESS,
  payload,
});
const getFailure = (): FetchDeployedProductFailure => ({
  type: deployedProductConst.FETCH_DEPLOYEDPRODUCT_FAILURE,
});

//POST
const create = (
  payload: DeployedProductPayload
): CreateDeployedProductRequest => ({
  type: deployedProductConst.CREATE_DEPLOYEDPRODUCT_REQUEST,
  payload,
});
const createSuccess = (
  payload: DeployedProductPayload
): CreateDeployedProductSuccess => ({
  type: deployedProductConst.CREATE_DEPLOYEDPRODUCT_SUCCESS,
  payload,
});
const createFailure = (): CreateDeployedProductFailure => ({
  type: deployedProductConst.CREATE_DEPLOYEDPRODUCT_FAILURE,
});

//POST RANGE
const createRange = (
  payload: DeployedProductsPayload
): CreateRangeDeployedProductRequest => ({
  type: deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: DeployedProductsPayload
): CreateRangeDeployedProductSuccess => ({
  type: deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeDeployedProductFailure => ({
  type: deployedProductConst.CREATE_RANGE_DEPLOYEDPRODUCT_FAILURE,
});

//PUT
const update = (
  payload: DeployedProductPayload
): UpdateDeployedProductRequest => ({
  type: deployedProductConst.UPDATE_DEPLOYEDPRODUCT_REQUEST,
  payload,
});
const updateSuccess = (
  payload: DeployedProductPayload
): UpdateDeployedProductSuccess => ({
  type: deployedProductConst.UPDATE_DEPLOYEDPRODUCT_SUCCESS,
  payload,
});
const updateFailure = (): UpdateDeployedProductFailure => ({
  type: deployedProductConst.UPDATE_DEPLOYEDPRODUCT_FAILURE,
});

//REMOVE
const remove = (
  payload: DeployedProductRemovePayload
): RemoveDeployedProductRequest => ({
  type: deployedProductConst.REMOVE_DEPLOYEDPRODUCT_REQUEST,
  payload,
});
const removeSuccess = (
  payload: DeployedProductRemovePayload
): RemoveDeployedProductSuccess => ({
  type: deployedProductConst.REMOVE_DEPLOYEDPRODUCT_SUCCESS,
  payload,
});
const removeFailure = (): RemoveDeployedProductFailure => ({
  type: deployedProductConst.REMOVE_DEPLOYEDPRODUCT_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: DeployedProductRemoveRangePayload
): RemoveRangeDeployedProductRequest => ({
  type: deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: DeployedProductRemoveRangePayload
): RemoveRangeDeployedProductSuccess => ({
  type: deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeDeployedProductFailure => ({
  type: deployedProductConst.REMOVE_RANGE_DEPLOYEDPRODUCT_FAILURE,
});

//CLIENT ACTIONS
const setDeployedProduct = (
  payload: IDeployedProduct | null
): SetDeployedProduct => ({
  type: deployedProductConst.SET_DEPLOYEDPRODUCT,
  payload,
});
const clearDeployedProduct = (): ClearDeployedProduct => ({
  type: deployedProductConst.CLEAR_DEPLOYEDPRODUCT,
});
const setDeployedProducts = (
  payload: IDeployedProduct[]
): SetDeployedProducts => ({
  type: deployedProductConst.SET_DEPLOYEDPRODUCTS,
  payload,
});
const clearDeployedProducts = (): ClearDeployedProducts => ({
  type: deployedProductConst.CLEAR_DEPLOYEDPRODUCTS,
});

export const deployedProductActions = {
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
  setDeployedProduct,
  clearDeployedProduct,
  setDeployedProducts,
  clearDeployedProducts,
};
