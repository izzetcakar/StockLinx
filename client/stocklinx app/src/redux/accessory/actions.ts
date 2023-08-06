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
  AccessoriesSucccessPayload,
  FetchAccessoriesSuccess,
  FetchAccessoryFailure,
  AccessoryFailurePayload,
  FetchAccessoryRequest,
  FetchAccessorySuccess,
  UpdateAccessoryFailure,
  UpdateAccessoryRequest,
  UpdateAccessorySuccess,
  AccessoryRequestPayload,
  UpdateAccessoryRequestPayload,
  AccessorySucccessPayload,
  SetAccessory,
  SetAccessories,
  ClearAccessory,
  ClearAccessories,
} from "./type";

//GET
const getAll = (): FetchAccessoriesRequest => ({
  type: accessoryConst.FETCH_ACCESSORIES_REQUEST,
});
const getAllSuccess = (
  payload: AccessoriesSucccessPayload
): FetchAccessoriesSuccess => ({
  type: accessoryConst.FETCH_ACCESSORIES_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: AccessoryFailurePayload
): FetchAccessoriesFailure => ({
  type: accessoryConst.FETCH_ACCESSORIES_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: AccessoryRequestPayload): FetchAccessoryRequest => ({
  type: accessoryConst.FETCH_ACCESSORY_REQUEST,
  payload,
});
const getSuccess = (
  payload: AccessorySucccessPayload
): FetchAccessorySuccess => ({
  type: accessoryConst.FETCH_ACCESSORY_SUCCESS,
  payload,
});
const getFailure = (
  payload: AccessoryFailurePayload
): FetchAccessoryFailure => ({
  type: accessoryConst.FETCH_ACCESSORY_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateAccessoryRequestPayload
): CreateAccessoryRequest => ({
  type: accessoryConst.CREATE_ACCESSORY_REQUEST,
  payload,
});
const createSuccess = (): CreateAccessorySuccess => ({
  type: accessoryConst.CREATE_ACCESSORY_SUCCESS,
});
const createFailure = (
  payload: AccessoryFailurePayload
): CreateAccessoryFailure => ({
  type: accessoryConst.CREATE_ACCESSORY_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateAccessoryRequestPayload
): UpdateAccessoryRequest => ({
  type: accessoryConst.UPDATE_ACCESSORY_REQUEST,
  payload,
});
const updateSuccess = (): UpdateAccessorySuccess => ({
  type: accessoryConst.UPDATE_ACCESSORY_SUCCESS,
});
const updateFailure = (
  payload: AccessoryFailurePayload
): UpdateAccessoryFailure => ({
  type: accessoryConst.UPDATE_ACCESSORY_FAILURE,
  payload,
});

//REMOVE
const remove = (payload: AccessoryRequestPayload): RemoveAccessoryRequest => ({
  type: accessoryConst.REMOVE_ACCESSORY_REQUEST,
  payload,
});
const removeSuccess = (): RemoveAccessorySuccess => ({
  type: accessoryConst.REMOVE_ACCESSORY_SUCCESS,
});
const removeFailure = (
  payload: AccessoryFailurePayload
): RemoveAccessoryFailure => ({
  type: accessoryConst.REMOVE_ACCESSORY_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setAccessory,
  clearAccessory,
  setAccessories,
  clearAccessories,
};
