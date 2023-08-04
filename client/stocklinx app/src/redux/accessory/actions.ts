import { accessoryConst } from "./constant";
import {
  CreateAccessoryFailure,
  CreateAccessoryRequest,
  CreateAccessorySuccess,
  RemoveAccessoryFailure,
  RemoveAccessoryRequest,
  RemoveAccessorySuccess,
  FetchAccessoriesFailure,
  FetchAccessoriesRequest,
  FetchAccessoriesSucccessPayload,
  FetchAccessoriesSuccess,
  FetchAccessoryFailure,
  FetchAccessoryFailurePayload,
  FetchAccessoryRequest,
  FetchAccessorySucccessPayload,
  FetchAccessorySuccess,
  UpdateAccessoryFailure,
  UpdateAccessoryRequest,
  UpdateAccessorySuccess,
} from "./type";

//GET
const getAll = (): FetchAccessoriesRequest => ({
  type: accessoryConst.FETCH_ACCESSORIES_REQUEST,
});
const getAllSuccess = (
  payload: FetchAccessoriesSucccessPayload
): FetchAccessoriesSuccess => ({
  type: accessoryConst.FETCH_ACCESSORIES_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: FetchAccessoryFailurePayload
): FetchAccessoriesFailure => ({
  type: accessoryConst.FETCH_ACCESSORIES_FAILURE,
  payload,
});
//GET:/ID
const get = (): FetchAccessoryRequest => ({
  type: accessoryConst.FETCH_ACCESSORY_REQUEST,
});
const getSuccess = (
  payload: FetchAccessorySucccessPayload
): FetchAccessorySuccess => ({
  type: accessoryConst.FETCH_ACCESSORY_SUCCESS,
  payload,
});
const getFailure = (
  payload: FetchAccessoryFailurePayload
): FetchAccessoryFailure => ({
  type: accessoryConst.FETCH_ACCESSORY_FAILURE,
  payload,
});
//POST
const create = (): CreateAccessoryRequest => ({
  type: accessoryConst.CREATE_ACCESSORY_REQUEST,
});
const createSuccess = (): CreateAccessorySuccess => ({
  type: accessoryConst.CREATE_ACCESSORY_SUCCESS,
});
const createFailure = (
  payload: FetchAccessoryFailurePayload
): CreateAccessoryFailure => ({
  type: accessoryConst.CREATE_ACCESSORY_FAILURE,
  payload,
});
//PUT
const update = (): UpdateAccessoryRequest => ({
  type: accessoryConst.UPDATE_ACCESSORY_REQUEST,
});
const updateSuccess = (): UpdateAccessorySuccess => ({
  type: accessoryConst.UPDATE_ACCESSORY_SUCCESS,
});
const updateFailure = (
  payload: FetchAccessoryFailurePayload
): UpdateAccessoryFailure => ({
  type: accessoryConst.UPDATE_ACCESSORY_FAILURE,
  payload,
});
//REMOVE
const remove = (): RemoveAccessoryRequest => ({
  type: accessoryConst.REMOVE_ACCESSORY_REQUEST,
});
const removeSuccess = (): RemoveAccessorySuccess => ({
  type: accessoryConst.REMOVE_ACCESSORY_SUCCESS,
});
const removeFailure = (
  payload: FetchAccessoryFailurePayload
): RemoveAccessoryFailure => ({
  type: accessoryConst.REMOVE_ACCESSORY_FAILURE,
  payload,
});
export const accessoryActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
};
