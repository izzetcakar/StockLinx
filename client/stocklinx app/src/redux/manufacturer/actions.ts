import { IManufacturer } from "../../interfaces/interfaces";
import { manufacturerConst } from "./constant";
import {
  CreateManufacturerFailure,
  CreateManufacturerRequest,
  CreateManufacturerSuccess,
  RemoveManufacturerFailure,
  RemoveManufacturerRequest,
  RemoveManufacturerSuccess,
  FetchManufacturersFailure,
  FetchManufacturersRequest,
  ManufacturersSucccessPayload,
  FetchManufacturersSuccess,
  FetchManufacturerFailure,
  FetchManufacturerRequest,
  FetchManufacturerSuccess,
  UpdateManufacturerFailure,
  UpdateManufacturerRequest,
  UpdateManufacturerSuccess,
  ManufacturerRequestPayload,
  UpdateManufacturerRequestPayload,
  ManufacturerSucccessPayload,
  SetManufacturer,
  SetManufacturers,
  ClearManufacturer,
  ClearManufacturers,
} from "./type";

//GET
const getAll = (): FetchManufacturersRequest => ({
  type: manufacturerConst.FETCH_MANUFACTURERS_REQUEST,
});
const getAllSuccess = (
  payload: ManufacturersSucccessPayload
): FetchManufacturersSuccess => ({
  type: manufacturerConst.FETCH_MANUFACTURERS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchManufacturersFailure => ({
  type: manufacturerConst.FETCH_MANUFACTURERS_FAILURE,
});

//GET:/ID
const get = (
  payload: ManufacturerRequestPayload
): FetchManufacturerRequest => ({
  type: manufacturerConst.FETCH_MANUFACTURER_REQUEST,
  payload,
});
const getSuccess = (
  payload: ManufacturerSucccessPayload
): FetchManufacturerSuccess => ({
  type: manufacturerConst.FETCH_MANUFACTURER_SUCCESS,
  payload,
});
const getFailure = (): FetchManufacturerFailure => ({
  type: manufacturerConst.FETCH_MANUFACTURER_FAILURE,
});

//POST
const create = (
  payload: UpdateManufacturerRequestPayload
): CreateManufacturerRequest => ({
  type: manufacturerConst.CREATE_MANUFACTURER_REQUEST,
  payload,
});
const createSuccess = (): CreateManufacturerSuccess => ({
  type: manufacturerConst.CREATE_MANUFACTURER_SUCCESS,
});
const createFailure = (): CreateManufacturerFailure => ({
  type: manufacturerConst.CREATE_MANUFACTURER_FAILURE,
});

//PUT
const update = (
  payload: UpdateManufacturerRequestPayload
): UpdateManufacturerRequest => ({
  type: manufacturerConst.UPDATE_MANUFACTURER_REQUEST,
  payload,
});
const updateSuccess = (): UpdateManufacturerSuccess => ({
  type: manufacturerConst.UPDATE_MANUFACTURER_SUCCESS,
});
const updateFailure = (): UpdateManufacturerFailure => ({
  type: manufacturerConst.UPDATE_MANUFACTURER_FAILURE,
});

//REMOVE
const remove = (
  payload: ManufacturerRequestPayload
): RemoveManufacturerRequest => ({
  type: manufacturerConst.REMOVE_MANUFACTURER_REQUEST,
  payload,
});
const removeSuccess = (): RemoveManufacturerSuccess => ({
  type: manufacturerConst.REMOVE_MANUFACTURER_SUCCESS,
});
const removeFailure = (): RemoveManufacturerFailure => ({
  type: manufacturerConst.REMOVE_MANUFACTURER_FAILURE,
});

//CLIENT ACTIONS
const setManufacturer = (payload: IManufacturer | null): SetManufacturer => ({
  type: manufacturerConst.SET_MANUFACTURER,
  payload,
});
const clearManufacturer = (): ClearManufacturer => ({
  type: manufacturerConst.CLEAR_MANUFACTURER,
});
const setManufacturers = (payload: IManufacturer[]): SetManufacturers => ({
  type: manufacturerConst.SET_MANUFACTURERS,
  payload,
});
const clearManufacturers = (): ClearManufacturers => ({
  type: manufacturerConst.CLEAR_MANUFACTURERS,
});

export const manufacturerActions = {
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
  setManufacturer,
  clearManufacturer,
  setManufacturers,
  clearManufacturers,
};
