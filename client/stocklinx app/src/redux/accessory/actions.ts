import { IAccessory } from "../../interfaces/interfaces";
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
  FetchAccessoriesSuccess,
  FetchAccessoryFailure,
  FetchAccessoryRequest,
  FetchAccessorySuccess,
  UpdateAccessoryFailure,
  UpdateAccessoryRequest,
  UpdateAccessorySuccess,
  AccessoryRequestPayload,
  SetAccessory,
  SetAccessories,
  ClearAccessory,
  ClearAccessories,
  AccessoriesPayload,
  AccessoryPayload,
  CreateRangeAccessoryRequest,
  CreateRangeAccessorySuccess,
  CreateRangeAccessoryFailure,
  RemoveRangeAccessoryRequest,
  RemoveRangeAccessorySuccess,
  RemoveRangeAccessoryFailure,
  AccessoryRemoveRangePayload,
  AccessoryRemovePayload,
} from "./type";

//GET
const getAll = (): FetchAccessoriesRequest => ({
  type: accessoryConst.FETCH_ACCESSORIES_REQUEST,
});
const getAllSuccess = (
  payload: AccessoriesPayload
): FetchAccessoriesSuccess => ({
  type: accessoryConst.FETCH_ACCESSORIES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchAccessoriesFailure => ({
  type: accessoryConst.FETCH_ACCESSORIES_FAILURE,
});

//GET:/ID
const get = (payload: AccessoryRequestPayload): FetchAccessoryRequest => ({
  type: accessoryConst.FETCH_ACCESSORY_REQUEST,
  payload,
});
const getSuccess = (payload: AccessoryPayload): FetchAccessorySuccess => ({
  type: accessoryConst.FETCH_ACCESSORY_SUCCESS,
  payload,
});
const getFailure = (): FetchAccessoryFailure => ({
  type: accessoryConst.FETCH_ACCESSORY_FAILURE,
});

//POST
const create = (payload: AccessoryPayload): CreateAccessoryRequest => ({
  type: accessoryConst.CREATE_ACCESSORY_REQUEST,
  payload,
});
const createSuccess = (payload: AccessoryPayload): CreateAccessorySuccess => ({
  type: accessoryConst.CREATE_ACCESSORY_SUCCESS,
  payload,
});
const createFailure = (): CreateAccessoryFailure => ({
  type: accessoryConst.CREATE_ACCESSORY_FAILURE,
});

//POST RANGE
const createRange = (
  payload: AccessoriesPayload
): CreateRangeAccessoryRequest => ({
  type: accessoryConst.CREATE_RANGE_ACCESSORY_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: AccessoriesPayload
): CreateRangeAccessorySuccess => ({
  type: accessoryConst.CREATE_RANGE_ACCESSORY_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeAccessoryFailure => ({
  type: accessoryConst.CREATE_RANGE_ACCESSORY_FAILURE,
});

//PUT
const update = (payload: AccessoryPayload): UpdateAccessoryRequest => ({
  type: accessoryConst.UPDATE_ACCESSORY_REQUEST,
  payload,
});
const updateSuccess = (payload: AccessoryPayload): UpdateAccessorySuccess => ({
  type: accessoryConst.UPDATE_ACCESSORY_SUCCESS,
  payload,
});
const updateFailure = (): UpdateAccessoryFailure => ({
  type: accessoryConst.UPDATE_ACCESSORY_FAILURE,
});

//REMOVE
const remove = (payload: AccessoryRemovePayload): RemoveAccessoryRequest => ({
  type: accessoryConst.REMOVE_ACCESSORY_REQUEST,
  payload,
});
const removeSuccess = (
  payload: AccessoryRemovePayload
): RemoveAccessorySuccess => ({
  type: accessoryConst.REMOVE_ACCESSORY_SUCCESS,
  payload,
});
const removeFailure = (): RemoveAccessoryFailure => ({
  type: accessoryConst.REMOVE_ACCESSORY_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: AccessoryRemoveRangePayload
): RemoveRangeAccessoryRequest => ({
  type: accessoryConst.REMOVE_RANGE_ACCESSORY_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: AccessoryRemoveRangePayload
): RemoveRangeAccessorySuccess => ({
  type: accessoryConst.REMOVE_RANGE_ACCESSORY_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeAccessoryFailure => ({
  type: accessoryConst.REMOVE_RANGE_ACCESSORY_FAILURE,
});

//CLIENT ACTIONS
const setAccessory = (payload: IAccessory | null): SetAccessory => ({
  type: accessoryConst.SET_ACCESSORY,
  payload,
});
const clearAccessory = (): ClearAccessory => ({
  type: accessoryConst.CLEAR_ACCESSORY,
});
const setAccessories = (payload: IAccessory[]): SetAccessories => ({
  type: accessoryConst.SET_ACCESSORIES,
  payload,
});
const clearAccessories = (): ClearAccessories => ({
  type: accessoryConst.CLEAR_ACCESSORIES,
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
  setAccessory,
  clearAccessory,
  setAccessories,
  clearAccessories,
};
