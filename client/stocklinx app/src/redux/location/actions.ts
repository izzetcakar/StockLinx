import { ILocation } from "../../interfaces/interfaces";
import { locationConst } from "./constant";
import {
  CreateLocationFailure,
  CreateLocationRequest,
  CreateLocationSuccess,
  RemoveLocationFailure,
  RemoveLocationRequest,
  RemoveLocationSuccess,
  FetchLocationsFailure,
  FetchLocationsRequest,
  FetchLocationsSuccess,
  FetchLocationFailure,
  FetchLocationRequest,
  FetchLocationSuccess,
  UpdateLocationFailure,
  UpdateLocationRequest,
  UpdateLocationSuccess,
  LocationRequestPayload,
  SetLocation,
  SetLocations,
  ClearLocation,
  ClearLocations,
  LocationsPayload,
  LocationPayload,
  CreateRangeLocationRequest,
  CreateRangeLocationSuccess,
  CreateRangeLocationFailure,
  RemoveRangeLocationRequest,
  RemoveRangeLocationSuccess,
  RemoveRangeLocationFailure,
  LocationRemoveRangePayload,
  LocationRemovePayload,
} from "./type";

//GET
const getAll = (): FetchLocationsRequest => ({
  type: locationConst.FETCH_LOCATIONS_REQUEST,
});
const getAllSuccess = (payload: LocationsPayload): FetchLocationsSuccess => ({
  type: locationConst.FETCH_LOCATIONS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchLocationsFailure => ({
  type: locationConst.FETCH_LOCATIONS_FAILURE,
});

//GET:/ID
const get = (payload: LocationRequestPayload): FetchLocationRequest => ({
  type: locationConst.FETCH_LOCATION_REQUEST,
  payload,
});
const getSuccess = (payload: LocationPayload): FetchLocationSuccess => ({
  type: locationConst.FETCH_LOCATION_SUCCESS,
  payload,
});
const getFailure = (): FetchLocationFailure => ({
  type: locationConst.FETCH_LOCATION_FAILURE,
});

//POST
const create = (payload: LocationPayload): CreateLocationRequest => ({
  type: locationConst.CREATE_LOCATION_REQUEST,
  payload,
});
const createSuccess = (): CreateLocationSuccess => ({
  type: locationConst.CREATE_LOCATION_SUCCESS,
});
const createFailure = (): CreateLocationFailure => ({
  type: locationConst.CREATE_LOCATION_FAILURE,
});

//POST RANGE
const createRange = (payload: LocationsPayload): CreateRangeLocationRequest => ({
  type: locationConst.CREATE_RANGE_LOCATION_REQUEST,
  payload,
});
const createRangeSuccess = (): CreateRangeLocationSuccess => ({
  type: locationConst.CREATE_RANGE_LOCATION_SUCCESS,
});
const createRangeFailure = (): CreateRangeLocationFailure => ({
  type: locationConst.CREATE_RANGE_LOCATION_FAILURE,
});

//PUT
const update = (payload: LocationPayload): UpdateLocationRequest => ({
  type: locationConst.UPDATE_LOCATION_REQUEST,
  payload,
});
const updateSuccess = (): UpdateLocationSuccess => ({
  type: locationConst.UPDATE_LOCATION_SUCCESS,
});
const updateFailure = (): UpdateLocationFailure => ({
  type: locationConst.UPDATE_LOCATION_FAILURE,
});

//REMOVE
const remove = (payload: LocationRemovePayload): RemoveLocationRequest => ({
  type: locationConst.REMOVE_LOCATION_REQUEST,
  payload,
});
const removeSuccess = (
  payload: LocationRemovePayload
): RemoveLocationSuccess => ({
  type: locationConst.REMOVE_LOCATION_SUCCESS,
  payload,
});
const removeFailure = (): RemoveLocationFailure => ({
  type: locationConst.REMOVE_LOCATION_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: LocationRemoveRangePayload
): RemoveRangeLocationRequest => ({
  type: locationConst.REMOVE_RANGE_LOCATION_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: LocationRemoveRangePayload
): RemoveRangeLocationSuccess => ({
  type: locationConst.REMOVE_RANGE_LOCATION_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeLocationFailure => ({
  type: locationConst.REMOVE_RANGE_LOCATION_FAILURE,
});

//CLIENT ACTIONS
const setLocation = (payload: ILocation | null): SetLocation => ({
  type: locationConst.SET_LOCATION,
  payload,
});
const clearLocation = (): ClearLocation => ({
  type: locationConst.CLEAR_LOCATION,
});
const setLocations = (payload: ILocation[]): SetLocations => ({
  type: locationConst.SET_LOCATIONS,
  payload,
});
const clearLocations = (): ClearLocations => ({
  type: locationConst.CLEAR_LOCATIONS,
});

export const locationActions = {
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
  setLocation,
  clearLocation,
  setLocations,
  clearLocations,
};
