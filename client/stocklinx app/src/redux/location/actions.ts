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
  LocationsSucccessPayload,
  FetchLocationsSuccess,
  FetchLocationFailure,
  LocationFailurePayload,
  FetchLocationRequest,
  FetchLocationSuccess,
  UpdateLocationFailure,
  UpdateLocationRequest,
  UpdateLocationSuccess,
  LocationRequestPayload,
  UpdateLocationRequestPayload,
  LocationSucccessPayload,
  SetLocation,
  SetLocations,
  ClearLocation,
  ClearLocations,
} from "./type";

//GET
const getAll = (): FetchLocationsRequest => ({
  type: locationConst.FETCH_LOCATIONS_REQUEST,
});
const getAllSuccess = (
  payload: LocationsSucccessPayload
): FetchLocationsSuccess => ({
  type: locationConst.FETCH_LOCATIONS_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: LocationFailurePayload
): FetchLocationsFailure => ({
  type: locationConst.FETCH_LOCATIONS_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: LocationRequestPayload): FetchLocationRequest => ({
  type: locationConst.FETCH_LOCATION_REQUEST,
  payload,
});
const getSuccess = (
  payload: LocationSucccessPayload
): FetchLocationSuccess => ({
  type: locationConst.FETCH_LOCATION_SUCCESS,
  payload,
});
const getFailure = (payload: LocationFailurePayload): FetchLocationFailure => ({
  type: locationConst.FETCH_LOCATION_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateLocationRequestPayload
): CreateLocationRequest => ({
  type: locationConst.CREATE_LOCATION_REQUEST,
  payload,
});
const createSuccess = (): CreateLocationSuccess => ({
  type: locationConst.CREATE_LOCATION_SUCCESS,
});
const createFailure = (
  payload: LocationFailurePayload
): CreateLocationFailure => ({
  type: locationConst.CREATE_LOCATION_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateLocationRequestPayload
): UpdateLocationRequest => ({
  type: locationConst.UPDATE_LOCATION_REQUEST,
  payload,
});
const updateSuccess = (): UpdateLocationSuccess => ({
  type: locationConst.UPDATE_LOCATION_SUCCESS,
});
const updateFailure = (
  payload: LocationFailurePayload
): UpdateLocationFailure => ({
  type: locationConst.UPDATE_LOCATION_FAILURE,
  payload,
});

//REMOVE
const remove = (payload: LocationRequestPayload): RemoveLocationRequest => ({
  type: locationConst.REMOVE_LOCATION_REQUEST,
  payload,
});
const removeSuccess = (): RemoveLocationSuccess => ({
  type: locationConst.REMOVE_LOCATION_SUCCESS,
});
const removeFailure = (
  payload: LocationFailurePayload
): RemoveLocationFailure => ({
  type: locationConst.REMOVE_LOCATION_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setLocation,
  clearLocation,
  setLocations,
  clearLocations,
};
