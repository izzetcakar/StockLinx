import { IManufacturer } from "@interfaces/serverInterfaces";
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
  FetchManufacturersSuccess,
  FetchManufacturerFailure,
  FetchManufacturerRequest,
  FetchManufacturerSuccess,
  UpdateManufacturerFailure,
  UpdateManufacturerRequest,
  UpdateManufacturerSuccess,
  ManufacturerRequestPayload,
  SetManufacturer,
  SetManufacturers,
  ClearManufacturer,
  ClearManufacturers,
  ManufacturersPayload,
  ManufacturerPayload,
  CreateRangeManufacturerRequest,
  CreateRangeManufacturerSuccess,
  CreateRangeManufacturerFailure,
  RemoveRangeManufacturerRequest,
  RemoveRangeManufacturerSuccess,
  RemoveRangeManufacturerFailure,
  ManufacturerRemoveRangePayload,
  ManufacturerRemovePayload,
  FilterManufacturersRequest,
  FilterManufacturersSuccess,
  FilterManufacturersFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchManufacturersRequest => ({
  type: manufacturerConst.FETCH_MANUFACTURERS_REQUEST,
});
const getAllSuccess = (
  payload: ManufacturersPayload
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
  payload: ManufacturerPayload
): FetchManufacturerSuccess => ({
  type: manufacturerConst.FETCH_MANUFACTURER_SUCCESS,
  payload,
});
const getFailure = (): FetchManufacturerFailure => ({
  type: manufacturerConst.FETCH_MANUFACTURER_FAILURE,
});

//POST
const create = (payload: ManufacturerPayload): CreateManufacturerRequest => ({
  type: manufacturerConst.CREATE_MANUFACTURER_REQUEST,
  payload,
});
const createSuccess = (
  payload: ManufacturerPayload
): CreateManufacturerSuccess => ({
  type: manufacturerConst.CREATE_MANUFACTURER_SUCCESS,
  payload,
});
const createFailure = (): CreateManufacturerFailure => ({
  type: manufacturerConst.CREATE_MANUFACTURER_FAILURE,
});

//POST RANGE
const createRange = (
  payload: ManufacturersPayload
): CreateRangeManufacturerRequest => ({
  type: manufacturerConst.CREATE_RANGE_MANUFACTURER_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: ManufacturersPayload
): CreateRangeManufacturerSuccess => ({
  type: manufacturerConst.CREATE_RANGE_MANUFACTURER_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeManufacturerFailure => ({
  type: manufacturerConst.CREATE_RANGE_MANUFACTURER_FAILURE,
});

//PUT
const update = (payload: ManufacturerPayload): UpdateManufacturerRequest => ({
  type: manufacturerConst.UPDATE_MANUFACTURER_REQUEST,
  payload,
});
const updateSuccess = (
  payload: ManufacturerPayload
): UpdateManufacturerSuccess => ({
  type: manufacturerConst.UPDATE_MANUFACTURER_SUCCESS,
  payload,
});
const updateFailure = (): UpdateManufacturerFailure => ({
  type: manufacturerConst.UPDATE_MANUFACTURER_FAILURE,
});

//REMOVE
const remove = (
  payload: ManufacturerRemovePayload
): RemoveManufacturerRequest => ({
  type: manufacturerConst.REMOVE_MANUFACTURER_REQUEST,
  payload,
});
const removeSuccess = (
  payload: ManufacturerRemovePayload
): RemoveManufacturerSuccess => ({
  type: manufacturerConst.REMOVE_MANUFACTURER_SUCCESS,
  payload,
});
const removeFailure = (): RemoveManufacturerFailure => ({
  type: manufacturerConst.REMOVE_MANUFACTURER_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: ManufacturerRemoveRangePayload
): RemoveRangeManufacturerRequest => ({
  type: manufacturerConst.REMOVE_RANGE_MANUFACTURER_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: ManufacturerRemoveRangePayload
): RemoveRangeManufacturerSuccess => ({
  type: manufacturerConst.REMOVE_RANGE_MANUFACTURER_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeManufacturerFailure => ({
  type: manufacturerConst.REMOVE_RANGE_MANUFACTURER_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterManufacturersRequest => ({
  type: manufacturerConst.FILTER_MANUFACTURERS_REQUEST,
  payload,
});
const filterSuccess = (
  payload: ManufacturersPayload
): FilterManufacturersSuccess => ({
  type: manufacturerConst.FILTER_MANUFACTURERS_SUCCESS,
  payload,
});
const filterFailure = (): FilterManufacturersFailure => ({
  type: manufacturerConst.FILTER_MANUFACTURERS_FAILURE,
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
  filter,
  filterSuccess,
  filterFailure,
  setManufacturer,
  clearManufacturer,
  setManufacturers,
  clearManufacturers,
};
